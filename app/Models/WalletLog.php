<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WalletLog extends Model
{
    protected $fillable = [
        'wallet_id',
        'amount',
        'type',
        'source_transaction_id',
        'description',
    ];

    public function wallet()
    {
        return $this->belongsTo(Wallet::class);
    }
}
