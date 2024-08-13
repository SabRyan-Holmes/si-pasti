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
            'surat_permintaan' => [ 'nullable', 'file',  'mimes:pdf', 'max:15192'],
            // 'form_permintaan' => ['nullable', 'sometimes', 'required_without:surat_permintaan',  'file', 'mimes:pdf', 'max:15192'],
            // 'surat_permintaan' => [ 'nullable','sometimes', 'required_without:form_permintaan', 'file',  'mimes:pdf', 'max:15192'],


            // required_if:email,null|string|exists:users,nim
        ];
    }
}
