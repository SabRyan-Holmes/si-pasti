<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    use HasFactory;
    protected $guarded = ['id'];


    // Relasi Start


    public function kegiatan()
    {
        return $this->belongsTo(Kegiatan::class);
    }

    public function submitted_by()
    {
        return $this->belongsTo(User::class);
    }

    // Relasi End



}
