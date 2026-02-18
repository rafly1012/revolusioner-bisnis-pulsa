<?php

namespace App\Observers;

use App\Models\Referral;
use App\Services\ReferralService;

class ReferralObserver
{
    public function __construct(
        private ReferralService $referralService
    ) {}

    /**
     * Handle the Referral "created" event.
     */
    public function created(Referral $referral): void
    {
        // Update rank untuk semua upline
        $this->updateUplineRanks($referral->referrer_id);
    }

    /**
     * Handle the Referral "deleted" event.
     */
    public function deleted(Referral $referral): void
    {
        // Update rank untuk semua upline
        $this->updateUplineRanks($referral->referrer_id);
    }

    /**
     * Update ranks untuk semua upline chain
     */
    private function updateUplineRanks(int $userId): void
    {
        $currentUserId = $userId;
        $level = 0;
        $maxLevel = 50;

        while ($currentUserId && $level < $maxLevel) {
            // Update rank user ini
            $this->referralService->updateUserRank($currentUserId);

            // Cari parent/referrer
            $referral = Referral::where('referred_id', $currentUserId)->first();

            if (! $referral) {
                break;
            }

            $currentUserId = $referral->referrer_id;
            $level++;
        }
    }
}
