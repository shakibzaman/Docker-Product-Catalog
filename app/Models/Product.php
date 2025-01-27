<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Product extends Model
{
    use HasApiTokens;
    protected $fillable = ['name', 'description', 'price', 'stock_quantity', 'min_notification_stock'];
}
