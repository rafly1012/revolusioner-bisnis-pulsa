<?php

namespace App\Services;

use App\Models\Transaction;
use App\Models\Wallet;
use App\Models\WalletLog;
use App\Notifications\WalletLogNotification;
use Illuminate\Support\Facades\DB;

class BonusService
{
    public function distribute(Transaction $transaction): void
    {
        DB::transaction(function () use ($transaction) {
            $buyer = $transaction->user;

            $totalAmount = $transaction->details->sum(
                fn ($d) => $d->price * $d->qty
            );

            $upline = app(ReferralService::class)
                ->getUplineChain($buyer->id);

            foreach ($upline as $row) {
                $actualLevel = $row['level'];

                // level 11+ disamakan ke level 10
                $bonusLevel = min($actualLevel, 10);

                $percent = $this->getBonusPercent($bonusLevel);
                $bonus = $totalAmount * $percent;

                $uplineUser = $row['user'];

                if (! $uplineUser->transactions()->where('status', 'approved')->exists()) {
                    continue;
                }

                $wallet = Wallet::firstOrCreate([
                    'user_id' => $row['user']['id'],
                ]);

                $wallet->increment('balance', $bonus);

                $log = WalletLog::create([
                    'wallet_id' => $wallet->id,
                    'amount' => $bonus,
                    'description' => "Bonus dari level {$bonusLevel}",
                ]);

                $wallet->user->notify(new WalletLogNotification($log));
            }
        });
    }

    protected function getBonusPercent(int $level): float
    {
        return match ($level) {
            1 => 0.20,
            2 => 0.10,
            3 => 0.02,
            4 => 0.004,
            5 => 0.0004,
            6 => 0.0004,
            7 => 0.0002,
            8 => 0.0002,
            9 => 0.0002,
            10 => 0.0002,
            default => 0.0002,
        };
    }
}
