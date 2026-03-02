<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\DetailTransaction;
use App\Models\Transaction;
use App\Models\Withdrawal;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $overview = [
            'total_revenue' => $this->getTotalRevenue(),
            'total_transactions' => $this->getTotalTransactions(),
            'total_products_sold' => $this->getTotalProductsSold(),
            'total_customers' => $this->getTotalCustomers(),
            'total_admin_fee' => $this->getTotalAdminFee(),
            'total_withdrawals' => $this->getTotalWithdrawals(),
        ];

        return Inertia::render('dashboard', [
            'overview' => $overview,
        ]);
    }

    /**
     * Get total revenue (semua data)
     */
    protected function getTotalRevenue(): array
    {
        $total = Transaction::where('status', 'approved')
            ->sum('total');

        return [
            'value' => $total,
            'formatted' => 'Rp ' . number_format($total, 0, ',', '.'),
        ];
    }

    /**
     * Get total transactions count
     */
    protected function getTotalTransactions(): array
    {
        $count = Transaction::where('status', 'approved')
            ->count();

        return [
            'value' => $count,
            'formatted' => number_format($count, 0, ',', '.'),
        ];
    }

    /**
     * Get total products sold
     */
    protected function getTotalProductsSold(): array
    {
        $total = DetailTransaction::whereHas('transaction', function ($q) {
            $q->where('status', 'approved');
        })->sum('qty');

        return [
            'value' => $total,
            'formatted' => number_format($total, 0, ',', '.') . ' produk',
        ];
    }

    /**
     * Get total customers (unique user)
     */
    protected function getTotalCustomers(): array
    {
        $count = Transaction::where('status', 'approved')
            ->distinct('user_id')
            ->count('user_id');

        return [
            'value' => $count,
            'formatted' => number_format($count, 0, ',', '.') . ' pengguna',
        ];
    }

    /**
     * Get total admin fee
     */
    protected function getTotalAdminFee(): array
    {
        $total = Withdrawal::where('status', 'approved')
            ->sum('admin_fee');

        return [
            'value' => $total,
            'formatted' => 'Rp ' . number_format($total, 0, ',', '.'),
        ];
    }

    /**
     * Get total withdrawals
     */
    protected function getTotalWithdrawals(): array
    {
        $total = Withdrawal::where('status', 'approved')
            ->sum('amount');

        return [
            'value' => $total,
            'formatted' => 'Rp ' . number_format($total, 0, ',', '.'),
        ];
    }
}
