<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use App\Models\Wallet;
use App\Models\Withdrawal;
use App\Notifications\WithdrawalCreated;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class WithdrawalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('users/withdrawals/index', [
            'withdrawals' => Withdrawal::where('user_id', Auth::id())->latest()->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('users/withdrawals/create', [
            'wallet' => Wallet::where('user_id', Auth::id())->first(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric|min:10000',
        ]);

        $wallet = Wallet::where('user_id', Auth::id())->firstOrFail();

        if ($wallet->balance < $request->amount) {
            return back()->with('error', 'Saldo tidak cukup');
        }

        $withdrawal = Withdrawal::create([
            'user_id' => Auth::id(),
            'withdrawal_code' => $this->generateUniqueWithdrawalCode(),
            'amount' => $request->amount,
            'status' => 'pending',
        ]);

        $withdrawal->user->notify(new WithdrawalCreated($withdrawal));

        return redirect()->route('user.withdrawals.index')->with('success', 'Permintaan penarikan dikirim');
    }

    /**
     * Display the specified resource.
     */
    public function show(Withdrawal $withdrawal): Response|RedirectResponse
    {
        if ($withdrawal->user_id !== Auth::id()) {
            return redirect()->back();
        }

        return Inertia::render('users/withdrawals/show', [
            'withdrawal' => $withdrawal,
        ]);
    }

    private function generateUniqueWithdrawalCode(): string
    {
        do {
            $code = 'RBP-WDX-'.strtoupper(Str::random(8));
        } while (Withdrawal::where('withdrawal_code', $code)->exists());

        return $code;
    }
}
