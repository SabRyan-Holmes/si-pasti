<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kegiatan extends Model
{
    use HasFactory;
    protected $guarded = ['id'];
    protected $with = ['user', 'documents'];

    public function user()
    {
        return $this->belongsTo(User::class, "created_by");
    }

    public function process()
    {
        return $this->hasMany(Process::class);
    }

    public function documents()
    {
        return $this->hasMany(Document::class);
    }

}
