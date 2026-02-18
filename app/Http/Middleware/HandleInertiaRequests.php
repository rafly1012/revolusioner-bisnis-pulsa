<?php

namespace App\Http\Middleware;

use App\Models\Announcement;
use App\Models\Product;
use App\Models\Wallet;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => $request->user(),
            ],
            'hasApprovedTransaction' => $request->user()
                ? $request->user()
                    ->transactions()
                    ->where('status', 'approved')
                    ->exists()
                : false,
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'notifications' => $request->user()
                ? $request->user()->notifications()->latest()->take(10)->get()
                : [],

            'unread_count' => $request->user()
                ? $request->user()->unreadNotifications()->count()
                : 0,
            'wallet' => function () use ($request) {
                if (! $request->user()) {
                    return null;
                }

                return Wallet::firstOrCreate(
                    ['user_id' => $request->user()->id],
                    ['balance' => 0]
                )->only(['id', 'balance']);
            },
            'products' => function () {
                return Product::select('id', 'name', 'price', 'image', 'description')->get();
            },
            'announcements' => function () {
                return Announcement::orderBy('created_at', 'desc')
                    ->get(['id', 'title', 'content', 'created_at']);
            },
            'flash' => [
                'success' => $request->session()->get('success'),
                'error' => $request->session()->get('error'),
                'warning' => $request->session()->get('warning'),
                'info' => $request->session()->get('info'),
            ],
        ];
    }
}
