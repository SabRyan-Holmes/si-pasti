import React, { useEffect, useState } from "react";
import { useForm, Link, Head, usePage, router } from "@inertiajs/react";
import Swal from "sweetalert2";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SecondaryButton from "@/Components/SecondaryButton";
import { RiArrowGoBackFill } from "react-icons/ri";
import { FaEdit, FaEye, FaFileUpload } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { FaDownload, FaFileCircleCheck } from "react-icons/fa6";
import { IoDocumentTextOutline } from "react-icons/io5";
import { TiDocumentText } from "react-icons/ti";

export default function ShowPengajuan({
    title,
    auth,
    flash,
    pengajuan,
    berkasPBJ,
    pengajuanKontrak,
    beritaAcara,
    kuitansi,
}) {
    const props = usePage().props;
    // Function to get the key based on the value
    const getKeyByValue = (object, value) => {
        return Object.keys(object).find((key) => object[key] === value);
    };

    const requiredBerkasPBJ = {
        rancangan_kontrak: "Rancangan Kontrak",
        spekteknis: "Spekteknis",
        rab: "RAB/HPS",
        sppp: "Surat Penunjukan Penjabat Pengadaan(SPPP)",
    };

    // const requiredBerkasPK = ["SPPBJ", "surat kontrak"];
    const requiredBerkasPK = {
        sppbj: "Surat Penetapan Pemenang Barang dan Jasa(SPPBJ)",
        surat_kontrak: "Surat Kontrak/Surat Pesanan",
    };
    const requiredBerkasBA = {
        bast: "Berita Acara Serah Terima(BAST)",
        bap: "Berita Acara Pembayaran(BAP)",
    };
    const requiredKuitansi = {
        kuitansi: "Kuitansi",
        surat_pesanan: "Surat Pesanan",
    };

    const documentsPBJ = Object.keys(requiredBerkasPBJ).map((key) => {
        const value = requiredBerkasPBJ[key];
        return (
            berkasPBJ.find((d) => d.jenis_dokumen === value) || {
                jenis_dokumen: value,
                is_valid: null,
                path: "",
                nama: "",
                tipe_file: "",
            }
        );
    });

    const berkasPK = Object.keys(requiredBerkasPK).map((key) => {
        const value = requiredBerkasPK[key];
        return (
            pengajuanKontrak.find((d) => d.jenis_dokumen === value) || {
                jenis_dokumen: value,
                is_valid: null,
                path: "",
                nama: "",
                tipe_file: "",
            }
        );
    });

    const berkasBA = Object.keys(requiredBerkasBA).map((key) => {
        const value = requiredBerkasBA[key];
        return (
            beritaAcara.find((d) => d.jenis_dokumen === value) || {
                jenis_dokumen: value,
                is_valid: null,
                path: "",
                nama: "",
                tipe_file: "",
            }
        );
    });

    const berkasKuitansi = Object.keys(requiredKuitansi).map((key) => {
        const value = requiredKuitansi[key];
        return (
            kuitansi.find((d) => d.jenis_dokumen === value) || {
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

            // If edited
            edited_id: [],

            // Pengajuan PBJ
            "rancangan kontrak": null,
            spekteknis: null,
            rab: null,
            "surat penunjukan penjabat pengadaan": null,

            // Pengajuan Kontrak
            sppbj: null,
            surat_kontrak: null,

            // Pengajuan Berita Acara
            bast: null,
            bap: null,

            // Pengajuan Kuitansi
            kuitansi: null,
            surat_pesanan: null,
        });

    function submit(e) {
        e.preventDefault(); // Mencegah perilaku default dari form submit
        post(route("ppk.ajukan-berkas-ulang"), {
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

    console.log("isi data");
    console.log(data);

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

    console.log("errors :");
    console.log(errors);
    const ketuaTim = pengajuan.created_by;
    let nama = ketuaTim.name.split(" / ")[0];
    let gelar = ketuaTim.name.split(" / ")[1];

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
                    <div className="mt-10 capitalize max-w-screen-phone text-nowrap">
                        <div className="grid grid-cols-2 gap-0">
                            <span className="mr-1 font-bold">Nama Kegiatan</span>
                            <span>: {pengajuan.nama_kegiatan}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-0">
                            <span className="mr-1 font-bold">Ketua TIM /NIP</span>
                            <span>
                                : {nama} {gelar}
                            </span>
                        </div>
                        <div className="grid grid-cols-2 gap-0">
                            <span className="mr-1 font-bold">Nama Tim</span>
                            <span>: {pengajuan.nama_tim}</span>
                        </div>
                    </div>


                    <div className="mt-10 mb-20 overflow-x-auto">
                        <h2 className="text-base font-semibold">
                            Berkas Pengajuan PBJ
                        </h2>
                        {/* Tabel Berkas Pengajuan PBJ Start */}
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
                                    {documentsPBJ.map((berkas, i) => (
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

                                                    <td className="text-center text-nowrap">
                                                        {berkas.is_valid ==
                                                            null && (
                                                            <a
                                                                href={`/storage/${berkas.path}`}
                                                                target="_blank"
                                                                className="mx-auto transition-all action-btn text-hijau hover:scale-105"
                                                            >
                                                                <FaEye className="mx-1 mr-1 fill-hijau" />
                                                                Lihat
                                                            </a>
                                                        )}

                                                        {berkas.is_valid ==
                                                            true && (
                                                            <a
                                                                href={`/storage/${berkas.path}`}
                                                                target="_blank"
                                                                className="mx-auto transition-all action-btn text-hijau hover:scale-105"
                                                            >
                                                                <FaEye className="mx-1 mr-1 fill-hijau" />
                                                                Lihat
                                                            </a>
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
                                                                        requiredBerkasPBJ,
                                                                        berkas.jenis_dokumen
                                                                    )
                                                                );
                                                                // is_valid kembali menjadi diproses jika sebelumnya tidak valid dan diupload ulang lagi

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
                                                    <td className="text-center">
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
                                                                        requiredBerkasPBJ,
                                                                        berkas.jenis_dokumen
                                                                    )
                                                                );
                                                                // is_valid kembali menjadi diproses jika sebelumnya tidak valid dan diupload ulang lagi

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
                            <div className="flex justify-end w-full mt-4">
                                <button
                                    type="submit"
                                    className="uppercase button-correct"
                                >
                                    Ajukan Ulang
                                    <IoIosSend />
                                </button>
                            </div>
                        </form>

                        <h2 className="mt-2 text-base font-semibold ">
                            Berkas Berkas Pemesanan
                        </h2>
                        {/* Tabel Berkas Pemesanan */}
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
                                    {berkasPK.map((berkas, i) => (
                                        <tr>
                                            <th className="text-primary">
                                                {i + 1}
                                            </th>
                                            <td className="capitalize">
                                                {berkas.jenis_dokumen}
                                            </td>
                                            {berkas.nama ? (
                                                <>
                                                    <td className="text-xs capitalize ">
                                                        {berkas.nama}.
                                                        <span className="lowercase">
                                                            {berkas.tipe_file}
                                                        </span>
                                                    </td>

                                                    <td className="text-center">
                                                        {berkas.is_valid ===
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

                                                        {!berkas.is_valid ==
                                                            false && (
                                                            <div className="label-warning">
                                                                Tidak Valid
                                                            </div>
                                                        )}
                                                    </td>

                                                    <td className="text-center">
                                                        {berkas.is_valid ==
                                                            null && (
                                                            <a
                                                                href={`/storage/${berkas.path}`}
                                                                target="_blank"
                                                                className="mx-auto transition-all action-btn text-hijau hover:scale-105"
                                                            >
                                                                <FaEye className="mx-1 mr-1 fill-hijau" />
                                                                Lihat
                                                            </a>
                                                        )}

                                                        {berkas.is_valid ==
                                                            true && (
                                                            <a
                                                                href={`/storage/${berkas.path}`}
                                                                target="_blank"
                                                                className="mx-auto transition-all action-btn text-hijau hover:scale-105"
                                                            >
                                                                <FaEye className="mx-1 mr-1 fill-hijau" />
                                                                Lihat
                                                            </a>
                                                        )}

                                                        {berkas.is_valid ==
                                                            false && (
                                                            <a
                                                                // href={`/storage/${berkas.path}`}
                                                                // TODO: LOGIKA EDIT/MODIFIKASI
                                                                className="mx-auto transition-all action-btn text-secondary hover:scale-105"
                                                            >
                                                                <FaEdit className="mx-1 mr-1 fill-secondary" />
                                                                Edit
                                                            </a>
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
                                                                        data
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
                                                    <td className="text-center">
                                                        <input
                                                            id={
                                                                berkas.jenis_dokumen
                                                            }
                                                            type="file"
                                                            className="hidden"
                                                            onChange={(e) =>
                                                                handleFileChange(
                                                                    e,
                                                                    berkas.jenis_dokumen,
                                                                    getKeyByValue(
                                                                        requiredBerkasPBJ,
                                                                        berkas.jenis_dokumen
                                                                    )
                                                                )
                                                            }
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
                            <div className="flex justify-end w-full mt-4">
                                <button
                                    type="submit"
                                    className="uppercase button-correct"
                                >
                                    Ajukan Ulang
                                    <IoIosSend />
                                </button>
                            </div>
                        </form>

                        <h2 className="mt-2 text-base font-semibold">
                            Berkas Berita Acara
                        </h2>

                        {/* Tabel Berkas Berita Acara */}
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
                                    {/* row 1 */}
                                    {berkasBA.map((berkas, i) => (
                                        <tr>
                                            <th className="text-primary">
                                                {i + 1}
                                            </th>
                                            <td className="capitalize ">
                                                {berkas.jenis_dokumen}
                                            </td>
                                            {berkas.nama ? (
                                                <>
                                                    <td className="text-xs capitalize ">
                                                        {berkas.nama}.
                                                        <span className="lowercase">
                                                            {berkas.tipe_file}
                                                        </span>
                                                    </td>

                                                    <td className="text-center">
                                                        {berkas.is_valid ===
                                                            null && (
                                                            <div className="label-base bg-secondary/10">
                                                                Diproses
                                                            </div>
                                                        )}

                                                        {berkas.is_valid &&
                                                            berkas.is_valid !=
                                                                null && (
                                                                <div className="label-success">
                                                                    Valid
                                                                </div>
                                                            )}

                                                        {!berkas.is_valid &&
                                                            berkas.is_valid !=
                                                                null && (
                                                                <div className="label-warning">
                                                                    Tidak Valid
                                                                </div>
                                                            )}
                                                    </td>

                                                    <td className="text-center ">
                                                        {berkas.is_valid ==
                                                            null && (
                                                            <a
                                                                href={`/storage/${berkas.path}`}
                                                                target="_blank"
                                                                className="action-btn"
                                                            >
                                                                <FaEye className="mx-1 mr-1" />
                                                                Lihat
                                                            </a>
                                                        )}

                                                        {berkas.is_valid &&
                                                            berkas.is_valid !=
                                                                null && (
                                                                <a
                                                                    href={`/storage/${berkas.path}`}
                                                                    target="_blank"
                                                                    className="action-btn"
                                                                >
                                                                    <FaEye className="mx-1 mr-1" />
                                                                    Lihat
                                                                </a>
                                                            )}

                                                        {!berkas.is_valid &&
                                                            berkas.is_valid !=
                                                                null && (
                                                                <a
                                                                    // href={`/storage/${berkas.path}`}
                                                                    className="action-btn"
                                                                >
                                                                    <FaEdit className="mx-1 mr-1" />
                                                                    Edit
                                                                </a>
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
                                                                        data
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
                                                    <td className="text-center">
                                                        <input
                                                            id={
                                                                berkas.jenis_dokumen
                                                            }
                                                            type="file"
                                                            className="hidden"
                                                            onChange={(e) =>
                                                                handleFileChange(
                                                                    e,
                                                                    berkas.jenis_dokumen,
                                                                    getKeyByValue(
                                                                        requiredBerkasBA,
                                                                        berkas.jenis_dokumen
                                                                    )
                                                                )
                                                            }
                                                        />
                                                        <label
                                                            htmlFor={
                                                                berkas.jenis_dokumen
                                                            }
                                                            className="action-btn"
                                                        >
                                                            <FaFileUpload className="mx-1 mr-1" />
                                                            {uploadedFiles[
                                                                data
                                                                    .jenis_dokumen
                                                            ] ? (
                                                                <span className="max-w-xs truncate bg-accent">
                                                                    Unggah
                                                                </span>
                                                            ) : (
                                                                <span className="cursor-pointer">
                                                                    Unggah
                                                                </span>
                                                            )}
                                                        </label>
                                                    </td>
                                                </>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {/* Button */}
                            <div className="flex justify-end w-full mt-4">
                                <button
                                    type="submit"
                                    className="uppercase button-correct"
                                >
                                    Ajukan Ulang
                                    <IoIosSend />
                                </button>
                            </div>
                        </form>

                        <h2 className="mt-2 text-base font-semibold">
                            Berkas Kuitansi
                        </h2>
                        {/* Tabel Berkas Kuitansi */}
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
                                    {/* row 1 */}
                                    {berkasKuitansi.map((berkas, i) => (
                                        <tr>
                                            <th className="text-primary">
                                                {i + 1}
                                            </th>
                                            <td className="capitalize ">
                                                {berkas.jenis_dokumen}
                                            </td>
                                            {berkas.nama ? (
                                                <>
                                                    <td className="text-xs capitalize ">
                                                        {berkas.nama}.
                                                        <span className="lowercase">
                                                            {berkas.tipe_file}
                                                        </span>
                                                    </td>

                                                    <td className="text-center">
                                                        {berkas.is_valid ===
                                                            null && (
                                                            <div className="label-base bg-secondary/10">
                                                                Diproses
                                                            </div>
                                                        )}

                                                        {berkas.is_valid &&
                                                            berkas.is_valid !=
                                                                null && (
                                                                <div className="label-success">
                                                                    Valid
                                                                </div>
                                                            )}

                                                        {!berkas.is_valid &&
                                                            berkas.is_valid !=
                                                                null && (
                                                                <div className="label-warning">
                                                                    Tidak Valid
                                                                </div>
                                                            )}
                                                    </td>

                                                    <td className="text-center ">
                                                        {berkas.is_valid ==
                                                            null && (
                                                            <a
                                                                href={`/storage/${berkas.path}`}
                                                                target="_blank"
                                                                className="action-btn"
                                                            >
                                                                <FaEye className="mx-1 mr-1" />
                                                                Lihat
                                                            </a>
                                                        )}

                                                        {berkas.is_valid &&
                                                            berkas.is_valid !=
                                                                null && (
                                                                <a
                                                                    href={`/storage/${berkas.path}`}
                                                                    target="_blank"
                                                                    className="action-btn"
                                                                >
                                                                    <FaEye className="mx-1 mr-1" />
                                                                    Lihat
                                                                </a>
                                                            )}

                                                        {!berkas.is_valid &&
                                                            berkas.is_valid !=
                                                                null && (
                                                                <a
                                                                    // href={`/storage/${berkas.path}`}
                                                                    className="action-btn"
                                                                >
                                                                    <FaEdit className="mx-1 mr-1" />
                                                                    Edit
                                                                </a>
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
                                                                        data
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
                                                    <td className="text-center">
                                                        <input
                                                            id={
                                                                berkas.jenis_dokumen
                                                            }
                                                            type="file"
                                                            className="hidden"
                                                            onChange={(e) =>
                                                                handleFileChange(
                                                                    e,
                                                                    berkas.jenis_dokumen,
                                                                    getKeyByValue(
                                                                        requiredKuitansi,
                                                                        berkas.jenis_dokumen
                                                                    )
                                                                )
                                                            }
                                                        />
                                                        <label
                                                            htmlFor={
                                                                berkas.jenis_dokumen
                                                            }
                                                            className="action-btn"
                                                        >
                                                            <FaFileUpload className="mx-1 mr-1" />
                                                            {uploadedFiles[
                                                                data
                                                                    .jenis_dokumen
                                                            ] ? (
                                                                <span className="max-w-xs truncate bg-accent">
                                                                    Unggah
                                                                </span>
                                                            ) : (
                                                                <span className="cursor-pointer">
                                                                    Unggah
                                                                </span>
                                                            )}
                                                        </label>
                                                    </td>
                                                </>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {/* Button */}
                            <div className="flex justify-end w-full mt-4">
                                <button
                                    type="submit"
                                    className="uppercase button-correct"
                                >
                                    Ajukan Ulang
                                    <IoIosSend />
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </section>

            {/* end of content */}
        </AuthenticatedLayout>
    );
}
