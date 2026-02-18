<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\ReferralService;
use App\Services\RewardService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UsersController extends Controller
{
    public function __construct(
        private ReferralService $referralService
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('admin/users/index', [
            'users' => User::where('role', 'users')
                ->whereHas('transactions', function ($q) {
                    $q->where('status', 'approved');
                })
                ->latest()
                ->get(),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id): Response
    {
        $user = User::with([
            'wallet.logs' => function ($query) {
                $query->latest();
            },
            'transactions' => function ($query) {
                $query->with('details.product')->latest();
            },
            'withdrawals' => function ($query) {
                $query->latest();
            },
        ])->findOrFail($id);

        return Inertia::render('admin/users/show', [
            'user' => $user,
            'data' => fn () => $this->referralService->getUserDetail($id),
            'wallet' => $user->wallet,
            'transactions' => $user->transactions,
            'withdrawals' => $user->withdrawals,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'new_password' => 'required|string|min:8',
            'action_password' => 'required|string',
        ]);

        if ($request->action_password !== env('ADMIN_ACTION')) {
            return back()->with('error', 'Password konfirmasi salah.');
        }

        $user = User::findOrFail($id);

        $user->password = bcrypt($request->new_password);
        $user->save();

        return back()->with('success', 'Password user berhasil diperbarui.');
    }

    public function reward(Request $request, RewardService $service)
    {
        $request->validate([
            'amount' => 'required|numeric|min:1',
            'action_password' => 'required|string',
        ]);

        $admin_action = env('ADMIN_ACTION');

        if ($request->action_password !== $admin_action) {
            return back()->with([
                'error' => 'Password konfirmasi salah.',
            ]);
        }

        $service->distribute((int) $request->amount);

        return back()->with('success', 'Dana berhasil dibagikan ke user');
    }

    public function isActive(Request $request, string $id)
    {
        $request->validate([
            'is_activate' => 'required|numeric|in:0,1',
            'action_password' => 'required|string',
        ]);

        if ($request->action_password !== env('ADMIN_ACTION')) {
            return back()->with('error', 'Password konfirmasi admin salah.');
        }

        $user = User::findOrFail($id);

        $user->is_active = (bool) $request->is_activate;
        $user->save();

        $message = $user->is_active ? 'User diaktifkan.' : 'User dinonaktifkan.';

        return back()->with('success', $message);
    }
}
