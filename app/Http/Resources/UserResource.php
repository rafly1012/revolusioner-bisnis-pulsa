<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'referral_code' => $this->referral_code,
            'created_at' => $this->created_at,

            'total_referrals' => $this->whenCounted('referrals'),

            'referred_by' => $this->whenLoaded('referredBy', function () {
                if (! $this->referredBy || ! $this->referredBy->referrer) {
                    return null;
                }

                return [
                    'id' => $this->referredBy->referrer->id,
                    'name' => $this->referredBy->referrer->name,
                    'code' => $this->referredBy->code,
                ];
            }),
        ];
    }
}
