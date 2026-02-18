<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class TransactionsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('users/transactions/index', [
            'transactions' => Transaction::with('details.product')
                ->where('user_id', Auth::id())
                ->latest()
                ->get(),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Transaction $transaction): Response|RedirectResponse
    {
        if ($transaction->user_id !== Auth::id()) {
            return redirect()->back();
        }

        return Inertia::render('users/transactions/show', [
            'transaction' => $transaction->load('details.product'),
        ]);
    }
}
