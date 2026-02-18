<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use App\Notifications\TransactionUpdatedApproved;
use App\Notifications\TransactionUpdatedRejected;
use App\Services\BonusService;
use App\Services\ReferralService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class TransactionsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('admin/transactions/index', [
            'transactions' => Transaction::with('details.product')->latest()->get(),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Transaction $transaction): Response
    {
        return Inertia::render('admin/transactions/show', [
            'transaction' => $transaction->load('user', 'details.product'),
        ]);
    }

    public function verify(
        Request $request,
        Transaction $transaction,
        BonusService $bonusService,
        ReferralService $referralService // Inject service
    ) {
        $request->validate([
            'status' => 'required|in:pending,approved,rejected',
            'action_password' => 'required|string',
        ]);

        $admin_action = env('ADMIN_ACTION');

        if ($request->action_password !== $admin_action) {
            return back()->with([
                'error' => 'Password konfirmasi salah.',
            ]);
        }

        $transaction->update([
            'status' => $request->status,
        ]);

        if ($request->status === 'approved') {
            $transaction->user->notify(new TransactionUpdatedApproved($transaction));

            $transaction->load(['details', 'user']);

            // Distribusi bonus (existing code)
            $bonusService->distribute($transaction);

            // 3. TAMBAHKAN LOGIKA UPDATE RANK DI SINI
            $this->updateReferralRanks($referralService, $transaction->user_id);

            return back()->with('success', 'Pembayaran disetujui & Rank diperbarui');
        }

        if ($request->status === 'rejected') {
            $transaction->user->notify(new TransactionUpdatedRejected($transaction));

            return back()->with('error', 'Pembayaran ditolak');
        }

        return back();
    }

    /**
     * 4. Helper function untuk update rank user dan uplinenya
     */
    private function updateReferralRanks(ReferralService $referralService, int $userId): void
    {
        try {
            // A. Update rank user yang melakukan transaksi
            $referralService->updateUserRank($userId);

            // B. Update rank semua upline (karena downline aktif mereka bertambah)
            $uplineChain = $referralService->getUplineChain($userId);

            foreach ($uplineChain as $upline) {
                $referralService->updateUserRank($upline['user']->id);
            }
        } catch (\Exception $e) {
            // Log error agar tidak menggagalkan proses approval transaksi
            Log::error('Referral Rank Update Failed: '.$e->getMessage(), [
                'user_id' => $userId,
                'exception' => $e->getMessage(),
            ]);
        }
    }
}
