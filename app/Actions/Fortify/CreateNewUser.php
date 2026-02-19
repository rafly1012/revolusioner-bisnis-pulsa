<?php

namespace App\Actions\Fortify;

use App\Concerns\PasswordValidationRules;
use App\Concerns\ProfileValidationRules;
use App\Models\Referral;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules, ProfileValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): User
    {
        // $defaultReferral = 'RBP-MA8SBDAN';

        // if (empty($input['referral_code'])) {
        //     $input['referral_code'] = $defaultReferral;
        // }

        Validator::make($input, [
            ...$this->profileRules(),
            'password' => $this->passwordRules(),
            'referral_code' => 'nullable|exists:users,referral_code',
        ])->validate();

        $role = 'admin';

        $referralCode = $role === 'users'
            ? $this->generateUniqueReferralCode()
            : null;

        $userData = [
            'name' => $input['name'],
            'email' => $input['email'],
            'role' => $role,
            'password' => $input['password'],
        ];

        if ($role === 'users') {
            $userData['referral_code'] = $referralCode;
            $userData['phone'] = $input['phone'] ?? null;
            $userData['electricity'] = $input['electricity'] ?? null;
        }

        $user = User::create($userData);

        if ($role === 'users' && ! empty($input['referral_code'])) {
            $referrer = User::where('referral_code', $input['referral_code'])->first();

            if ($referrer) {
                Referral::create([
                    'referrer_id' => $referrer->id,
                    'referred_id' => $user->id,
                    'code' => $input['referral_code'],
                ]);
            }
        }

        return $user;
    }

    private function generateUniqueReferralCode(): string
    {
        do {
            $randomPart = strtoupper(Str::random(8)); // 8 karakter acak
            $code = "RBP-{$randomPart}";
        } while (User::where('referral_code', $code)->exists());

        return $code;
    }
}
