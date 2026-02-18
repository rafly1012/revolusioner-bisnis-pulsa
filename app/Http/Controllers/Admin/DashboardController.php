<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\DetailTransaction;
use App\Models\Transaction;
use App\Models\Withdrawal;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        // Filter periode (default: bulan ini)
        $period = $request->input('period', 'month'); // today, week, month, year, all

        $dateRange = $this->getDateRange($period);

        // 1. Overview Cards
        $overview = [
            'total_revenue' => $this->getTotalRevenue($dateRange),
            'total_transactions' => $this->getTotalTransactions($dateRange),
            'total_products_sold' => $this->getTotalProductsSold($dateRange),
            'total_customers' => $this->getTotalCustomers($dateRange),
            'total_admin_fee' => $this->getTotalAdminFee($dateRange),
            'total_withdrawals' => $this->getTotalWithdrawals($dateRange),
        ];

        return Inertia::render('dashboard', [
            'overview' => $overview,
        ]);
    }

    /**
     * Get date range based on period
     */
    protected function getDateRange(string $period): array
    {
        $end = now();

        switch ($period) {
            case 'today':
                $start = now()->startOfDay();
                break;
            case 'week':
                $start = now()->startOfWeek();
                break;
            case 'month':
                $start = now()->startOfMonth();
                break;
            case 'year':
                $start = now()->startOfYear();
                break;
            case 'all':
            default:
                $start = null;
                break;
        }

        return ['start' => $start, 'end' => $end];
    }

    /**
     * Get total revenue
     */
    protected function getTotalRevenue(array $dateRange): array
    {
        $query = Transaction::where('status', 'approved');

        if ($dateRange['start']) {
            $query->whereBetween('created_at', [$dateRange['start'], $dateRange['end']]);
        }

        $currentTotal = $query->sum('total');

        return [
            'value' => $currentTotal,
            'formatted' => 'Rp '.number_format($currentTotal, 0, ',', '.'),
        ];
    }

    /**
     * Get revenue from previous period (for comparison)
     */
    protected function getPreviousPeriodRevenue(array $dateRange): int
    {
        if (! $dateRange['start']) {
            return 0;
        }

        $duration = $dateRange['start']->diffInDays($dateRange['end']);
        $previousStart = $dateRange['start']->copy()->subDays($duration);
        $previousEnd = $dateRange['start']->copy()->subSecond();

        return Transaction::where('status', 'approved')
            ->whereBetween('created_at', [$previousStart, $previousEnd])
            ->sum('total');
    }

    /**
     * Get total transactions count
     */
    protected function getTotalTransactions(array $dateRange): array
    {
        $query = Transaction::where('status', 'approved');

        if ($dateRange['start']) {
            $query->whereBetween('created_at', [$dateRange['start'], $dateRange['end']]);
        }

        $count = $query->count();

        return [
            'value' => $count,
            'formatted' => number_format($count, 0, ',', '.'),
        ];
    }

    /**
     * Get total products sold
     */
    protected function getTotalProductsSold(array $dateRange): array
    {
        $query = DetailTransaction::whereHas('transaction', function ($q) use ($dateRange) {
            $q->where('status', 'approved');

            if ($dateRange['start']) {
                $q->whereBetween('created_at', [$dateRange['start'], $dateRange['end']]);
            }
        });

        $total = $query->sum('qty');

        return [
            'value' => $total,
            'formatted' => number_format($total, 0, ',', '.').' produk',
        ];
    }

    /**
     * Get total customers (unique users who made transactions)
     */
    protected function getTotalCustomers(array $dateRange): array
    {
        $query = Transaction::where('status', 'approved');

        if ($dateRange['start']) {
            $query->whereBetween('created_at', [$dateRange['start'], $dateRange['end']]);
        }

        $count = $query->distinct('user_id')->count('user_id');

        return [
            'value' => $count,
            'formatted' => number_format($count, 0, ',', '.').' pengguna',
        ];
    }

    protected function getTotalAdminFee(array $dateRange): array
    {
        $query = Withdrawal::where('status', 'approved');

        if ($dateRange['start']) {
            $query->whereBetween('created_at', [$dateRange['start'], $dateRange['end']]);
        }

        $total = $query->sum('admin_fee');

        return [
            'value' => $total,
            'formatted' => 'Rp '.number_format($total, 0, ',', '.'),
        ];
    }

    protected function getTotalWithdrawals(array $dateRange): array
    {
        $query = Withdrawal::where('status', 'approved');

        if ($dateRange['start']) {
            $query->whereBetween('created_at', [$dateRange['start'], $dateRange['end']]);
        }

        $total = $query->sum('amount');

        return [
            'value' => $total,
            'formatted' => 'Rp '.number_format($total, 0, ',', '.'),
        ];
    }
}
