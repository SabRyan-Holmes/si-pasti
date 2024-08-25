import { SuccessButton } from "@/Components";
import { usePage } from "@inertiajs/react";
import React, { useState } from "react";
import { FaEdit, FaFileUpload } from "react-icons/fa";
import { FaDownload, FaEye, FaFileCircleCheck } from "react-icons/fa6";
import { IoIosSend } from "react-icons/io";

export default function TabelPengajuan({
    daftarBerkas,
    submit,
    data,
    requiredBerkas,
    setData,
    isDisabled,
}) {
    const props = usePage().props;
    // Function to get the key based on the value
    const getKeyByValue = (object, value) => {
        return Object.keys(object).find((key) => object[key] === value);
    };

    const [uploadedFiles, setUploadedFiles] = useState({});

    const handleFileChange = (e, docType, fileKey) => {
        const file = e.target.files[0];
        if (file) {
            setUploadedFiles((prev) => ({
                ...prev,
                [docType]: file.name,
            }));
            setData(fileKey, file); // Assuming setData sets the file data in your form
        }
    };

    return (
        <form onSubmit={submit} enctype="multipart/form-data">
            <table className="table mt-3 border rounded-md border-primary/25 table-bordered">
                {/* head */}
                <thead className="bg-secondary">
                    <tr className="text-sm ">
                        <th width="5%"></th>
                        <th width="30%">Nama Berkas</th>
                        <th width="35%">Berkas</th>
                        <th width="15%" className="text-center">
                            Status Saat Ini
                        </th>
                        <th width="15%" className="text-center">
                            Aksi
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {daftarBerkas.map((berkas, i) => (
                        <tr>
                            <th className="text-primary">{i + 1}</th>
                            <td className="capitalize">
                                {berkas.jenis_dokumen}
                            </td>
                            {/* Kalau ada berkas */}
                            {berkas.nama ? (
                                <>
                                    <td className="text-sm capitalize">
                                        <div className="relative group">
                                            <a
                                                // href={`/storage/${berkas.path}`}
                                                target="_blank"
                                                className="underline cursor-pointer hover:text-primary text-primary decoration-primary"
                                            >
                                                {berkas.nama}.
                                                <span className="lowercase">
                                                    {berkas.tipe_file}
                                                </span>
                                            </a>

                                            {/* Kontainer untuk tombol "Lihat" dan "Download" */}
                                            <div className="absolute flex justify-center gap-2 transition-opacity opacity-0 group-hover:opacity-100">
                                                {/* Tombol "Lihat" */}

                                                <a
                                                    href={`/storage/${berkas.path}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-end justify-center h-8 font-medium text-center group/button action-btn text-hijau/75 border-hijau/20 hover:bg-hijau hover:text-white"
                                                >
                                                    Lihat
                                                    <FaEye className="mx-1 fill-hijau/75 group-hover/button:fill-white" />
                                                </a>

                                                {/* Tombol "Download" */}
                                                <a
                                                    href={`/storage/${berkas.path}`}
                                                    download={berkas.nama}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-end justify-center h-8 font-medium text-center group/button action-btn text-secondary/75 border-secondary/20 hover:bg-secondary hover:text-white"
                                                >
                                                    Unduh
                                                    <FaDownload className="mx-1 fill-secondary/75 group-hover/button:fill-white" />
                                                </a>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="text-center text-nowrap">
                                        {berkas.is_valid == null && (
                                            <div className="label-base bg-secondary/10">
                                                Diproses
                                            </div>
                                        )}

                                        {berkas.is_valid == true && (
                                            <div className="label-success">
                                                Valid
                                            </div>
                                        )}

                                        {berkas.is_valid == false && (
                                            <div className="label-warning">
                                                Tidak Valid
                                            </div>
                                        )}
                                    </td>

                                    {/* Kalo Masih diproses/Udah valid tidak bisa diedit/upload ulang */}
                                    <td className="text-center text-nowrap">
                                        {berkas.is_valid == null && (
                                            <label className="transition-all cursor-not-allowed action-btn text-secondary">
                                                <FaFileCircleCheck className="mx-1 mr-1 fill-secondary" />
                                                <span>Unggah</span>
                                            </label>
                                        )}

                                        {berkas.is_valid == true && (
                                            <label
                                                aria-disabled
                                                className="transition-all cursor-not-allowed action-btn text-secondary "
                                            >
                                                <FaFileUpload className="mx-1 mr-1 fill-secondary" />
                                                <span>Unggah</span>
                                            </label>
                                        )}

                                        {/* input  Hidden for Upload Ulang*/}
                                        <input
                                            id={berkas.jenis_dokumen}
                                            type="file"
                                            className="hidden"
                                            onChange={(e) => {
                                                handleFileChange(
                                                    e,
                                                    berkas.jenis_dokumen,
                                                    getKeyByValue(
                                                        requiredBerkas,
                                                        berkas.jenis_dokumen
                                                    )
                                                );
                                                // is_valid kembali menjadi diproses jika sebelumnya tidak valid dan diupload ulang lagi

                                                // Gunakan setData dengan cara yang benar
                                                setData((prevData) => {
                                                    // Tambahkan berkas.id ke edited_id, pastikan tidak ada duplikat
                                                    const updatedEditedId = [
                                                        ...prevData.edited_id,
                                                        berkas.id,
                                                    ].filter(
                                                        (v, i, a) =>
                                                            a.indexOf(v) === i
                                                    );

                                                    return {
                                                        ...prevData,
                                                        edited_id:
                                                            updatedEditedId,
                                                    };
                                                });
                                            }}
                                        />

                                        {/* Kalo tidak valid maka bisa diupload ulang */}
                                        {berkas.is_valid == false &&
                                        uploadedFiles[berkas.jenis_dokumen] ? (
                                            <label
                                                htmlFor={berkas.jenis_dokumen}
                                                className="transition-all cursor-pointer action-btn text-secondary hover:scale-105"
                                            >
                                                <FaFileCircleCheck className="mx-1 mr-1 fill-secondary" />
                                                <span>Edit</span>
                                            </label>
                                        ) : (
                                            berkas.is_valid == false && (
                                                <label
                                                    htmlFor={
                                                        berkas.jenis_dokumen
                                                    }
                                                    className="transition-all action-btn text-secondary hover:scale-105"
                                                >
                                                    <FaEdit className="mx-1 mr-1 fill-secondary" />
                                                    <span>Edit</span>
                                                </label>
                                            )
                                        )}
                                    </td>
                                </>
                            ) : (
                                <>
                                    {/* Kalau tidak ada berkas */}

                                    <td colSpan={2} className="text-center">
                                        {uploadedFiles[berkas.jenis_dokumen] ? (
                                            <span className="text-sm font-medium text-center capitalize text-secondary">
                                                {
                                                    uploadedFiles[
                                                        berkas.jenis_dokumen
                                                    ]
                                                }
                                            </span>
                                        ) : (
                                            <div className="label-base bg-base-200">
                                                Berkas Belum Diajukan
                                            </div>
                                        )}
                                    </td>
                                    <td className="text-center">
                                        {/* input  Hidden for upload jika belum pernah diupload*/}

                                        <input
                                            id={berkas.jenis_dokumen}
                                            type="file"
                                            className="hidden"
                                            onChange={(e) => {
                                                handleFileChange(
                                                    e,
                                                    berkas.jenis_dokumen,
                                                    getKeyByValue(
                                                        requiredBerkas,
                                                        berkas.jenis_dokumen
                                                    )
                                                );
                                                // is_valid kembali menjadi diproses jika sebelumnya tidak valid dan diupload ulang lagi

                                                setisEdit(true);

                                                // Gunakan setData dengan cara yang benar
                                                setData((prevData) => {
                                                    // Tambahkan berkas.id ke edited_id, pastikan tidak ada duplikat
                                                    const updatedEditedId = [
                                                        ...prevData.edited_id,
                                                        berkas.id,
                                                    ].filter(
                                                        (v, i, a) =>
                                                            a.indexOf(v) === i
                                                    );

                                                    return {
                                                        ...prevData,
                                                        edited_id:
                                                            updatedEditedId,
                                                    };
                                                });
                                            }}
                                        />

                                        {/* Kalo Dicoba Upload || Icon Tercentang*/}
                                        {uploadedFiles[berkas.jenis_dokumen] ? (
                                            <label
                                                htmlFor={berkas.jenis_dokumen}
                                                className="transition-all cursor-wait action-btn text-secondary hover:scale-105"
                                            >
                                                <FaFileCircleCheck className="mx-1 mr-1 fill-secondary" />
                                                <span>Unggah</span>
                                            </label>
                                        ) : (
                                            <label
                                                htmlFor={
                                                    isDisabled
                                                        ? ""
                                                        : berkas.jenis_dokumen
                                                }
                                                className={`transition-all action-btn text-secondary hover:scale-105' + ${
                                                    isDisabled
                                                        ? "cursor-not-allowed"
                                                        : "cursor-pointer"
                                                }`}
                                            >
                                                <FaFileUpload className="mx-1 mr-1 fill-secondary" />
                                                <span>Unggah</span>
                                            </label>
                                        )}
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Button */}
            <div className="flex justify-end w-full p-1 mt-4">
                <SuccessButton type="submit" disabled={isDisabled}>
                    Ajukan Ulang
                    <IoIosSend />
                </SuccessButton>
            </div>
        </form>
    );
}
