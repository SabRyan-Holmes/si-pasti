import React, { useEffect, useState } from "react";
import { useForm, Link, Head, usePage } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SecondaryButton from "@/Components/SecondaryButton";
import { RiArrowGoBackFill } from "react-icons/ri";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import { FaRegFolder } from "react-icons/fa";
import { FaCheck, FaDownload, FaEye } from "react-icons/fa6";
import Swal from "sweetalert2";

export default function UnggahBerkas({
    title,
    auth,
    pengajuan,
    berkasPPK,
    flash,
}) {
    const props = usePage().props;
    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            pengajuan_id: pengajuan.id,
            nama_kegiatan: pengajuan.nama_kegiatan,
            // ban: null,
            // bahp: null,
        });

    function submit(e) {
        e.preventDefault();
        post(route("pbj.ajukan-berkas"), {
            data: data,
            _token: props.csrf_token,
            _method: "POST",
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                reset();
                clearErrors();
                location.reload();
            },
            onError: () => {
                console.log("Gagal submit");
            },
        });
    }
    const ketuaTim = pengajuan.created_by;
    let nama = ketuaTim.name.split(" / ")[0];
    let gelar = ketuaTim.name.split(" / ")[1];
    console.log("errors");
    console.log(errors);

    const requiredBerkas = {
        ban: "Berita Acara Negoisasi",
        bahp: "Berita Acara Hasil Pemilihan(BAHP)",
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
        if (flash.message)
            Toast.fire({
                icon: "success",
                title: flash.message,
            });
    }, [flash.message]);

    // Fungsi untuk memeriksa apakah dokumen sudah ada di berkasPBJ
    const checkBerkas = (kategori, jenis_dokumen) => {
        return kategori.find((doc) => doc.jenis_dokumen === jenis_dokumen);
    };

    const checkDocumentExists = (kategori, jenis_dokumen) => {
        return kategori.find((doc) => doc.jenis_dokumen === jenis_dokumen);
    };

    console.log('errors')
    console.log(errors)

    return (
        <AuthenticatedLayout user={auth.user} title={title}>
            {/* content */}
            <section className="px-12 mx-auto phone:h-screen laptop:h-full max-w-screen-laptop">
                <div className="flex items-center justify-between">
                    <div className="mt-3 text-sm breadcrumbs">
                        <ul>
                            <li>
                                <a href={route("daftar-berkas")}>
                                    <FaRegFolder className="w-4 h-4 mr-2 stroke-current" />
                                    Daftar Berkas
                                </a>
                            </li>

                            <li>
                                <span className="inline-flex items-center gap-2">
                                    {pengajuan.nama_kegiatan}
                                </span>
                            </li>

                            <li>
                                <span className="inline-flex items-center gap-2">
                                    <MdOutlineDriveFolderUpload className="w-4 h-4 stroke-current" />
                                    Unggah Berkas
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div className="flex justify-between mt-7">
                        <SecondaryButton
                            onClick={() => window.history.back()}
                            className="capitalize bg-secondary/5 "
                        >
                            Kembali
                            <RiArrowGoBackFill className="w-3 h-3 ml-2 fill-secondary" />
                        </SecondaryButton>
                    </div>
                </div>

                <div class="mt-10 capitalize max-w-screen-phone text-nowrap">
                    <div class="grid grid-cols-2 gap-0">
                        <span class="mr-1 font-bold">Nama Kegiatan</span>
                        <span>: {pengajuan.nama_kegiatan}</span>
                    </div>
                    <div class="grid grid-cols-2 gap-0">
                        <span class="mr-1 font-bold">Ketua Tim</span>
                        <span>
                            : {nama} {gelar}
                        </span>
                    </div>
                    <div class="grid grid-cols-2 gap-0">
                        <span class="mr-1 font-bold">Nama Tim</span>
                        <span>: {pengajuan.nama_tim}</span>
                    </div>
                </div>

                <div className="pb-5 mt-10 max-w-screen-tablet">
                    {/* Pengajuan PBJ */}

                    <form
                        onSubmit={submit}
                        method="post"
                        encType="multipart/form-data"
                    >
                        {Object.entries(requiredBerkas).map(
                            ([fieldName, jenisDokumen]) => {
                                const existingDocument = checkBerkas(
                                    berkasPPK,
                                    jenisDokumen
                                );
                                const documentPath =
                                    (
                                        (existingDocument && berkasPPK) ||
                                        []
                                    ).find(
                                        (doc) =>
                                            doc.jenis_dokumen === jenisDokumen
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
                                                        <p>
                                                            File sudah diunggah
                                                            :
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
                                                            htmlFor={fieldName}
                                                            className="px-3 py-1 text-sm text-white border-0 rounded-full shadow-sm bg-primary/85 shadow-blue-500/30"
                                                        >
                                                            Pilih File
                                                        </label>

                                                        <div className="">
                                                            <input
                                                                type="file"
                                                                name={fieldName}
                                                                id={fieldName}
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    setData(
                                                                        fieldName,
                                                                        e.target
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
                                                            e.target.files[0]
                                                        )
                                                    }
                                                    className="text-sm text-gray-600 file:absolute file:right-0 file:bg-primary/85 file:text-white file:border-0 file:py-1 file:px-3 file:rounded-full file:shadow-sm file:shadow-blue-500/30"
                                                />
                                            )}
                                        </div>
                                        <InputError
                                            message={errors[fieldName]}
                                            className="mt-2"
                                        />
                                    </div>
                                );
                            }
                        )}

                        {/* Button */}
                        <div className="flex justify-end w-full mt-4">
                            <PrimaryButton disabled={processing} type="submit">
                                Ajukan
                                <IoIosSend className="w-5 h-5 ml-1" />
                            </PrimaryButton>
                        </div>
                    </form>

                    <div className="mb-40" />
                </div>
            </section>

            {/* end of content */}
        </AuthenticatedLayout>
    );
}
