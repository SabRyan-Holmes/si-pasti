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
            'pengajuan_id' => ['required', 'integer'],
            'nama_kegiatan' => ['required', 'string'],

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

    /**
     * Custom messages for validation errors.
     */
    public function messages()
    {
        return [
            'kak.required_without_all' => 'Setidaknya salah satu dari file KAK, Form Permintaan, atau Surat Permintaan harus diunggah.',
            'form_permintaan.required_without_all' => 'Setidaknya salah satu dari file KAK, Form Permintaan, atau Surat Permintaan harus diunggah.',
            'surat_permintaan.required_without_all' => 'Setidaknya salah satu dari file KAK, Form Permintaan, atau Surat Permintaan harus diunggah.',

            'rancangan_kontrak.required_without_all' => 'Setidaknya salah satu dari file Rancangan Kontrak, Spekteknis, RAB, atau SPPP harus diunggah.',
            'spekteknis.required_without_all' => 'Setidaknya salah satu dari file Rancangan Kontrak, Spekteknis, RAB, atau SPPP harus diunggah.',
            'rab.required_without_all' => 'Setidaknya salah satu dari file Rancangan Kontrak, Spekteknis, RAB, atau SPPP harus diunggah.',
            'sppp.required_without_all' => 'Setidaknya salah satu dari file Rancangan Kontrak, Spekteknis, RAB, atau SPPP harus diunggah.',

            'sppbj.required_without' => 'Setidaknya salah satu dari file SPPBJ atau Surat Kontrak harus diunggah.',
            'surat_kontrak.required_without' => 'Setidaknya salah satu dari file SPPBJ atau Surat Kontrak harus diunggah.',

            'bast.required_without' => 'Setidaknya salah satu dari file BAST atau BAP harus diunggah.',
            'bap.required_without' => 'Setidaknya salah satu dari file BAST atau BAP harus diunggah.',

            'kuitansi.required_without' => 'Setidaknya salah satu dari file Kuitansi atau Surat Pesanan harus diunggah.',
            'surat_pesanan.required_without' => 'Setidaknya salah satu dari file Kuitansi atau Surat Pesanan harus diunggah.',
        ];
    }
}
