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

            // Pengajuan PBJ

            'rancangan_kontrak' => ['nullable', 'file', 'mimes:pdf', 'max:15192'],
            'spekteknis' => ['nullable', 'file', 'mimes:pdf', 'max:15192'],
            'rab' => ['nullable', 'file',  'mimes:pdf', 'max:15192'],
            'sppp' => ['nullable', 'file',  'mimes:pdf', 'max:15192'],

            // Rule kustom untuk memastikan salah satu berkas harus diupload
            // Menggunakan required_without_all
            'rancangan_kontrak' => ['required_without_all:spekteknis,rab, sppp,', 'file', 'mimes:pdf', 'max:15192'],
            'spekteknis' => ['required_without_all:rancangan_kontrak,rab,sppp', 'file', 'mimes:pdf', 'max:15192'],
            'rab' => ['required_without_all:rancangan_kontrak,spekteknis,sppp', 'file', 'mimes:pdf', 'max:15192'],
            'sppp' => ['required_without_all:rancangan_kontrak,spekteknis,rab', 'file', 'mimes:pdf', 'max:15192'],


            // Pengajuan Kontrak
            'sppbj' => ['nullable', 'file', 'mimes:pdf', 'max:15192'],
            'surat_kontrak' => ['nullable', 'file', 'mimes:pdf', 'max:15192'],
            // Rule kustom untuk memastikan salah satu berkas harus diupload
            // Menggunakan required_without_all
            'sppbj' => ['required_without_all:surat_kontrak', 'file', 'mimes:pdf', 'max:15192'],
            'surat_kontrak' => ['required_without_all:sppbj', 'file', 'mimes:pdf', 'max:15192'],

            // // Pengajuan Berita Acara
            'bast' => ['nullable', 'file', 'mimes:pdf', 'max:15192'],
            'bap' => ['nullable', 'file', 'mimes:pdf', 'max:15192'],

            // Menggunakan required_without_all
            'bast' => ['required_without_all:bap', 'file', 'mimes:pdf', 'max:15192'],
            'bap' => ['required_without_all:bast', 'file', 'mimes:pdf', 'max:15192'],

            // // Pengajuan Kuitansi
            'kuitansi' => ['nullable', 'file', 'mimes:pdf', 'max:15192'],
            'surat_pesanan' => ['nullable', 'file', 'mimes:pdf', 'max:15192'],

            // Menggunakan required_without_all
            'kuitansi' => ['required_without_all:surat_pesanan', 'file', 'mimes:pdf', 'max:15192'],
            'surat_pesanan' => ['required_without_all:kuitansi', 'file', 'mimes:pdf', 'max:15192'],


        ];
    }

    /**
     * Custom messages for validation errors.
     */
    public function messages(): array
    {
        return [
            // Pesan error untuk rule kustom
            'required' => 'Kolom :attribute harus diisi.',
            'string' => 'Kolom :attribute harus berupa teks.',
            'max' => 'Kolom :attribute tidak boleh lebih dari :max karakter.',
            'file' => 'Kolom :attribute harus berupa file.',
            'mimes' => 'Kolom :attribute harus berupa dokumen PDF.',
            'required_without_all' => 'Salah satu dari berkas harus diupload.',
        ];
    }
}
