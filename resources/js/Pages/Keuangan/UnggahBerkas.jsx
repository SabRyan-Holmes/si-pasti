import React, { useEffect} from "react";
import { useForm, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { RiArrowGoBackFill } from "react-icons/ri";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import { FaRegFolder } from "react-icons/fa6";
import Swal from "sweetalert2";
import { DetailPengajuan, FormUnggah } from "@/Pages/Partials";
import { PiSealWarningDuotone } from "react-icons/pi";
import { SecondaryButton } from "@/Components";

export default function UnggahBerkas({
    title,
    auth,
    pengajuan,
    berkasPembayaran,
    isDoneOrder,
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
        nama_kegiatan: pengajuan.nama_kegiatan,
        // spm: null,
    });

    const requiredPembayaran = {
        spm: "Surat Perintah Pembayaran(SPM)",
    };

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
            <section className="px-12 mx-auto mb-16 phone:h-screen laptop:h-full max-w-screen-laptop">
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
                        <SecondaryButton
                            onClick={() => window.history.back()}
                            className="capitalize bg-secondary/5 "
                        >
                            Kembali{" "}
                            <RiArrowGoBackFill className="w-3 h-3 ml-2 fill-secondary" />
                        </SecondaryButton>
                    </div>

                    <DetailPengajuan pengajuan={pengajuan}/>

                    <div className="pb-5 max-w-screen-laptop">
                        {/* Berkas Pembayaran */}
                        {!isDoneOrder && (
                            <div
                                role="alert"
                                className="my-4 alert bg-secondary/25"
                            >
                                <PiSealWarningDuotone className="w-6 h-6 fill-warning" />
                                <span className="text-sm">
                                    Pesanan harus selesai terlebih dahulu!
                                </span>
                            </div>
                        )}
                        <FormUnggah
                            setData={setData}
                            requiredBerkas={requiredPembayaran}
                            berkas={berkasPembayaran}
                            checkedBefore={isDoneOrder}
                            processing={processing}
                            errors={errors}
                            submit={submit}
                        />
                    </div>
                </div>
            </section>

            {/* end of content */}
        </AuthenticatedLayout>
    );
}
