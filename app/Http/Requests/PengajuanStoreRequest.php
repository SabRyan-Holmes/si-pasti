<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PengajuanStoreRequest extends FormRequest
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
            'nama_tim' => ['required', 'string', 'max:100'],
            'nama_kegiatan' => ['required', 'string', 'max:100'],

            'kak' => ['nullable', 'file', 'mimes:pdf', 'max:15192'],
            'form_permintaan' => ['nullable', 'file', 'mimes:pdf', 'max:15192'],
            'surat_permintaan' => ['nullable', 'file',  'mimes:pdf', 'max:15192'],

            // Rule kustom untuk memastikan salah satu berkas harus diupload
            // Menggunakan required_without_all
            'kak' => ['required_without_all:form_permintaan,surat_permintaan', 'file', 'mimes:pdf', 'max:15192'],
            'form_permintaan' => ['required_without_all:kak,surat_permintaan', 'file', 'mimes:pdf', 'max:15192'],
            'surat_permintaan' => ['required_without_all:kak,form_permintaan', 'file', 'mimes:pdf', 'max:15192'],

        ];
    }

    public function messages(): array
    {
        return [
            // Pesan error untuk rule kustom
            'required' => 'Kolom :attribute harus diisi.',
            'string' => 'Kolom :attribute harus berupa teks.',
            'max' => 'Kolom :attribute tidak boleh lebih dari :max karakter.',
            'file' => 'Kolom :attribute harus berupa file.',
            'mimes' => 'Kolom :attribute harus berupa dokumen PDF.',

            'required_without_all' => 'Salah satu dari Berkas harus diupload.',

        ];
    }
}
