import React, { useEffect } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import Swal from "sweetalert2";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { RiArrowGoBackFill } from "react-icons/ri";
import { FaCheck, FaRegFolder, FaRegFolderOpen } from "react-icons/fa6";
import { DetailPengajuan, TabelBerkas } from "@/Pages/Partials";
import { SecondaryButton, SuccessButton } from "@/Components";


export default function ShowBerkas({
    title,
    auth,
    flash,
    pengajuan,
    berkasKT,
    berkasPPK,
    isDoneOrder,
}) {
    const props = usePage().props;

    const requiredBerkasKT = {
        kak: "Kerangka Ajuan Kerja",
        form_permintaan: "Form Permintaan",
        surat_permintaan: "Surat Permintaan",
    };

    //Berita Acara PBJ
    const requiredBerkasPPK = {
        ban: "Berita Acara Negoisasi",
        bahp: "Berita Acara Hasil Pemilihan(BAHP)",
    };

    const _berkasKT = Object.keys(requiredBerkasKT).map((key) => {
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

    const _berkasPPK = Object.keys(requiredBerkasPPK).map((key) => {
        const value = requiredBerkasPPK[key];
        return (
            berkasPPK.find((d) => d.jenis_dokumen === value) || {
                jenis_dokumen: value,
                is_valid: null,
                path: "",
                nama: "",
                tipe_file: "",
            }
        );
    });

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
                                    <a className="truncate max-w-screen-tablet">
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



                    <div className="w-full mt-12">
                        <DetailPengajuan pengajuan={pengajuan} />
                        <div className="flex justify-end ">
                            {isDoneOrder && (
                                <SuccessButton
                                    className="relative mr-3 scale-110 hover:scale-[1.15] group transition-all duration-200 disabled:hover:scale-110"
                                    disabled={isDoneOrder}
                                >
                                    Pemesanan Selesai
                                    <FaCheck className="float-right w-4 h-4 ml-1" />
                                </SuccessButton>
                            )}
                        </div>
                    </div>
                </div>

                <div className="pb-10 mt-10 overflow-x-auto">
                    <h2 className="text-base font-semibold">
                        Berkas Ketua Tim
                    </h2>
                    {/* Tabel Berkas Pengajuan PPK */}

                    <TabelBerkas
                        daftarBerkas={_berkasKT}
                        validasiLink={route("ppk.validasi")}
                        pengajuan={pengajuan}
                    />
                </div>
                {/* Tabel Berkas Pengajuan PPK */}
                <div className="pb-20 mt-5 overflow-x-auto">
                    <h2 className="text-base font-semibold">
                        Berita Acara PBJ
                    </h2>

                    <TabelBerkas
                        daftarBerkas={_berkasPPK}
                        validasiLink={route("ppk.validasi")}
                        pengajuan={pengajuan}
                    />
                </div>
            </section>

            {/* end of content */}
        </AuthenticatedLayout>
    );
}
