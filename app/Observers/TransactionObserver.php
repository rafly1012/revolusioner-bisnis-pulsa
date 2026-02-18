<?php

namespace App\Observers;

use App\Models\Transaction;
use App\Services\ReferralService;

class TransactionObserver
{
    public function __construct(
        private ReferralService $referralService
    ) {}

    /**
     * Handle the Transaction "updated" event.
     */
    public function updated(Transaction $transaction): void
    {
        // Jika status berubah menjadi approved
        if ($transaction->isDirty('status') && $transaction->status === 'approved') {
            $this->updateUserAndUplineRanks($transaction->user_id);
        }
    }

    /**
     * Update ranks untuk user dan semua upline
     */
    private function updateUserAndUplineRanks(int $userId): void
    {
        $currentUserId = $userId;
        $level = 0;
        $maxLevel = 50;

        while ($currentUserId && $level < $maxLevel) {
            // Update rank
            $this->referralService->updateUserRank($currentUserId);

            // Cari parent/referrer
            $referral = \App\Models\Referral::where('referred_id', $currentUserId)->first();

            if (! $referral) {
                break;
            }

            $currentUserId = $referral->referrer_id;
            $level++;
        }
    }
}
