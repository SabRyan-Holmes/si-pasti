import React, { useEffect } from "react";
import { useForm, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { RiArrowGoBackFill } from "react-icons/ri";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import { FaRegFolder } from "react-icons/fa";
import Swal from "sweetalert2";
import { DetailPengajuan, FormUnggah } from "@/Pages/Partials";
import { SecondaryButton } from "@/Components";

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
            preserveState: true,
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

    console.log("errors");
    console.log(errors);

    return (
        <AuthenticatedLayout
            user={auth.user}
            title={title}
            current={route().current()}
        >
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
                                <a className="truncate max-w-screen-tablet">
                                    {pengajuan.nama_kegiatan}
                                </a>
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

                <DetailPengajuan pengajuan={pengajuan}/>


                <div className="pb-5 mt-10 max-w-screen-tablet">
                    {/* Pengajuan PBJ */}

                    <FormUnggah
                        setData={setData}
                        requiredBerkas={requiredBerkas}
                        berkas={berkasPPK}
                        processing={processing}
                        errors={errors}
                        submit={submit}
                    />

                    <div className="mb-40" />
                </div>
            </section>

            {/* end of content */}
        </AuthenticatedLayout>
    );
}
