<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Withdrawal extends Model
{
    protected $fillable = [
        'user_id',
        'withdrawal_code',
        'amount',
        'admin_fee',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
