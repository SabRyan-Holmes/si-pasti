import { InputError, InputLabel, SuccessButton } from "@/Components";
import React from "react";
import { FaCheck, FaDownload, FaEye } from "react-icons/fa6";
import { IoIosSend } from "react-icons/io";

export default function FormUnggah({
    requiredBerkas,
    berkas,
    setData,
    processing,
    errors,
    submit,
}) {
    const checkBerkas = (kategori, jenis_dokumen) => {
        return kategori.find((doc) => doc.jenis_dokumen === jenis_dokumen);
    };

    function updateFileName(fieldName) {
        const fileInput = document.getElementById(fieldName);
        const fileNameDisplay = document.getElementById(
            fieldName + "_filename"
        );
        const file = fileInput.files[0];

        if (file) {
            fileNameDisplay.textContent = file.name;
        } else {
            fileNameDisplay.textContent = "Tidak ada file yang dipilih";
        }
    }

    const _berkas = Object.keys(requiredBerkas).map((key) => {
        const value = requiredBerkas[key];
        return (
            berkas.find((d) => d.jenis_dokumen === value) || {
                jenis_dokumen: value,
                is_valid: null,
                path: "",
                nama: "",
                tipe_file: "",
            }
        );
    });

    function checkDone(berkas, _berkas) {
        // Fungsi untuk mengecek apakah ada obj.nama yang berisi
        if (berkas.length == _berkas.length) {
            return true;
        } else return false;
    }

    const isDone = checkDone(berkas, _berkas);

    return (
        <form onSubmit={submit} method="post" encType="multipart/form-data">
            {Object.entries(requiredBerkas).map(([fieldName, jenisDokumen]) => {
                const existingDocument = checkBerkas(berkas, jenisDokumen);
                const documentPath =
                    ((existingDocument && berkas) || []).find(
                        (doc) => doc.jenis_dokumen === jenisDokumen
                    )?.path || "";

                return (
                    <div className="my-3" key={fieldName}>
                        <InputLabel
                            htmlFor={fieldName}
                            value={jenisDokumen}
                            className="my-2"
                        />
                        <div className="relative inline-block w-full h-12 p-2 border rounded-md border-primary/25 focus:border-indigo-500 focus:ring-indigo-500">
                            {existingDocument ? (
                                <div className="flex items-center justify-between text-base">
                                    <div className="flex items-center justify-start gap-3 mt-1 text-sm cursor-pointer group">
                                        <div className="p-1 rounded-full bg-accent/20">
                                            <FaCheck className="w-4 h-4 fill-success " />
                                        </div>
                                        <p>File sudah diunggah :</p>
                                        <a
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="underline text-primary"
                                        >
                                            {existingDocument.nama}
                                        </a>

                                        {/* Kontainer untuk tombol "Lihat" dan "Download" */}
                                        <div className="relative bg-primary">
                                            <div className="absolute flex justify-center gap-2 transition-opacity opacity-0 -left-24 -bottom-11 group-hover:opacity-100 ">
                                                {/* Tombol "Lihat" */}

                                                <a
                                                    href={`/storage/${documentPath}`}
                                                    target="_blank"
                                                    className="flex items-end justify-center h-8 font-medium text-center group/button action-btn text-hijau/75 border-hijau/20 hover:bg-hijau hover:text-white"
                                                >
                                                    Lihat
                                                    <FaEye className="mx-1 fill-hijau/75 group-hover/button:fill-white" />
                                                </a>

                                                {/* Tombol "Download" */}
                                                <a
                                                    href={`/storage/${documentPath}`}
                                                    download={
                                                        existingDocument.nama
                                                    }
                                                    target="_blank"
                                                    className="flex items-end justify-center h-8 font-medium text-center group/button action-btn text-secondary/75 border-secondary/20 hover:bg-secondary hover:text-white"
                                                >
                                                    Unduh
                                                    <FaDownload className="mx-1 fill-secondary/75 group-hover/button:fill-white" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-x-3">
                                        <span
                                            id={fieldName + "_filename"}
                                            class="mt-2 text-gray-700 text-sm"
                                        >
                                            {""}
                                        </span>
                                        {/* /Label utnuk input file  */}
                                        <label
                                            // htmlFor={fieldName}
                                            className="px-3 py-1 text-sm text-white border-0 rounded-full shadow-sm cursor-not-allowed bg-slate-600/70 shadow-blue-500/30"
                                        >
                                            Pilih File
                                        </label>

                                        <div className="">
                                            <input
                                                type="file"
                                                name={fieldName}
                                                id={fieldName}
                                                onChange={(e) => {
                                                    setData(
                                                        fieldName,
                                                        e.target.files[0]
                                                    );
                                                    updateFileName(fieldName);
                                                }}
                                                className="hidden"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="mx-1">
                                    <input
                                        type="file"
                                        name={fieldName}
                                        onChange={(e) =>
                                            setData(
                                                fieldName,
                                                e.target.files[0]
                                            )
                                        }
                                        className="text-sm text-gray-600 file:absolute file:right-1 file:bg-primary/85 file:text-white file:border-0 file:py-1 file:px-3 file:rounded-full file:shadow-sm file:shadow-blue-500/30"
                                    />
                                </div>
                            )}
                        </div>
                        <InputError
                            message={errors[fieldName]}
                            className="mt-2"
                        />
                    </div>
                );
            })}

            {/* Button */}
            <div className="flex justify-end w-full mt-4">
                <SuccessButton disabled={processing || isDone} type="submit">
                    Ajukan
                    <IoIosSend className="w-5 h-5 ml-1" />
                </SuccessButton>
            </div>
        </form>
    );
}
