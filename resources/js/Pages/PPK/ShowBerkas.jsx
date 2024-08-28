import React, { useEffect } from "react";
import { Head, usePage } from "@inertiajs/react";
import Swal from "sweetalert2";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SecondaryButton from "@/Components/SecondaryButton";
import { RiArrowGoBackFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";

import {
    FaCheck,
    FaDownload,
    FaRegFolder,
    FaRegFolderOpen,
} from "react-icons/fa6";
import { TabelBerkas } from "../Partials";
import { SuccessButton } from "@/Components";

export default function ShowBerkas({
    title,
    auth,
    flash,
    pengajuan,
    berkasKT,
    berkasPBJ,
    isDoneOrder,
    // semuaBerkas,
}) {
    const props = usePage().props;
    // Function to get the key based on the value

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

    const _berkasPBJ = Object.keys(requiredBerkasPBJ).map((key) => {
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

    const semuaBerkas = [..._berkasKT, ..._berkasPBJ];

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

                    <div className="flex items-center justify-between ">
                        <div class="mt-10 capitalize max-w-screen-phone text-nowrap">
                            <div class="grid grid-cols-2 gap-0">
                                <span class="mr-1 font-bold">
                                    Nama Kegiatan
                                </span>
                                <span>: {pengajuan.nama_kegiatan}</span>
                            </div>
                            <div class="grid grid-cols-2 gap-0">
                                <span class="mr-1 font-bold">Ketua Tim </span>
                                <span>
                                    : {nama} {gelar}{" "}
                                </span>
                            </div>
                            <div class="grid grid-cols-2 gap-0">
                                <span class="mr-1 font-bold">Nama Tim</span>
                                <span>: {pengajuan.nama_tim}</span>
                            </div>
                        </div>

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

                <div className="pb-16 mt-10 overflow-x-auto">
                    <h2 className="text-base font-semibold">
                        Berkas Ketua Tim
                    </h2>
                    {/* Tabel Berkas Pengajuan PBJ */}

                    <TabelBerkas
                        daftarBerkas={_berkasKT}
                        validasiLink={route("ppk.validasi")}
                        pengajuan={pengajuan}
                    />
                </div>
                {/* Tabel Berkas Pengajuan PBJ */}
                {/* <div className="pb-16 mt-10 overflow-x-auto">
                            <h2 className="text-base font-semibold">
                                Berkas Pengajuan PBJ
                            </h2>

                            <TabelBerkas
                                daftarBerkas={_berkasPBJ}
                                validasiLink={route("ppk.validasi")}
                                pengajuan={pengajuan}
                            />
                        </div> */}
            </section>

            {/* end of content */}
        </AuthenticatedLayout>
    );
}
