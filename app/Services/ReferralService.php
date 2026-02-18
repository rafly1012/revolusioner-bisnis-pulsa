<?php

namespace App\Services;

use App\Models\Referral;
use App\Models\User;
use App\Models\Wallet;
use App\Models\WalletLog;
use App\Notifications\WalletLogNotification;
use Exception;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class ReferralService
{
    private int $maxBonusLevel = 10;

    // Definisi peringkat
    private array $rankTiers = [
        'Bronze' => ['min' => 10, 'count_type' => 'level_1'],
        'Silver' => ['min' => 50, 'count_type' => 'level_1'],
        'Gold' => ['min' => 100, 'count_type' => 'level_1'],
        'Platinum' => ['min' => 1000, 'count_type' => 'all_levels'],
        'Diamond' => ['min' => 5000, 'count_type' => 'all_levels'],
        'Star 1' => ['min' => 10000, 'count_type' => 'all_levels'],
        'Star 2' => ['min' => 20000, 'count_type' => 'all_levels'],
        'Star 3' => ['min' => 40000, 'count_type' => 'all_levels'],
        'Star 4' => ['min' => 80000, 'count_type' => 'all_levels'],
        'Star 5' => ['min' => 100000, 'count_type' => 'all_levels'],
    ];

    private array $rankBonuses = [
        'Bronze' => 100000,
        'Silver' => 500000,
        'Gold' => 1000000,
        'Platinum' => 1000000,
        'Diamond' => 1000000,
        'Star 1' => 2000000,
        'Star 2' => 3000000,
        'Star 3' => 5000000,
        'Star 4' => 10000000,
        'Star 5' => 25000000,
    ];

    public function getUserDetail(int $id): array
    {
        return Cache::remember("user_tree_$id", 600, function () use ($id) {
            $user = User::select('id', 'name', 'email', 'referral_code', 'created_at', 'rank')
                ->findOrFail($id);

            $downline = $this->getDownlineTree($id);
            $upline = $this->getUplineChain($id);

            // Calculate rank based on downline
            $rank = $this->calculateRank($downline['stats']);

            return [
                'user' => $user,
                'upline' => $upline,
                'downline' => $downline['tree'],
                'stats' => $downline['stats'],
                'rank' => $rank,
            ];
        });
    }

    /**
     * Get downline tree
     */
    public function getDownlineTree(int $userId): array
    {
        $allDownline = collect();
        $this->buildDownlineRecursive($userId, 1, $allDownline);

        $tree = $this->buildNestedTree($allDownline);

        // Hitung stats by level
        $byLevel = $allDownline
            ->groupBy('level')
            ->map->count()
            ->toArray();

        return [
            'tree' => $tree,
            'stats' => [
                'by_level' => $byLevel,
                'total' => $allDownline->count(),
                'level_1_count' => $byLevel[1] ?? 0,
            ],
        ];
    }

    /**
     * Recursive function untuk build downline
     */
    protected function buildDownlineRecursive(
        int $userId,
        int $currentLevel,
        Collection &$collection
    ): void {
        if ($currentLevel > 50) { // safety limit
            return;
        }

        $referrals = Referral::with(['referred' => function ($query) {
            $query->select('id', 'name', 'email', 'referral_code', 'created_at')
                ->whereHas('transactions', function ($q) {
                    $q->where('status', 'approved');
                });
        }])
            ->where('referrer_id', $userId)
            ->get();

        foreach ($referrals as $referral) {
            if (! $referral->referred) {
                continue; // skip user yang belum eligible
            }

            $level = min($currentLevel, $this->maxBonusLevel);

            $collection->push([
                'id' => $referral->referred->id,
                'name' => $referral->referred->name,
                'email' => $referral->referred->email,
                'referral_code' => $referral->referred->referral_code,
                'created_at' => $referral->referred->created_at,
                'parent_id' => $userId,
                'level' => $level,
            ]);

            $this->buildDownlineRecursive(
                $referral->referred->id,
                $currentLevel + 1,
                $collection
            );
        }
    }

    /**
     * Convert flat collection to nested tree
     */
    protected function buildNestedTree(Collection $collection): array
    {
        $items = [];

        foreach ($collection as $item) {
            $items[$item['id']] = [
                'id' => $item['id'],
                'name' => $item['name'],
                'email' => $item['email'],
                'referral_code' => $item['referral_code'],
                'created_at' => $item['created_at'],
                'level' => $item['level'],
                '_parent_id' => $item['parent_id'],
                'children' => [],
            ];
        }

        $tree = [];

        foreach ($items as $id => &$item) {
            // Level 1 masuk ke root
            if ($item['level'] === 1) {
                unset($item['_parent_id']);
                $tree[] = &$item;
            } else {
                // Attach ke parent
                if (isset($items[$item['_parent_id']])) {
                    $items[$item['_parent_id']]['children'][] = &$item;
                }
                unset($item['_parent_id']);
            }
        }

        unset($item);

        return $tree;
    }

    /**
     * Get upline chain
     */
    public function getUplineChain(int $userId): array
    {
        $upline = [];
        $currentUserId = $userId;
        $level = 1;

        while ($currentUserId && $level <= 50) {
            $referral = Referral::with(['referrer' => function ($query) {
                $query->select('id', 'name', 'email', 'referral_code', 'created_at', 'rank')
                    ->whereHas('transactions', function ($q) {
                        $q->where('status', 'approved');
                    });
            }])
                ->where('referred_id', $currentUserId)
                ->first();

            if (! $referral || ! $referral->referrer) {
                break;
            }

            $bonusLevel = min($level, $this->maxBonusLevel);

            $upline[] = [
                'level' => $bonusLevel,
                'user' => $referral->referrer,
            ];

            $currentUserId = $referral->referrer_id;
            $level++;
        }

        return $upline;
    }

    /**
     * Calculate rank based on downline stats
     */
    public function calculateRank(array $stats): string
    {
        $level1Count = $stats['level_1_count'] ?? 0;
        $totalCount = $stats['total'] ?? 0;

        $currentRank = 'Unranked';

        // Loop dari rank tertinggi ke terendah
        foreach (array_reverse($this->rankTiers, true) as $rankName => $criteria) {
            $count = $criteria['count_type'] === 'level_1' ? $level1Count : $totalCount;

            if ($count >= $criteria['min']) {
                $currentRank = $rankName;
                break;
            }
        }

        return $currentRank;
    }

    /**
     * Update user rank
     */
    public function updateUserRank(int $userId): string
    {
        $downline = $this->getDownlineTree($userId);
        $rank = $this->calculateRank($downline['stats']);

        // Update rank di database
        User::where('id', $userId)->update(['rank' => $rank]);

        // Clear cache
        $this->clearUserCache($userId);

        return $rank;
    }

    /**
     * Batch update ranks untuk semua user
     */
    public function updateAllUserRanks(): void
    {
        $users = User::all();

        foreach ($users as $user) {
            $this->updateUserRank($user->id);
        }
    }

    /**
     * Get rank info
     */
    public function getRankInfo(string $rankName): ?array
    {
        return $this->rankTiers[$rankName] ?? null;
    }

    /**
     * Get all rank tiers
     */
    public function getAllRankTiers(): array
    {
        return $this->rankTiers;
    }

    /**
     * Get next rank for user
     */
    public function getNextRank(int $userId): ?array
    {
        $downline = $this->getDownlineTree($userId);
        $currentRank = $this->calculateRank($downline['stats']);

        $level1Count = $downline['stats']['level_1_count'] ?? 0;
        $totalCount = $downline['stats']['total'] ?? 0;

        $rankNames = array_keys($this->rankTiers);
        $currentIndex = array_search($currentRank, $rankNames);

        // Jika sudah rank tertinggi atau unranked
        if ($currentRank === 'Star 5' || $currentIndex === false) {
            $nextRankName = $rankNames[0]; // Bronze
        } else {
            $nextRankName = $rankNames[$currentIndex + 1] ?? null;
        }

        if (! $nextRankName) {
            return null;
        }

        $nextRankCriteria = $this->rankTiers[$nextRankName];
        $currentCount = $nextRankCriteria['count_type'] === 'level_1' ? $level1Count : $totalCount;
        $needed = $nextRankCriteria['min'] - $currentCount;

        return [
            'next_rank' => $nextRankName,
            'current_count' => $currentCount,
            'required_count' => $nextRankCriteria['min'],
            'remaining' => max(0, $needed),
            'count_type' => $nextRankCriteria['count_type'],
        ];
    }

    public function getUserRankClaims(int $userId): array
    {
        return Cache::remember("user_rank_claims_$userId", 300, function () use ($userId) {
            $logs = WalletLog::whereHas('wallet', function ($query) use ($userId) {
                $query->where('user_id', $userId);
            })
                ->where('description', 'LIKE', 'Bonus Rank %')
                ->get(['description']);

            $claimedRanks = [];
            foreach ($logs as $log) {
                // Parse: "Bonus Rank Bronze" -> "Bronze"
                if (preg_match('/Bonus Rank\s+(.+)/', $log->description, $matches)) {
                    $claimedRanks[] = trim($matches[1]);
                }
            }

            return array_unique($claimedRanks);
        });
    }

    public function claimRankBonus(int $userId): array
    {
        return DB::transaction(function () use ($userId) {
            // 1. Ambil data downline & rank terbaru
            $downline = $this->getDownlineTree($userId);

            // 2. Cek rank yang sudah diklaim
            $claimedRanks = $this->getUserRankClaims($userId);

            // 3. Cari rank tertinggi yang belum diklaim
            $claimableRank = null;
            $bonusAmount = 0;

            foreach (array_reverse($this->rankTiers, true) as $rankName => $criteria) {
                $count = $criteria['count_type'] === 'level_1'
                    ? ($downline['stats']['level_1_count'] ?? 0)
                    : ($downline['stats']['total'] ?? 0);

                if ($count >= $criteria['min']) {
                    if (! in_array($rankName, $claimedRanks)) {
                        $claimableRank = $rankName;
                        $bonusAmount = $this->rankBonuses[$rankName] ?? 0;
                        break;
                    }
                }
            }

            if (! $claimableRank) {
                throw new Exception('Tidak ada bonus yang bisa diklaim saat ini.');
            }

            if (WalletLog::whereHas('wallet', function ($query) use ($userId) {
                $query->where('user_id', $userId);
            })
                ->where('description', "Bonus Rank {$claimableRank}")
                ->exists()
            ) {
                throw new Exception('Bonus ini sudah pernah diklaim.');
            }

            // 5. Get or Create Wallet (sama seperti BonusService)
            $wallet = Wallet::firstOrCreate([
                'user_id' => $userId,
            ]);

            // 6. Increment balance (sama seperti BonusService)
            $wallet->increment('balance', $bonusAmount);

            // 7. Create Wallet Log (format konsisten dengan BonusService)
            $log = WalletLog::create([
                'wallet_id' => $wallet->id,
                'amount' => $bonusAmount,
                'description' => "Bonus Rank {$claimableRank}",
            ]);

            // 8. Send Notification (sama seperti BonusService)
            $wallet->user->notify(new WalletLogNotification($log));

            // 9. Clear Cache
            Cache::forget("user_rank_claims_$userId");
            Cache::forget("user_tree_$userId");

            return [
                'success' => true,
                'rank' => $claimableRank,
                'amount' => $bonusAmount,
                'balance_after' => $wallet->balance,
                'message' => "Selamat! Bonus {$claimableRank} sebesar ".$this->formatRupiah($bonusAmount).' telah masuk ke wallet Anda.',
            ];
        });
    }

    /**
     * Helper format rupiah
     */
    private function formatRupiah(int $amount): string
    {
        return 'Rp '.number_format($amount, 0, ',', '.');
    }

    /**
     * Clear cache untuk user tertentu
     */
    public function clearUserCache(int $userId): void
    {
        Cache::forget("user_tree_$userId");
    }
}
