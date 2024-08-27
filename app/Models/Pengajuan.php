<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Pengajuan extends Model
{
    use HasFactory;

    protected $guarded = ['id'];
    protected $with = ['created_by', 'documents'];

    public function created_by()
    {
        return $this->belongsTo(User::class, "created_by");
    }

    public function documents()
    {
        return $this->hasMany(Document::class, 'pengajuan_id');
    }

    public function scopeFilter(Builder $query, array $filters): void
    {
        // Search By Nama Kegiatan & Nama/NIP Ketua Tim
        $query->when($filters['search'] ?? false, function ($query, $search) {
            $query->where('nama_kegiatan', 'like', '%' . $search . '%')
            ->orWhere('nama_tim', 'like', '%' . $search . '%')
            ->orWhereHas('created_by', function ($q) use ($search) {
                    $q->where('name', 'like', '%' . $search . '%');
                });
        });


        // Berdasarkan Status
        $query->when(
            $filters['byStatus'] ?? false,
            fn($query, $byStatus) =>
            $query->where('Status', $byStatus)
        );

        // Berdasarkan Stage
        $query->when($filters['byStage'] ?? false, function ($query, $byStage) {
            $query->where('stage', $byStage);
        });
    }
}
