<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use App\Models\Wallet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class WalletsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (! Auth::user()->isUser()) {
            abort(403);
        }

        $wallet = Wallet::with(['logs' => function ($query) {
            $query->latest(); // urutkan dari terbaru
        }])->firstOrCreate(
            ['user_id' => Auth::id()],
            ['balance' => 0]
        );

        return Inertia::render('users/wallets/index', [
            'wallet' => [
                'balance' => $wallet->balance,
                'bank_name' => $wallet->bank_name,
                'bank_account' => $wallet->bank_account,
                'logs' => $wallet->logs->map(function ($log) {
                    return [
                        'id' => $log->id,
                        'amount' => $log->amount,
                        'type' => $log->type,
                        'description' => $log->description,
                        'created_at' => $log->created_at,
                    ];
                }),
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'bank_name' => ['required', 'string', 'max:100'],
            'bank_account' => ['required', 'string', 'max:50'],
        ]);

        $wallet = Wallet::firstOrCreate(
            ['user_id' => Auth::id()],
            ['balance' => 0]
        );

        $wallet->update([
            'bank_name' => $request->bank_name,
            'bank_account' => $request->bank_account,
        ]);

        return redirect()
            ->route('user.withdrawals.index')
            ->with('success', 'Dompet berhasil ditambahkan');
    }
}
