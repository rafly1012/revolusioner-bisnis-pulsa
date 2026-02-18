<?php

// Admin
use App\Http\Controllers\Admin\AnnouncementController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\ProductsController as AdminProductsController;
use App\Http\Controllers\Admin\TransactionsController as AdminTransactionsController;
use App\Http\Controllers\Admin\UsersController;
use App\Http\Controllers\Admin\WalletController as AdminWalletController;
use App\Http\Controllers\Admin\WithdrawalsController as AdminWithdrawalsController;
// Users
use App\Http\Controllers\Users\ProductsController as UsersProductsController;
use App\Http\Controllers\Users\ReferralController as UsersReferralController;
use App\Http\Controllers\Users\TransactionsController as UsersTransactionsController;
use App\Http\Controllers\Users\WalletsController as UsersWalletsController;
use App\Http\Controllers\Users\WithdrawalController as UsersWithdrawalController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('syarat-ketentuan', function () {
    return Inertia::render('syarat-ketentuan');
})->name('syaratketentuan');
Route::get('kebijakan-privasi', function () {
    return Inertia::render('kebijakan-privasi');
})->name('kebijakanprivasi');

/*
|--------------------------------------------------------------------------
| Users Area
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'verified', 'role:users'])->prefix('user')->name('user.')->group(function () {
    Route::resource('referrals', UsersReferralController::class);
    Route::post('referrals/{referral}/claim', [UsersReferralController::class, 'claim'])
        ->name('users.referrals.claim');

    Route::resource('products', UsersProductsController::class);
    Route::post('products/{product}/buy', [UsersProductsController::class, 'buy'])
        ->name('products.buy');

    Route::resource('transactions', UsersTransactionsController::class);

    Route::resource('withdrawals', UsersWithdrawalController::class);
    Route::resource('wallets', UsersWalletsController::class);
});

/*
|--------------------------------------------------------------------------
| Admin Area
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('dashboard', [AdminDashboardController::class, 'index'])
        ->name('dashboard');

    Route::resource('users', UsersController::class);
    Route::post('users/reward', [UsersController::class, 'reward'])
        ->name('users.reward');
    Route::patch('{id}/is-active', [UsersController::class, 'isActive'])->name('users.isActive');

    Route::resource('products', AdminProductsController::class);

    Route::resource('transactions', AdminTransactionsController::class);
    Route::patch('transactions/{transaction}/verify', [AdminTransactionsController::class, 'verify'])
        ->name('transactions.verify');

    Route::resource('withdrawals', AdminWithdrawalsController::class);
    Route::patch('withdrawals/{withdrawal}/verify', [AdminWithdrawalsController::class, 'verify'])
        ->name('withdrawals.verify');
    Route::patch('wallets/{user}/wallet', [AdminWalletController::class, 'update'])
        ->name('wallets.user.update');

    Route::resource('announcements', AnnouncementController::class);
});

Route::post('/notifications/read-all', function () {
    Auth::user()->unreadNotifications->markAsRead();

    return back();
})->name('notifications.readAll');

require __DIR__.'/settings.php';
