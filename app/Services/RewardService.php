<?php

namespace App\Services;

use App\Models\User;
use App\Models\Wallet;
use App\Models\WalletLog;
use App\Notifications\WalletLogNotification;
use Exception;
use Illuminate\Support\Facades\DB;

class RewardService
{
    protected ReferralService $referralService;

    public function __construct(ReferralService $referralService)
    {
        $this->referralService = $referralService;
    }

    public function distribute(int $totalAmount): void
    {
        DB::transaction(function () use ($totalAmount) {

            // Ambil user yang PERNAH transaksi approved
            $users = User::whereHas('transactions', function ($q) {
                $q->where('status', 'approved');
            })
                ->select('id', 'name', 'created_at')
                ->get();

            if ($users->isEmpty()) {
                throw new Exception('Tidak ada user dengan transaksi approved');
            }

            // Hitung bobot per user (lama gabung + jumlah downline)
            $weights = $users->mapWithKeys(function ($user) {
                // 1. Lama gabung
                $months = $user->created_at->diffInMonths(now());
                $months = max(1, min($months, 12)); // min 1, max 12

                // 2. Jumlah downline aktif (memanfaatkan ReferralService)
                $downlineTree = $this->referralService->getDownlineTree($user->id);
                $downlineCount = $downlineTree['stats']['total'] ?? 0;

                // 3. Bobot total
                $weight = $months + $downlineCount;

                return [$user->id => $weight];
            });

            $totalWeight = $weights->sum();

            if ($totalWeight <= 0) {
                throw new Exception('Total weight invalid');
            }

            foreach ($users as $user) {
                $weight = $weights[$user->id];

                // hitung bagian
                $bonus = floor(($weight / $totalWeight) * $totalAmount);

                if ($bonus <= 0) {
                    continue;
                }

                $wallet = Wallet::firstOrCreate([
                    'user_id' => $user->id,
                ]);

                $wallet->increment('balance', $bonus);

                $log = WalletLog::create([
                    'wallet_id' => $wallet->id,
                    'amount' => $bonus,
                    'description' => 'Pembagian dana admin',
                ]);

                $wallet->user->notify(new WalletLogNotification($log));
            }
        });
    }
}
