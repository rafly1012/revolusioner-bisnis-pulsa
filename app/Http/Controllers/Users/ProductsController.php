<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use App\Models\DetailTransaction;
use App\Models\Product;
use App\Models\Transaction;
use App\Notifications\TransactionCreated;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ProductsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $hasBoughtAnything = Transaction::where('user_id', Auth::id())
            ->whereIn('status', ['pending', 'approved', 'rejected'])
            ->exists();

        return Inertia::render('users/products/index', [
            'products' => Product::latest()->get(),
            'hasBoughtAnything' => $hasBoughtAnything,
        ]);
    }

    public function buy(Product $product): RedirectResponse
    {
        $userId = Auth::id();

        $alreadyBought = DetailTransaction::where('product_id', $product->id)
            ->whereHas('transaction', function ($q) use ($userId) {
                $q->where('user_id', $userId)
                    ->whereIn('status', ['pending', 'approved', 'rejected']);
            })
            ->exists();

        if ($alreadyBought) {
            return redirect()
                ->back()
                ->with('error', 'Produk ini sudah pernah Anda beli.');
        }

        $transaction = Transaction::create([
            'user_id' => Auth::id(),
            'transaction_code' => $this->generateUniqueTransactionCode(),
            'total' => $product->price,
            'status' => 'pending',
        ]);

        $transaction->user->notify(new TransactionCreated($transaction));

        DetailTransaction::create([
            'transaction_id' => $transaction->id,
            'product_id' => $product->id,
            'price' => $product->price,
            'qty' => 1,
            'subtotal' => $product->price,
        ]);

        return redirect()->route('user.transactions.show', $transaction->id);
    }

    private function generateUniqueTransactionCode(): string
    {
        do {
            $code = 'RBP-TRX-' . strtoupper(Str::random(8));
        } while (Transaction::where('transaction_code', $code)->exists());

        return $code;
    }
}
