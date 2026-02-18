<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Wallet;
use App\Models\WalletLog;
use App\Models\Withdrawal;
use App\Notifications\WalletLogNotification;
use App\Notifications\WithdrawalUpdateApproved;
use App\Notifications\WithdrawalUpdateRejected;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class WithdrawalsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('admin/withdrawals/index', [
            'withdrawals' => Withdrawal::latest()->get(),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Withdrawal $withdrawal): Response
    {
        return Inertia::render('admin/withdrawals/show', [
            'withdrawal' => $withdrawal->load('user.wallet'),
        ]);
    }

    public function verify(Request $request, Withdrawal $withdrawal)
    {
        $request->validate([
            'status' => 'required|in:approved,rejected',
            'action_password' => 'required|string',
        ]);

        if ($request->action_password !== env('ADMIN_ACTION')) {
            return back()->with('error', 'Password konfirmasi salah.');
        }

        DB::transaction(function () use ($request, $withdrawal) {

            // Update status dulu
            $withdrawal->update([
                'status' => $request->status,
            ]);

            // Kalau tidak disetujui, stop
            if ($request->status !== 'approved') {
                $withdrawal->user->notify(new WithdrawalUpdateRejected($withdrawal));

                return;
            }

            // Ambil wallet user
            $wallet = Wallet::where('user_id', $withdrawal->user_id)
                ->lockForUpdate()
                ->firstOrFail();

            if ($wallet->balance < $withdrawal->amount) {
                throw new \Exception('Saldo tidak mencukupi.');
            }

            // Hitung admin fee 10%
            if ($withdrawal->amount < 100000) {
                $adminFee = 10000; // flat 10rb
            } else {
                $adminFee = ceil($withdrawal->amount * 0.10); // 10%
            }

            $amountReceived = $withdrawal->amount - $adminFee;

            // Simpan admin fee
            $withdrawal->update([
                'admin_fee' => $adminFee,
            ]);

            // Kurangi saldo
            $wallet->decrement('balance', $withdrawal->amount);

            // Log wallet
            $log = WalletLog::create([
                'wallet_id' => $wallet->id,
                'amount' => $withdrawal->amount,
                'description' => 'Penarikan sebesar ' . number_format($withdrawal->amount, 0, ',', '.') . '',
            ]);

            // Notifikasi user
            $wallet->user->notify(new WalletLogNotification($log));

            $withdrawal->user->notify(new WithdrawalUpdateApproved($withdrawal));
        });

        return back()->with(
            $request->status === 'approved'
                ? 'success'
                : 'error',
            $request->status === 'approved'
                ? 'Penarikan disetujui.'
                : 'Penarikan ditolak.'
        );
    }
}
