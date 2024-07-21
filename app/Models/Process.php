<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Process extends Model
{
    use HasFactory;
    protected $guarded = ['id'];
    protected $with = ['kegiatan'];


    public function kegiatan()
    {
        return $this->belongsTo(Kegiatan::class);
    }


}
