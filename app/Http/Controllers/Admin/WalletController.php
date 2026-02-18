<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class WalletController extends Controller
{
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'bank_name' => 'required|string|max:100',
            'bank_account' => 'required|string|max:50',
            'action_password' => 'required|string',
        ]);

        $admin_action = env('ADMIN_ACTION');

        if ($request->action_password !== $admin_action) {
            return back()->with([
                'error' => 'Password konfirmasi salah.',
            ]);
        }

        $wallet = $user->wallet()->firstOrCreate(
            ['user_id' => $user->id],
            ['balance' => 0]
        );

        $wallet->update([
            'bank_name' => $validated['bank_name'],
            'bank_account' => $validated['bank_account'],
        ]);

        return redirect()
            ->back()
            ->with('success', 'Dompet berhasil diperbarui');
    }
}
