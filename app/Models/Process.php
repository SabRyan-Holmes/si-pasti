<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use League\CommonMark\Node\Block\Document;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Process extends Model
{
    use HasFactory;
    protected $guarded = ['id'];


    public function kegiatan()
    {
        return $this->belongsTo(Kegiatan::class);
    }

    public function documents()
    {
        return $this->hasMany(Document::class);
    }
}
