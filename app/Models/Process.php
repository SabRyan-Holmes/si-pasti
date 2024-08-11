<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

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

    public function scopeFilter(Builder $query, array $filters): void
    {
        // Search By Nama & NIP
        $query->when(
            $filters['search'] ?? false,
            fn($query, $search) =>
            $query->whereHas('kegiatan', function ($q) use ($search) {
                $q->where('kegiatans.nama_kegiatan', 'like', '%' . $search . '%');
            })->get()
        );

        // Berdasarkan Divisi
        $query->when(
            $filters['byDivisi'] ?? false,
            fn($query, $byDivisi) =>
            $query->where('Divisi', $byDivisi)
        );
    }
}
