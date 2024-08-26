import React, { useEffect, useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SecondaryButton from "@/Components/SecondaryButton";
import { RiArrowGoBackFill } from "react-icons/ri";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import { FaRegFolder } from "react-icons/fa6";
import Swal from "sweetalert2";
import { FormUnggah } from "../Partials";

export default function UnggahBerkas({
    title,
    auth,
    pengajuan,
    berkasPembayaran,
    flash,
}) {
    const props = usePage().props;
    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
        clearErrors,
        recentlySuccessful,
    } = useForm({
        pengajuan_id: pengajuan.id,
        nama_kegiatan: "",
        // spm: null,
    });

    const requiredPembayaran = {
        spm: "Surat Perintah Pembayaran(SPM)",
    };

    // TODO: Lanjutin Nanti
    function submit(e) {
        e.preventDefault();
        post(route("keuangan.ajukan-berkas"), {
            forceFormData: true,
            _token: props.csrf_token,
            _method: "POST",
            preserveScroll: true,
            onSuccess: () => {
                reset();
                clearErrors();
            },
            onError: () => {
                console.log(errors);
            },
        });
    }
    const ketuaTim = pengajuan.created_by;
    let nama = ketuaTim.name.split(" / ")[0];
    let gelar = ketuaTim.name.split(" / ")[1];

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

    return (
        <AuthenticatedLayout
            user={auth.user}
            title={title}
            current={route().current()}
        >
            {/* content */}
            <div className="mx-24">
                <div className="mb-6">
                    <div className="flex justify-between mt-7">
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
                        <SecondaryButton
                            onClick={() => window.history.back()}
                            className="capitalize bg-secondary/5 "
                        >
                            Kembali{" "}
                            <RiArrowGoBackFill className="w-3 h-3 ml-2 fill-secondary" />
                        </SecondaryButton>
                    </div>

                    <div class="mt-10 capitalize max-w-screen-phone text-nowrap mb-8">
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

                    <div className="pb-5 max-w-screen-tablet">
                        {/* Pengajuan PBJ */}
                        <FormUnggah
                            setData={setData}
                            requiredBerkas={requiredPembayaran}
                            berkas={berkasPembayaran}
                            processing={processing}
                            errors={errors}
                            submit={submit}
                        />
                    </div>
                </div>
            </div>

            {/* end of content */}
        </AuthenticatedLayout>
    );
}
