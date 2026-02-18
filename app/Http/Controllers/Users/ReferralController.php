<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use App\Services\ReferralService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ReferralController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(ReferralService $referralService, Request $request): Response
    {
        $user = $request->user();
        $detail = $referralService->getUserDetail($user->id);
        $claimedRanks = $referralService->getUserRankClaims($user->id);

        return Inertia::render('users/referrals/index', [
            'data' => [
                'stats' => $detail['stats'],
                'rank' => $detail['rank'],
                'claimed_ranks' => $claimedRanks,
            ],
        ]);
    }

    public function claim(ReferralService $referralService, Request $request): RedirectResponse
    {
        try {
            $result = $referralService->claimRankBonus($request->user()->id);
            $newWalletBalance = $request->user()->wallet->balance ?? 0;

            return back()->with('success', $result['message'])
                ->with('wallet_balance', $newWalletBalance);
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }
}
