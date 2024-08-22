import React, { useEffect, useState } from "react";
import { useForm, Head, usePage } from "@inertiajs/react";
import Swal from "sweetalert2";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { RiArrowGoBackFill } from "react-icons/ri";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import { IoIosArrowDown, IoIosSend } from "react-icons/io";
import {
    InputError,
    InputLabel,
    PrimaryButton,
    SecondaryButton,
} from "@/Components";
import { FaArrowDown, FaCheck, FaDownload, FaEye } from "react-icons/fa6";
import { IconContext } from "react-icons";

export default function UnggahBerkas({
    title,
    auth,
    pengajuan,
    flash,
    berkasPBJ,
    berkasPK,
    berkasBA,
    berkasKuitansi,
}) {
    const [select, setSelect] = useState("");
    const props = usePage().props;
    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            pengajuan_id: pengajuan.id,
            nama_kegiatan: pengajuan.nama_kegiatan,

            // Pengajuan PBJ
            rancangan_kontrak: null,
            spekteknis: null,
            rab: null,
            sppp: null,

            // Pengajuan Kontrak
            sppbj: null,
            surat_kontrak: null,

            // Pengajuan Berita Acara
            bast: null,
            bap: null,

            // Pengajuan Kuitansi
            kuintansi: null,
            surat_pesanan: null,
        });

    function submit(e) {
        e.preventDefault();
        post(route("ppk.ajukan-berkas"), {
            _token: props.csrf_token,
            _method: "POST",
            forceFormData: true,
            preserveState: false,
            preserveScroll: true,
            onSuccess: () => {
                reset();
                clearErrors();
            },
            onFinish: () => {
                // setTimeout(function () {
                //     location.reload();
                // }, 5000);
            },
        });
    }

    // console.log(select);
    console.log("isi data");
    console.log(data);

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 4000,
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

    // TODO : Validasi saat upload berkas belum jalann dgn baik kalo berkas ny bener2 dikosongin
    // useEffect(() => {
    //     if (Object.values(errors)[0]) {
    //         Toast.fire({
    //             icon: "warning",
    //             title: Object.values(errors)[0],
    //         });
    //     }
    // }, [errors]);

    const [openSelect, setOpenSelect] = useState(false);

    const options = [
        {
            value: "Pengajuan PBJ",
            label: "Pengajuan PBJ",
            icon: <FaCheck className="w-4 h-4" />,
        },
        // Tambahkan opsi lain di sini dengan ikon yang diinginkan
    ];

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

    // Fungsi untuk memeriksa apakah dokumen sudah ada di berkasPBJ
    const checkBerkas = (kategori, jenis_dokumen) => {
        return kategori.find((doc) => doc.jenis_dokumen === jenis_dokumen);
    };

    // Menghasilkan objek yang memetakan setiap field name ke apakah dokumen itu ada atau tidak
    const _berkasPBJ = Object.fromEntries(
        Object.entries(requiredBerkasPBJ).map(([fieldName, jenisDokumen]) => [
            fieldName,
            checkBerkas(berkasPBJ, jenisDokumen),
        ])
    );

    const checkDocumentExists = (kategori, jenis_dokumen) => {
        return kategori.find(
            (doc) => doc.jenis_dokumen === jenis_dokumen
        );
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
    const ketuaTim = pengajuan.created_by;
    console.log("errors");
    console.log(errors);
    return (
        <AuthenticatedLayout
            user={auth.user}
            title={title}
            current={route().current()}
        >
            <Head title={title} />
            {/* content */}
            <section className="px-12 mx-auto phone:h-screen laptop:h-full max-w-screen-laptop">
                <div className="flex items-center justify-between">
                    <div className="mt-3 text-sm breadcrumbs">
                        <ul>
                            <li>
                                <a href={route("daftar-berkas")}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        className="w-4 h-4 mr-1 stroke-current"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                                        ></path>
                                    </svg>
                                    Daftar Berkas
                                </a>
                            </li>

                            <li>
                                <span>{pengajuan.nama_kegiatan}</span>
                            </li>

                            <li>
                                <span className="inline-flex items-center gap-1">
                                    <MdOutlineDriveFolderUpload className="w-4 h-4 stroke-current" />
                                    Unggah Berkas
                                </span>
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

                <div className="px-12 mx-auto mt-10">
                    {/* Dro */}
                    <div className="mx-auto ">
                        <h4 className="mt-6 font-extrabold">
                            Nama Kegiatan:
                            <span className="mx-1 font-normal capitalize">
                                {pengajuan.nama_kegiatan}
                            </span>
                        </h4>
                        <h4 className="mt-2 mb-3 font-extrabold">
                            Ketua Tim:
                            <span className="mx-1 font-normal capitalize ">
                                {ketuaTim.name}
                            </span>
                        </h4>

                        <div className="pb-5 max-w-screen-tablet">
                            <InputLabel
                                value="Pilih Berkas"
                                htmlFor="pilihBerkas"
                                className="font-semibold mt-7"
                            />
                            <div className="relative w-full mt-2">
                                <button
                                    className="inline-flex justify-between w-full px-2 py-3 text-sm text-left border rounded-md border-gradient"
                                    id="pilihBerkas"
                                    onClick={() =>
                                        setOpenSelect((prev) => !prev)
                                    }
                                >
                                    {select ||
                                        "Pilih Berkas yang ingin diunggah"}
                                        <IoIosArrowDown  className="w-5 h-5 fill-primary"/>
                                </button>
                                {openSelect && (
                                    <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                                        <li
                                            className="px-2 py-2 text-sm text-gray-500 cursor-pointer hover:bg-gray-100"
                                            onClick={() =>
                                                setSelectedOption(
                                                    "Pilih Berkas yang ingin diunggah"
                                                )
                                            }
                                        >
                                            Pilih Berkas yang ingin diunggah
                                        </li>
                                        <li
                                            className="flex justify-between px-2 py-2 text-sm cursor-pointer hover:bg-gray-100"
                                            onClick={() => {
                                                setSelect("Pengajuan PBJ");
                                                setOpenSelect(false);
                                            }}
                                        >
                                            <span>Pengajuan PBJ</span>
                                            {berkasPBJ.length > 0 && (
                                                <FaCheck className="w-4 h-4 fill-hijau" />
                                            )}
                                        </li>
                                        <li
                                            className="flex justify-between px-2 py-2 text-sm cursor-pointer hover:bg-gray-100"
                                            onClick={() => {
                                                setSelect("Pengajuan Kontrak");
                                                setOpenSelect(false);
                                            }}
                                        >
                                            <span>Pengajuan Kontrak</span>

                                            {berkasPK.length > 0 && (
                                                <FaCheck className="w-4 h-4 fill-hijau" />
                                            )}
                                        </li>
                                        <li
                                            className="flex justify-between px-2 py-2 text-sm cursor-pointer hover:bg-gray-100"
                                            onClick={() => {
                                                setSelect(
                                                    "Pengajuan Berita Acara"
                                                );
                                                setOpenSelect(false);
                                            }}
                                        >
                                            <span>Pengajuan Berita Acara</span>

                                            {berkasBA.length > 0 && (
                                                <FaCheck className="w-4 h-4 fill-hijau" />
                                            )}
                                        </li>
                                        <li
                                            className="flex justify-between px-2 py-2 text-sm cursor-pointer hover:bg-gray-100"
                                            onClick={() => {
                                                setSelect("Pengajuan Kuitansi");
                                                setOpenSelect(false);
                                            }}
                                        >
                                            <span>Pengajuan Kuitansi</span>
                                            {berkasKuitansi.length > 0 && (
                                                <FaCheck className="w-4 h-4 fill-hijau" />
                                            )}
                                        </li>
                                    </ul>
                                )}
                            </div>

                            {/* <select
                                className="w-full px-2 my-2 text-sm rounded-md border-gradient"
                                id="pilihBerkass"
                                onChange={(e) => setSelect(e.target.value)}
                            >
                                <option selected disabled value="">
                                    Pilih Berkas yang ingin diunggah
                                </option>
                                <option
                                    value="Pengajuan PBJ"
                                    onClick={(e) => setSelect("Pengajuan PBJ")}
                                    className="flex justify-between"
                                >
                                    <span>Pengajuan PBJss</span>
                                    <FaCheck className="w-4 h-4" />
                                </option>
                                <option value="Pengajuan Kontrak">
                                    Pengajuan Kontrak
                                </option>
                                <option value="Pengajuan Berita Acara">
                                    Pengajuan Berita Acara
                                </option>
                                <option value="Pengajuan Kuitansi">
                                    Pengajuan Kuitansi
                                </option>
                            </select> */}

                            {/* Pengajuan PBJ */}
                            {select == "Pengajuan PBJ" && (
                                <form
                                    onSubmit={submit}
                                    method="post"
                                    encType="multipart/form-data"
                                >
                                    {Object.entries(requiredBerkasPBJ).map(
                                        ([fieldName, jenisDokumen]) => {
                                            // const existingDocument =
                                            //     checkBerkas(berkasPBJ,
                                            //         jenisDokumen
                                            //     );
                                            // const existingDocument = checkDocumentExists(jenisDokumen);
                                            const existingDocument =
                                                checkDocumentExists(berkasPBJ,
                                                    jenisDokumen
                                                );
                                            const documentPath =
                                                (
                                                    (existingDocument &&
                                                        berkasPBJ) ||
                                                    []
                                                ).find(
                                                    (doc) =>
                                                        doc.jenis_dokumen ===
                                                        jenisDokumen
                                                )?.path || "";

                                            return (
                                                <div
                                                    className="my-3"
                                                    key={fieldName}
                                                >
                                                    <InputLabel
                                                        htmlFor={fieldName}
                                                        value={jenisDokumen}
                                                        className="my-2"
                                                    />
                                                    <div className="relative inline-block w-full h-12 p-2 border rounded-md border-primary/25 focus:border-indigo-500 focus:ring-indigo-500">
                                                        {existingDocument ? (
                                                            <div className="flex items-center justify-between text-base">
                                                                <div className="flex items-center justify-start gap-3 mt-1 text-sm cursor-pointer group">
                                                                    <div className="p-1 rounded-full bg-accent/20"
                                                                    >
                                                                    <FaCheck className="w-4 h-4 fill-success " />
                                                                    </div>
                                                                    <p>
                                                                        File
                                                                        sudah
                                                                        diunggah :
                                                                    </p>
                                                                    <a
                                                                        // href={`/storage/${documentPath}`}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="underline text-primary"
                                                                    >
                                                                        {
                                                                            existingDocument.nama
                                                                        }
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
                                                                        id={
                                                                            fieldName +
                                                                            "_filename"
                                                                        }
                                                                        class="mt-2 text-gray-700 text-sm"
                                                                    >
                                                                        {""}
                                                                    </span>
                                                                    {/* /Label utnuk input file  */}
                                                                    <label
                                                                        htmlFor={
                                                                            fieldName
                                                                        }
                                                                        className="px-3 py-1 text-sm text-white border-0 rounded-full shadow-sm bg-primary/85 shadow-blue-500/30"
                                                                    >
                                                                        Pilih
                                                                        File
                                                                    </label>

                                                                    <div className="">
                                                                        <input
                                                                            type="file"
                                                                            name={
                                                                                fieldName
                                                                            }
                                                                            id={
                                                                                fieldName
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) => {
                                                                                setData(
                                                                                    fieldName,
                                                                                    e
                                                                                        .target
                                                                                        .files[0]
                                                                                );
                                                                                updateFileName(
                                                                                    fieldName
                                                                                );
                                                                            }}
                                                                            className="hidden"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <input
                                                                type="file"
                                                                name={fieldName}
                                                                onChange={(e) =>
                                                                    setData(
                                                                        fieldName,
                                                                        e.target
                                                                            .files[0]
                                                                    )
                                                                }
                                                                className="text-sm text-gray-600 file:absolute file:right-0 file:bg-primary/85 file:text-white file:border-0 file:py-1 file:px-3 file:rounded-full file:shadow-sm file:shadow-blue-500/30"
                                                            />
                                                        )}
                                                    </div>
                                                    <InputError
                                                        message={
                                                            errors[fieldName]
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            );
                                        }
                                    )}

                                    {/* Button */}
                                    <div className="flex justify-end w-full mt-4">
                                        <PrimaryButton
                                            disabled={processing}
                                            type="submit"
                                        >
                                            Ajukan
                                            <IoIosSend className="w-5 h-5 ml-1" />
                                        </PrimaryButton>
                                    </div>
                                </form>
                            )}

                            {/* Pengajuan Kontrak */}
                            {select == "Pengajuan Kontrak" && (
                                <form
                                    onSubmit={submit}
                                    method="post"
                                    encType="multipart/form-data"
                                >
                                    {Object.entries(requiredBerkasPK).map(
                                        ([fieldName, jenisDokumen]) => {
                                            const existingDocument =
                                                checkDocumentExists(berkasPK,
                                                    jenisDokumen
                                                );
                                            const documentPath =
                                                (
                                                    (existingDocument &&
                                                        berkasPK) ||
                                                    []
                                                ).find(
                                                    (doc) =>
                                                        doc.jenis_dokumen ===
                                                        jenisDokumen
                                                )?.path || "";

                                            return (
                                                <div
                                                    className="my-3"
                                                    key={fieldName}
                                                >
                                                    <InputLabel
                                                        htmlFor={fieldName}
                                                        value={jenisDokumen}
                                                        className="my-2"
                                                    />
                                                    <div className="relative inline-block w-full h-12 p-2 border rounded-md border-primary/25 focus:border-indigo-500 focus:ring-indigo-500">
                                                        {existingDocument ? (
                                                            <div className="flex items-center justify-between text-base">
                                                                <div className="flex items-center justify-start gap-3 mt-1 text-sm cursor-pointer group">
                                                                    <div className="p-1 rounded-full bg-accent/20"
                                                                    >
                                                                    <FaCheck className="w-4 h-4 fill-success " />
                                                                    </div>
                                                                    <p>
                                                                        File
                                                                        sudah
                                                                        diunggah :
                                                                    </p>
                                                                    <a
                                                                        // href={`/storage/${documentPath}`}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="underline text-primary"
                                                                    >
                                                                        {
                                                                            existingDocument.nama
                                                                        }
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
                                                                        id={
                                                                            fieldName +
                                                                            "_filename"
                                                                        }
                                                                        class="mt-2 text-gray-700 text-sm"
                                                                    >
                                                                        {""}
                                                                    </span>
                                                                    {/* /Label utnuk input file  */}
                                                                    <label
                                                                        htmlFor={
                                                                            fieldName
                                                                        }
                                                                        className="px-3 py-1 text-sm text-white border-0 rounded-full shadow-sm bg-primary/85 shadow-blue-500/30"
                                                                    >
                                                                        Pilih
                                                                        File
                                                                    </label>

                                                                    <div className="">
                                                                        <input
                                                                            type="file"
                                                                            name={
                                                                                fieldName
                                                                            }
                                                                            id={
                                                                                fieldName
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) => {
                                                                                setData(
                                                                                    fieldName,
                                                                                    e
                                                                                        .target
                                                                                        .files[0]
                                                                                );
                                                                                updateFileName(
                                                                                    fieldName
                                                                                );
                                                                            }}
                                                                            className="hidden"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <input
                                                                type="file"
                                                                name={fieldName}
                                                                onChange={(e) =>
                                                                    setData(
                                                                        fieldName,
                                                                        e.target
                                                                            .files[0]
                                                                    )
                                                                }
                                                                className="text-sm text-gray-600 file:absolute file:right-0 file:bg-primary/85 file:text-white file:border-0 file:py-1 file:px-3 file:rounded-full file:shadow-sm file:shadow-blue-500/30"
                                                            />
                                                        )}
                                                    </div>
                                                    <InputError
                                                        message={
                                                            errors[fieldName]
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            );
                                        }
                                    )}

                                    {/* Button */}
                                    <div className="flex justify-end w-full mt-4">
                                        <PrimaryButton
                                            disabled={processing}
                                            type="submit"
                                        >
                                            Ajukan
                                            <IoIosSend className="w-5 h-5 ml-1" />
                                        </PrimaryButton>
                                    </div>
                                </form>
                            )}

                            {/* Pengajuan Berita Acara */}
                            {select == "Pengajuan Berita Acara" && (
                                <form
                                    onSubmit={submit}
                                    method="post"
                                    encType="multipart/form-data"
                                >
                                    {Object.entries(requiredBerkasBA).map(
                                        ([fieldName, jenisDokumen]) => {
                                            const existingDocument =
                                                checkDocumentExists(berkasBA,
                                                    jenisDokumen
                                                );
                                            const documentPath =
                                                (
                                                    (existingDocument &&
                                                        berkasBA) ||
                                                    []
                                                ).find(
                                                    (doc) =>
                                                        doc.jenis_dokumen ===
                                                        jenisDokumen
                                                )?.path || "";

                                            return (
                                                <div
                                                    className="my-3"
                                                    key={fieldName}
                                                >
                                                    <InputLabel
                                                        htmlFor={fieldName}
                                                        value={jenisDokumen}
                                                        className="my-2"
                                                    />
                                                    <div className="relative inline-block w-full h-12 p-2 border rounded-md border-primary/25 focus:border-indigo-500 focus:ring-indigo-500">
                                                        {existingDocument ? (
                                                            <div className="flex items-center justify-between text-base">
                                                                <div className="flex items-center justify-start gap-3 mt-1 text-sm cursor-pointer group">
                                                                    <div className="p-1 rounded-full bg-accent/20"
                                                                    >
                                                                    <FaCheck className="w-4 h-4 fill-success " />
                                                                    </div>
                                                                    <p>
                                                                        File
                                                                        sudah
                                                                        diunggah :
                                                                    </p>
                                                                    <a
                                                                        // href={`/storage/${documentPath}`}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="underline text-primary"
                                                                    >
                                                                        {
                                                                            existingDocument.nama
                                                                        }
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
                                                                        id={
                                                                            fieldName +
                                                                            "_filename"
                                                                        }
                                                                        class="mt-2 text-gray-700 text-sm"
                                                                    >
                                                                        {""}
                                                                    </span>
                                                                    {/* /Label utnuk input file  */}
                                                                    <label
                                                                        htmlFor={
                                                                            fieldName
                                                                        }
                                                                        className="px-3 py-1 text-sm text-white border-0 rounded-full shadow-sm bg-primary/85 shadow-blue-500/30"
                                                                    >
                                                                        Pilih
                                                                        File
                                                                    </label>

                                                                    <div className="">
                                                                        <input
                                                                            type="file"
                                                                            name={
                                                                                fieldName
                                                                            }
                                                                            id={
                                                                                fieldName
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) => {
                                                                                setData(
                                                                                    fieldName,
                                                                                    e
                                                                                        .target
                                                                                        .files[0]
                                                                                );
                                                                                updateFileName(
                                                                                    fieldName
                                                                                );
                                                                            }}
                                                                            className="hidden"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <input
                                                                type="file"
                                                                name={fieldName}
                                                                onChange={(e) =>
                                                                    setData(
                                                                        fieldName,
                                                                        e.target
                                                                            .files[0]
                                                                    )
                                                                }
                                                                className="text-sm text-gray-600 file:absolute file:right-0 file:bg-primary/85 file:text-white file:border-0 file:py-1 file:px-3 file:rounded-full file:shadow-sm file:shadow-blue-500/30"
                                                            />
                                                        )}
                                                    </div>
                                                    <InputError
                                                        message={
                                                            errors[fieldName]
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            );
                                        }
                                    )}

                                    {/* Button */}
                                    <div className="flex justify-end w-full mt-4">
                                        <PrimaryButton
                                            disabled={processing}
                                            type="submit"
                                        >
                                            Ajukan
                                            <IoIosSend className="w-5 h-5 ml-1" />
                                        </PrimaryButton>
                                    </div>
                                </form>
                            )}

                            {/* Pengajuan Kuitansi */}
                            {select == "Pengajuan Kuitansi" && (
                                <form
                                    onSubmit={submit}
                                    method="post"
                                    encType="multipart/form-data"
                                >
                                    {Object.entries(requiredKuitansi).map(
                                        ([fieldName, jenisDokumen]) => {
                                            const existingDocument =
                                                checkDocumentExists(berkasKuitansi,
                                                    jenisDokumen
                                                );
                                            const documentPath =
                                                (
                                                    (existingDocument &&
                                                        berkasKuitansi) ||
                                                    []
                                                ).find(
                                                    (doc) =>
                                                        doc.jenis_dokumen ===
                                                        jenisDokumen
                                                )?.path || "";

                                            return (
                                                <div
                                                    className="my-3"
                                                    key={fieldName}
                                                >
                                                    <InputLabel
                                                        htmlFor={fieldName}
                                                        value={jenisDokumen}
                                                        className="my-2"
                                                    />
                                                    <div className="relative inline-block w-full h-12 p-2 border rounded-md border-primary/25 focus:border-indigo-500 focus:ring-indigo-500">
                                                        {existingDocument ? (
                                                            <div className="flex items-center justify-between text-base">
                                                                <div className="flex items-center justify-start gap-3 mt-1 text-sm cursor-pointer group">
                                                                    <div className="p-1 rounded-full bg-accent/20"
                                                                    >
                                                                    <FaCheck className="w-4 h-4 fill-success " />
                                                                    </div>
                                                                    <p>
                                                                        File
                                                                        sudah
                                                                        diunggah :
                                                                    </p>
                                                                    <a
                                                                        // href={`/storage/${documentPath}`}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="underline text-primary"
                                                                    >
                                                                        {
                                                                            existingDocument.nama
                                                                        }
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
                                                                        id={
                                                                            fieldName +
                                                                            "_filename"
                                                                        }
                                                                        class="mt-2 text-gray-700 text-sm"
                                                                    >
                                                                        {""}
                                                                    </span>
                                                                    {/* /Label utnuk input file  */}
                                                                    <label
                                                                        htmlFor={
                                                                            fieldName
                                                                        }
                                                                        className="px-3 py-1 text-sm text-white border-0 rounded-full shadow-sm bg-primary/85 shadow-blue-500/30"
                                                                    >
                                                                        Pilih
                                                                        File
                                                                    </label>

                                                                    <div className="">
                                                                        <input
                                                                            type="file"
                                                                            name={
                                                                                fieldName
                                                                            }
                                                                            id={
                                                                                fieldName
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) => {
                                                                                setData(
                                                                                    fieldName,
                                                                                    e
                                                                                        .target
                                                                                        .files[0]
                                                                                );
                                                                                updateFileName(
                                                                                    fieldName
                                                                                );
                                                                            }}
                                                                            className="hidden"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <input
                                                                type="file"
                                                                name={fieldName}
                                                                onChange={(e) =>
                                                                    setData(
                                                                        fieldName,
                                                                        e.target
                                                                            .files[0]
                                                                    )
                                                                }
                                                                className="text-sm text-gray-600 file:absolute file:right-0 file:bg-primary/85 file:text-white file:border-0 file:py-1 file:px-3 file:rounded-full file:shadow-sm file:shadow-blue-500/30"
                                                            />
                                                        )}
                                                    </div>
                                                    <InputError
                                                        message={
                                                            errors[fieldName]
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            );
                                        }
                                    )}

                                    {/* Button */}
                                    <div className="flex justify-end w-full mt-4">
                                        <PrimaryButton
                                            disabled={processing}
                                            type="submit"
                                        >
                                            Ajukan
                                            <IoIosSend className="w-5 h-5 ml-1" />
                                        </PrimaryButton>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* end of content */}
        </AuthenticatedLayout>
    );
}
