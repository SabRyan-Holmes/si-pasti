<?php

namespace App\Http\Requests\PPK;

use Illuminate\Foundation\Http\FormRequest;

class UnggahBerkasStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nama_kegiatan' => ['required', 'integer'],

            // Pengajuan Dari Ketua Tim
            'kak' => ['nullable', 'file', 'mimes:pdf', 'max:15192'],
            'form_permintaan' => ['nullable', 'file', 'mimes:pdf', 'max:15192'],
            'surat_permintaan' => ['nullable', 'file',  'mimes:pdf', 'max:15192'],

            // Pengajuan PBJ
            'rancangan_kontrak' => ['nullable', 'file', 'mimes:pdf', 'max:15192'],
            'spekteknis' => ['nullable', 'file', 'mimes:pdf', 'max:15192'],
            'rab' => ['nullable', 'file', 'mimes:pdf', 'max:15192'],
            'sppp' => ['nullable', 'file', 'mimes:pdf', 'max:15192'],

            // Pengajuan Kontrak
            'sppbj' => ['nullable', 'file', 'mimes:pdf', 'max:15192'],
            'surat_kontrak' => ['nullable', 'file', 'mimes:pdf', 'max:15192'],

            // Pengajuan Berita Acara
            'bast' => ['nullable', 'file', 'mimes:pdf', 'max:15192'],
            'bap' => ['nullable', 'file', 'mimes:pdf', 'max:15192'],

            // Pengajuan Kuitansi
            'kuitansi' => ['nullable', 'file', 'mimes:pdf', 'max:15192'],
            'surat_pesanan' => ['nullable', 'file', 'mimes:pdf', 'max:15192'],
        ];
    }
}
