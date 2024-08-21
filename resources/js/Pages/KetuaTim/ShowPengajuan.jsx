import React, { useEffect, useState } from "react";
import { useForm, Link, Head, usePage, router } from "@inertiajs/react";
import Swal from "sweetalert2";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SecondaryButton from "@/Components/SecondaryButton";
import { RiArrowGoBackFill } from "react-icons/ri";
import { FaEdit, FaEye, FaFileUpload } from "react-icons/fa";
import { MdEditDocument } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import {
    FaDownload,
    FaFileCircleCheck,
    FaRegFolder,
    FaRegFolderOpen,
    FaUpload,
} from "react-icons/fa6";
import { IoDocumentTextOutline } from "react-icons/io5";
import { TiDocumentText } from "react-icons/ti";
import { SuccessButton } from "@/Components";

export default function ShowPengajuan({
    title,
    auth,
    flash,
    pengajuan,
    berkasKT,
}) {
    const props = usePage().props;
    // Function to get the key based on the value
    const getKeyByValue = (object, value) => {
        return Object.keys(object).find((key) => object[key] === value);
    };

    const requiredBerkasKT = {
        kak: "Kerangka Ajuan Kerja",
        form_permintaan: "Form Permintaan",
        surat_permintaan: "Surat Permintaan",
    };

    const documentsKT = Object.keys(requiredBerkasKT).map((key) => {
        const value = requiredBerkasKT[key];
        return (
            berkasKT.find((d) => d.jenis_dokumen === value) || {
                jenis_dokumen: value,
                is_valid: null,
                path: "",
                nama: "",
                tipe_file: "",
            }
        );
    });

    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            pengajuan_id: pengajuan.id,
            nama_kegiatan: pengajuan.nama_kegiatan,
            unggah_ulang: true,
            kak: null,
            form_permintaan: null,
            surat_permintaan: null,

            // If edited
            edited_id: [],
        });

    function submit(e) {
        e.preventDefault(); // Mencegah perilaku default dari form submit
        post(route("ketua-tim.ajukan-berkas-ulang"), {
            data: data,
            _token: props.csrf_token,
            _method: "POST",
            forceFormData: true,

            onSuccess: () => {
                clearErrors();
                console.log("Submit selesai dari On Success");

                router.reload(); // Anda dapat menentukan komponen mana yang ingin di-refresh
            },
            onError: () => {
                console.log("Gagal submit");
            },
            onFinish: () => {
                console.log("Submit selesai");
                setisEdit(false);
            },
        });
    }

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

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        },
    });

    useEffect(() => {
        if (flash.message) {
            Toast.fire({
                icon: "success",
                title: flash.message,
            });
        }
    }, [flash.message]);

    const [isEdit, setisEdit] = useState(false);
    const ketuaTim = pengajuan.created_by;
    let nama = ketuaTim.name.split(" / ")[0];
    let gelar = ketuaTim.name.split(" / ")[1];

    // Logika untuk mengecek apakah  smaa2 berisi
    function cekKeyNamaBerisi(berkasDB, documentsRow) {
        // Cek panjang kedua array sama
        if (berkasDB.length !== documentsRow.length) {
            return false;
        }

        // Fungsi untuk mengecek apakah nilai dari key 'nama' tidak kosong, null, atau undefined
        const isNamaValid = (obj) =>
            obj.nama !== undefined &&
            obj.nama !== null &&
            obj.nama.trim() !== "";

        // Cek semua elemen di 'berkasDB'
        const isBerkasNamaValid = berkasDB.every(isNamaValid);

        // Cek semua elemen di 'documentsRow'
        const isDocumentsNamaValid = documentsRow.every(isNamaValid);

        // Return true jika semua key 'nama' berisi nilai valid
        return isBerkasNamaValid && isDocumentsNamaValid;
    }

    const isDone = cekKeyNamaBerisi(berkasKT, documentsKT);

    console.log("isi data");
    console.log(data);
    console.log("errors :");
    console.log(errors);

    console.log("is Edit & isDone ", isEdit, isDone);
    return (
        <AuthenticatedLayout
            user={auth.user}
            title={title}
            current={route().current()}
        >
            <Head title={title} />
            {/* content */}
            <section className="px-12 mx-auto phone:h-screen laptop:h-full max-w-screen-laptop ">
                <div className="flex items-center justify-between ">
                    {/* Breadcumbs */}
                    <div className="my-3 text-sm capitalize breadcrumbs">
                        <ul>
                            <li>
                                <a href={route("daftar-berkas")}>
                                    <IoDocumentTextOutline className="w-4 h-4 mr-2" />
                                    Riwayat Pengajuan
                                </a>
                            </li>
                            <li>
                                <a>
                                    <TiDocumentText className="w-4 h-4 mr-1" />
                                    {pengajuan.nama_kegiatan}
                                </a>
                            </li>
                            <li>
                                <a>{title}</a>
                            </li>
                        </ul>
                    </div>
                    <SecondaryButton
                        onClick={() => window.history.back()}
                        className="capitalize bg-secondary/5 "
                    >
                        Kembali
                        <RiArrowGoBackFill className="w-3 h-3 ml-2 fill-secondary" />
                    </SecondaryButton>
                </div>

                <main>
                    <div class="mt-10 capitalize max-w-screen-phone text-nowrap">
                        <div class="grid grid-cols-2 gap-0">
                            <span class="mr-1 font-bold">Nama Kegiatan</span>
                            <span>: {pengajuan.nama_kegiatan}</span>
                        </div>
                        <div class="grid grid-cols-2 gap-0">
                            <span class="mr-1 font-bold">Ketua TIM /NIP</span>
                            <span>
                                : {nama} {gelar}
                            </span>
                        </div>
                        <div class="grid grid-cols-2 gap-0">
                            <span class="mr-1 font-bold">Nama Tim</span>
                            <span>: {pengajuan.nama_tim}</span>
                        </div>
                    </div>

                    <div className="mt-10 mb-20 overflow-x-auto">
                        <h2 className="text-base font-semibold">
                            Pengajuan Permintaan Pengadaan
                        </h2>
                        {/* Tabel Berkas Pengajuan KT/Pengadaan  */}
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
                                    {documentsKT.map((berkas, i) => (
                                        <tr>
                                            <th className="text-primary">
                                                {i + 1}
                                            </th>
                                            <td className="capitalize">
                                                {berkas.jenis_dokumen}
                                            </td>
                                            {berkas.nama ? (
                                                <>
                                                    <td className="text-sm capitalize">
                                                        <div className="relative group">
                                                            <a
                                                                href={`/storage/${berkas.path}`}
                                                                target="_blank"
                                                                className="underline hover:text-primary text-primary decoration-primary"
                                                            >
                                                                {berkas.nama}.
                                                                <span className="lowercase">
                                                                    {
                                                                        berkas.tipe_file
                                                                    }
                                                                </span>
                                                            </a>

                                                            {/* Kontainer untuk tombol "Lihat" dan "Download" */}
                                                            <div className="absolute flex justify-center gap-2 transition-opacity opacity-0 group-hover:opacity-100">
                                                                {/* Tombol "Lihat" */}

                                                                <a
                                                                    href={`/storage/${berkas.path}`}
                                                                    target="_blank"
                                                                    className="flex items-end justify-center h-8 font-medium text-center group/button action-btn text-hijau/75 border-hijau/20 hover:bg-hijau hover:text-white"
                                                                >
                                                                    Lihat
                                                                    <FaEye className="mx-1 fill-hijau/75 group-hover/button:fill-white" />
                                                                </a>

                                                                {/* Tombol "Download" */}
                                                                <a
                                                                    href={`/storage/${berkas.path}`}
                                                                    download={
                                                                        berkas.nama
                                                                    }
                                                                    target="_blank"
                                                                    className="flex items-end justify-center h-8 font-medium text-center group/button action-btn text-secondary/75 border-secondary/20 hover:bg-secondary hover:text-white"
                                                                >
                                                                    Unduh
                                                                    <FaDownload className="mx-1 fill-secondary/75 group-hover/button:fill-white" />
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td className="text-center text-nowrap">
                                                        {berkas.is_valid ==
                                                            null && (
                                                            <div className="label-base bg-secondary/10">
                                                                Diproses
                                                            </div>
                                                        )}

                                                        {berkas.is_valid ==
                                                            true && (
                                                            <div className="label-success">
                                                                Valid
                                                            </div>
                                                        )}

                                                        {berkas.is_valid ==
                                                            false && (
                                                            <div className="label-warning">
                                                                Tidak Valid
                                                            </div>
                                                        )}
                                                    </td>

                                                    {/* Kalo Masih diproses belum bisa diedit */}
                                                    <td className="text-center text-nowrap">
                                                        {berkas.is_valid ==
                                                            null && (
                                                            <label className="transition-all cursor-not-allowed action-btn text-secondary">
                                                                <FaFileCircleCheck className="mx-1 mr-1 fill-secondary" />
                                                                <span>
                                                                    Unggah
                                                                </span>
                                                            </label>
                                                        )}

                                                        {berkas.is_valid ==
                                                            true && (
                                                            <label
                                                                aria-disabled
                                                                className="transition-all cursor-not-allowed action-btn text-secondary "
                                                            >
                                                                <FaFileUpload className="mx-1 mr-1 fill-secondary" />
                                                                <span>
                                                                    Unggah
                                                                </span>
                                                            </label>
                                                        )}
                                                        {/* input  Hidden for Upload Ulang*/}
                                                        <input
                                                            id={
                                                                berkas.jenis_dokumen
                                                            }
                                                            type="file"
                                                            className="hidden"
                                                            onChange={(e) => {
                                                                handleFileChange(
                                                                    e,
                                                                    berkas.jenis_dokumen,
                                                                    getKeyByValue(
                                                                        requiredBerkasKT,
                                                                        berkas.jenis_dokumen
                                                                    )
                                                                );
                                                                // is_valid kembali menjadi diproses jika sebelumnya tidak valid dan diupload ulang lagi
                                                                setisEdit(true);
                                                                // Gunakan setData dengan cara yang benar
                                                                setData(
                                                                    (
                                                                        prevData
                                                                    ) => {
                                                                        // Tambahkan berkas.id ke edited_id, pastikan tidak ada duplikat
                                                                        const updatedEditedId =
                                                                            [
                                                                                ...prevData.edited_id,
                                                                                berkas.id,
                                                                            ].filter(
                                                                                (
                                                                                    v,
                                                                                    i,
                                                                                    a
                                                                                ) =>
                                                                                    a.indexOf(
                                                                                        v
                                                                                    ) ===
                                                                                    i
                                                                            );

                                                                        return {
                                                                            ...prevData,
                                                                            edited_id:
                                                                                updatedEditedId,
                                                                        };
                                                                    }
                                                                );
                                                            }}
                                                        />

                                                        {berkas.is_valid ==
                                                            false &&
                                                        uploadedFiles[
                                                            berkas.jenis_dokumen
                                                        ] ? (
                                                            <label
                                                                htmlFor={
                                                                    berkas.jenis_dokumen
                                                                }
                                                                className="transition-all cursor-wait action-btn text-secondary hover:scale-105"
                                                            >
                                                                <FaFileCircleCheck className="mx-1 mr-1 fill-secondary" />
                                                                <span>
                                                                    Edit
                                                                </span>
                                                            </label>
                                                        ) : (
                                                            berkas.is_valid ==
                                                                false && (
                                                                <label
                                                                    htmlFor={
                                                                        berkas.jenis_dokumen
                                                                    }
                                                                    className="transition-all action-btn text-secondary hover:scale-105"
                                                                >
                                                                    <FaEdit className="mx-1 mr-1 fill-secondary" />
                                                                    <span>
                                                                        Edit
                                                                    </span>
                                                                </label>
                                                            )
                                                        )}
                                                    </td>
                                                </>
                                            ) : (
                                                <>
                                                    <td
                                                        colSpan={2}
                                                        className="text-center"
                                                    >
                                                        {uploadedFiles[
                                                            berkas.jenis_dokumen
                                                        ] ? (
                                                            <span className="text-sm font-medium text-center capitalize text-secondary">
                                                                {
                                                                    uploadedFiles[
                                                                        berkas
                                                                            .jenis_dokumen
                                                                    ]
                                                                }
                                                            </span>
                                                        ) : (
                                                            <div className="label-base bg-base-200">
                                                                Berkas Belum
                                                                Diajukan
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td className="p-1 text-center">
                                                        {/* input  Hidden for upload jika belum pernah diupload*/}

                                                        <input
                                                            id={
                                                                berkas.jenis_dokumen
                                                            }
                                                            type="file"
                                                            className="hidden"
                                                            onChange={(e) => {
                                                                handleFileChange(
                                                                    e,
                                                                    berkas.jenis_dokumen,
                                                                    getKeyByValue(
                                                                        requiredBerkasKT,
                                                                        berkas.jenis_dokumen
                                                                    )
                                                                );
                                                                // is_valid kembali menjadi diproses jika sebelumnya tidak valid dan diupload ulang lagi

                                                                setisEdit(true);
                                                                // Gunakan setData dengan cara yang benar
                                                                setData(
                                                                    (
                                                                        prevData
                                                                    ) => {
                                                                        // Tambahkan berkas.id ke edited_id, pastikan tidak ada duplikat
                                                                        const updatedEditedId =
                                                                            [
                                                                                ...prevData.edited_id,
                                                                                berkas.id,
                                                                            ].filter(
                                                                                (
                                                                                    v,
                                                                                    i,
                                                                                    a
                                                                                ) =>
                                                                                    a.indexOf(
                                                                                        v
                                                                                    ) ===
                                                                                    i
                                                                            );

                                                                        return {
                                                                            ...prevData,
                                                                            edited_id:
                                                                                updatedEditedId,
                                                                        };
                                                                    }
                                                                );
                                                            }}
                                                        />

                                                        {/* Kalo Dicoba Upload */}
                                                        {uploadedFiles[
                                                            berkas.jenis_dokumen
                                                        ] ? (
                                                            <label
                                                                htmlFor={
                                                                    berkas.jenis_dokumen
                                                                }
                                                                className="transition-all cursor-wait action-btn text-secondary hover:scale-105"
                                                            >
                                                                <FaFileCircleCheck className="mx-1 mr-1 fill-secondary" />
                                                                <span>
                                                                    Unggah
                                                                </span>
                                                            </label>
                                                        ) : (
                                                            <label
                                                                htmlFor={
                                                                    berkas.jenis_dokumen
                                                                }
                                                                className="transition-all action-btn text-secondary hover:scale-105"
                                                            >
                                                                <FaFileUpload className="mx-1 mr-1 fill-secondary" />
                                                                <span>
                                                                    Unggah
                                                                </span>
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
                                <SuccessButton
                                    type="submit"
                                    disabled={isDone ? true : false}
                                    className="disabled:bg-accent"
                                >
                                    Ajukan Ulang
                                    <IoIosSend />
                                </SuccessButton>
                            </div>
                        </form>
                    </div>
                </main>
            </section>

            {/* end of content */}
        </AuthenticatedLayout>
    );
}
