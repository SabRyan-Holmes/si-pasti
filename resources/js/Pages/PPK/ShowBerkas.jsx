import React, { useEffect, useState } from "react";
import { useForm, Link, Head, usePage, router } from "@inertiajs/react";
import Swal from "sweetalert2";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SecondaryButton from "@/Components/SecondaryButton";
import { RiArrowGoBackFill } from "react-icons/ri";
import { FaEdit, FaEye, FaFileUpload, FaRegFolderOpen } from "react-icons/fa";
import { MdEditDocument } from "react-icons/md";
import { IoIosArrowDown, IoIosSend } from "react-icons/io";
import { Dropdown } from "@/Components";
import { FaDownload, FaRegFolder } from "react-icons/fa6";
import { HiDocumentText } from "react-icons/hi2";

export default function DetailPengajuan({
    title,
    auth,
    flash,
    pengajuan,
    berkasPBJ,
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

    const requiredBerkasPBJ = {
        rancangan_kontrak: "Rancangan Kontrak",
        spekteknis: "Spekteknis",
        rab: "RAB/HPS",
        sppp: "Surat Penunjukan Penjabat Pengadaan(SPPP)",
    };

    // const requiredBerkasPK = ["SPPBJ", "surat kontrak"];

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

    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            pengajuan_id: pengajuan.id,
            nama_kegiatan: pengajuan.nama_kegiatan,

            // Berkas Ketua Tim
            kak: null,
            form_permintaan: null,
            surat_permintaan: null,

            // Pengajuan PBJ
            rancangan_kontrak: null,
            spekteknis: null,
            rab: null,
            sppp: null,
        });

    function submit(e) {
        e.preventDefault(); // Mencegah perilaku default dari form submit
        post(route("ppk.ajukan-berkas"), {
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
            <section className="mx-auto px-7">
                <div className="my-6">
                    <div className="flex items-center justify-between ">
                        {/* Breadcumbs */}
                        <div className="my-3 text-sm capitalize breadcrumbs">
                            <ul>
                                <li>
                                    <a href={route("daftar-berkas")}>
                                        <FaRegFolder className="w-4 h-4 mr-2" />
                                        Daftar Berkas
                                    </a>
                                </li>
                                <li>
                                    <a>
                                        <FaRegFolderOpen className="w-4 h-4 mr-2" />
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

                    <div className="mt-10 capitalize max-w-screen-phone text-nowrap">
                        <div className="grid grid-cols-2 gap-0">
                            <span className="mr-1 font-bold">Nama Kegiatan</span>
                            <span>: {pengajuan.nama_kegiatan}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-0">
                            <span className="mr-1 font-bold">Ketua TIM</span>
                            <span>
                                : {nama} {gelar}
                            </span>
                        </div>
                        <div className="grid grid-cols-2 gap-0">
                            <span className="mr-1 font-bold">Nama Tim</span>
                            <span>: {pengajuan.nama_tim}</span>
                        </div>
                    </div>
                </div>
                <div className="pb-16 mt-10 overflow-x-auto">
                    <h2 className="text-base font-semibold">
                        Berkas Ketua Tim
                    </h2>
                    {/* Tabel Berkas Ketua Tim Start */}
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
                                {documentsKT.map((data, i) => (
                                    <tr>
                                        <th className="text-primary">
                                            {i + 1}
                                        </th>
                                        <td className="capitalize">
                                            {data.jenis_dokumen}
                                        </td>
                                        {data.nama ? (
                                            <>
                                                <td className="text-sm capitalize">
                                                    <div className="relative group">
                                                        <a
                                                            href={`/storage/${data.path}`}
                                                            target="_blank"
                                                            className="underline hover:text-primary text-primary decoration-primary"
                                                        >
                                                            {data.nama}.
                                                            <span className="lowercase">
                                                                {data.tipe_file}
                                                            </span>
                                                        </a>

                                                        {/* Kontainer untuk tombol "Lihat" dan "Download" */}
                                                        <div className="absolute flex justify-center gap-2 transition-opacity opacity-0 group-hover:opacity-100">
                                                            {/* Tombol "Lihat" */}

                                                            <a
                                                                href={`/storage/${data.path}`}
                                                                target="_blank"
                                                                className="flex items-end justify-center h-8 font-medium text-center group/button action-btn text-hijau/75 border-hijau/20 hover:bg-hijau hover:text-white"
                                                            >
                                                                Lihat
                                                                <FaEye className="mx-1 fill-hijau/75 group-hover/button:fill-white" />
                                                            </a>

                                                            {/* Tombol "Download" */}
                                                            <a
                                                                href={`/storage/${data.path}`}
                                                                download={
                                                                    data.nama
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

                                                <td className="text-center">
                                                    {data.is_valid === null && (
                                                        <div className="label-base bg-secondary/15">
                                                            Diproses
                                                        </div>
                                                    )}

                                                    {data.is_valid == true && (
                                                        <div className="label-success">
                                                            Valid
                                                        </div>
                                                    )}

                                                    {data.is_valid == false && (
                                                        <div className="label-warning">
                                                            Tidak Valid
                                                        </div>
                                                    )}
                                                </td>

                                                <td className="text-center">
                                                    {/* FIXME: Kalo Bisa Tombol Lihat Berkas ny Disini */}
                                                    <div className="inline-flex items-center gap-2">
                                                        <Dropdown>
                                                            <Dropdown.Trigger>
                                                                <span className="inline-flex rounded-md text-nowrap">
                                                                    <button
                                                                        type="button"
                                                                        className="inline-flex items-center py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out bg-white border border-transparent rounded-md group/button hover:text-secondary hover:text-gray-700 focus:outline-none"
                                                                    >
                                                                        <span>
                                                                            Pilih
                                                                            Status
                                                                        </span>
                                                                        <IoIosArrowDown className="w-5 h-5 fill-slate-500 group-hover/button:fill-secondary/60" />
                                                                    </button>
                                                                </span>
                                                            </Dropdown.Trigger>

                                                            <Dropdown.Content>
                                                                <Dropdown.Link
                                                                    method="post"
                                                                    href={route(
                                                                        "ppk.validasi"
                                                                    )}
                                                                    data={{
                                                                        id: data.id,
                                                                        is_valid: true,
                                                                        pengajuan_id: pengajuan.id
                                                                    }}
                                                                >
                                                                    <span className="text-hijau">
                                                                        Valid
                                                                    </span>
                                                                </Dropdown.Link>
                                                                <Dropdown.Link
                                                                    method="post"
                                                                    href={route(
                                                                        "ppk.validasi"
                                                                    )}
                                                                    data={{
                                                                        id: data.id,
                                                                        is_valid: false,
                                                                        pengajuan_id: pengajuan.id
                                                                    }}
                                                                >
                                                                    <span className="text-error">
                                                                        Tidak
                                                                        Valid
                                                                    </span>
                                                                </Dropdown.Link>
                                                            </Dropdown.Content>
                                                        </Dropdown>
                                                    </div>
                                                </td>
                                            </>
                                        ) : (
                                            <>
                                                {/* Kalo Belum Diupload Sama seklai */}

                                                <td
                                                    colSpan={2}
                                                    className="text-center cursor-not-allowed"
                                                >
                                                    {uploadedFiles[
                                                        data.jenis_dokumen
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
                                                    <div className="inline-flex items-center">
                                                        <Dropdown disabled>
                                                            <Dropdown.Trigger>
                                                                <span className="inline-flex rounded-md hover:cursor-not-allowed">
                                                                    <button
                                                                        type="button"
                                                                        className="z-auto inline-flex items-center py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out bg-white border border-transparent rounded-md hover:cursor-not-allowed hover:text-gray-700 focus:outline-none"
                                                                    >
                                                                        Pilih
                                                                        Status
                                                                        <IoIosArrowDown className="w-5 h-5 fill-slate-500 group-hover/item:fill-secondary/60" />
                                                                    </button>
                                                                </span>
                                                            </Dropdown.Trigger>

                                                            <Dropdown.Content>
                                                                <Dropdown.Link
                                                                    disabled={
                                                                        true
                                                                    }
                                                                >
                                                                    Valid
                                                                </Dropdown.Link>
                                                                <Dropdown.Link
                                                                    method="post"
                                                                    disabled={
                                                                        true
                                                                    }
                                                                >
                                                                    Tidak Valid
                                                                </Dropdown.Link>
                                                            </Dropdown.Content>
                                                        </Dropdown>
                                                    </div>
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                </div>
                <div className="pb-20 overflow-x-auto">
                    <h2 className="text-base font-semibold">
                        Berkas Pengajuan PBJ
                    </h2>
                    {/* Tabel Berkas Pengajuan PBJ Start */}
                        <table className="table mt-3 overflow-visible border rounded-md border-primary/25 table-bordered">
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
                                {documentsPBJ.map((data, i) => (
                                    <tr>
                                        <th className="text-primary">
                                            {i + 1}
                                        </th>
                                        <td className="capitalize">
                                            {data.jenis_dokumen}
                                        </td>
                                        {data.nama ? (
                                            <>
                                                <td className="text-sm capitalize">
                                                    <div className="relative group">
                                                        <a
                                                            href={`/storage/${data.path}`}
                                                            target="_blank"
                                                            className="underline hover:text-primary text-primary decoration-primary"
                                                        >
                                                            {data.nama}.
                                                            <span className="lowercase">
                                                                {data.tipe_file}
                                                            </span>
                                                        </a>

                                                        {/* Kontainer untuk tombol "Lihat" dan "Download" */}
                                                        <div className="absolute flex justify-center gap-2 transition-opacity opacity-0 group-hover:opacity-100">
                                                            {/* Tombol "Lihat" */}

                                                            <a
                                                                href={`/storage/${data.path}`}
                                                                target="_blank"
                                                                className="flex items-end justify-center h-8 font-medium text-center group/button action-btn text-hijau/75 border-hijau/20 hover:bg-hijau hover:text-white"
                                                            >
                                                                Lihat
                                                                <FaEye className="mx-1 fill-hijau/75 group-hover/button:fill-white" />
                                                            </a>

                                                            {/* Tombol "Download" */}
                                                            <a
                                                                href={`/storage/${data.path}`}
                                                                download={
                                                                    data.nama
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

                                                <td className="text-center">
                                                    {data.is_valid === null && (
                                                        <div className="label-base bg-secondary/15">
                                                            Diproses
                                                        </div>
                                                    )}

                                                    {data.is_valid == true && (
                                                        <div className="label-success">
                                                            Valid
                                                        </div>
                                                    )}

                                                    {data.is_valid == false && (
                                                        <div className="label-warning">
                                                            Tidak Valid
                                                        </div>
                                                    )}
                                                </td>

                                                <td className="text-center">
                                                    <div className="inline-flex items-center gap-2">
                                                        <Dropdown>
                                                            <Dropdown.Trigger>
                                                                <span className="inline-flex rounded-md text-nowrap">
                                                                    <button
                                                                        type="button"
                                                                        className="inline-flex items-center py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out bg-white border border-transparent rounded-md group/button hover:text-secondary hover:text-gray-700 focus:outline-none"
                                                                    >
                                                                        <span>
                                                                            Pilih
                                                                            Status
                                                                        </span>
                                                                        <IoIosArrowDown className="w-5 h-5 fill-slate-500 group-hover/button:fill-secondary/60" />
                                                                    </button>
                                                                </span>
                                                            </Dropdown.Trigger>

                                                            <Dropdown.Content>
                                                                <Dropdown.Link
                                                                    method="post"
                                                                    href={route(
                                                                        "ppk.validasi"
                                                                    )}
                                                                    data={{
                                                                        id: data.id,
                                                                        is_valid: true,
                                                                        pengajuan_id: pengajuan.id
                                                                    }}
                                                                >
                                                                    <span className="text-hijau">
                                                                        Valid
                                                                    </span>
                                                                </Dropdown.Link>
                                                                <Dropdown.Link
                                                                    method="post"
                                                                    href={route(
                                                                        "ppk.validasi"
                                                                    )}
                                                                    data={{
                                                                        id: data.id,
                                                                        is_valid: false,
                                                                        pengajuan_id: pengajuan.id
                                                                    }}
                                                                >
                                                                    <span className="text-error">
                                                                        Tidak
                                                                        Valid
                                                                    </span>
                                                                </Dropdown.Link>
                                                            </Dropdown.Content>
                                                        </Dropdown>
                                                    </div>
                                                </td>
                                            </>
                                        ) : (
                                            <>
                                                {/* Kalo Belum Diupload Sama seklai */}

                                                <td
                                                    colSpan={2}
                                                    className="text-center cursor-not-allowed"
                                                >
                                                    {uploadedFiles[
                                                        data.jenis_dokumen
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
                                                    <div className="inline-flex items-center">
                                                        <Dropdown disabled>
                                                            <Dropdown.Trigger>
                                                                <span className="inline-flex rounded-md hover:cursor-not-allowed">
                                                                    <button
                                                                        type="button"
                                                                        className="z-auto inline-flex items-center py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out bg-white border border-transparent rounded-md hover:cursor-not-allowed hover:text-gray-700 focus:outline-none"
                                                                    >
                                                                        Pilih
                                                                        Status
                                                                        <IoIosArrowDown className="w-5 h-5 fill-slate-500 group-hover/item:fill-secondary/60" />
                                                                    </button>
                                                                </span>
                                                            </Dropdown.Trigger>

                                                            <Dropdown.Content>
                                                                <Dropdown.Link

                                                                    disabled={
                                                                        true
                                                                    }
                                                                >
                                                                    Valid
                                                                </Dropdown.Link>
                                                                <Dropdown.Link
                                                                    disabled={
                                                                        true
                                                                    }
                                                                >
                                                                    Tidak Valid
                                                                </Dropdown.Link>
                                                            </Dropdown.Content>
                                                        </Dropdown>
                                                    </div>
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>


                </div>
            </section>

            {/* end of content */}
        </AuthenticatedLayout>
    );
}
