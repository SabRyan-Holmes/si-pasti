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

    // TODO: Hapus lagi nanti, cuman untuk tes
    // pengajuan.stage = "pesanan selesai";
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
                        {pengajuan.stage == "pesanan selesai" && (
                            <SuccessButton
                                className="relative mr-3 scale-110 hover:scale-[1.2] group transition-all duration-200 disabled:text-black disabled:text-opacity-100 disabled:hover:scale-110"
                                disabled={pengajuan.stage == "pesanan selesai"}
                            >
                                <span>Pemesanan Selesai</span>
                            </SuccessButton>
                        )}
                    </div>
                </div>


                {pengajuan.stage === "x" ? (
                    <table className="table my-20 mt-3 border rounded-md border-primary/25 table-bordered">
                        {/* head */}
                        <thead className="bg-secondary">
                            <tr className="text-sm ">
                                <th width="5%"></th>
                                <th width="30%">Nama Berkas</th>
                                <th width="35%">Berkas</th>
                                <th width="15%" className="text-center">
                                    Status
                                </th>
                                <th width="15%" className="text-center">
                                    Keterangan
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {semuaBerkas.map((berkas, i) => (
                                <tr key={i}>
                                    <th className="text-primary">{i + 1}</th>
                                    <td className="capitalize">
                                        {berkas.jenis_dokumen}
                                    </td>

                                    <td className="text-sm capitalize">
                                        <div className="relative group">
                                            {berkas.nama ? (
                                                <>
                                                    <a
                                                        target="_blank"
                                                        className="underline hover:text-primary text-primary decoration-primary"
                                                    >
                                                        {berkas.nama}.
                                                        <span className="lowercase">
                                                            {berkas.tipe_file}
                                                        </span>
                                                    </a>
                                                    {/* Kontainer untuk tombol "Lihat" dan "Download" */}
                                                    <div className="absolute flex justify-center gap-2 transition-opacity opacity-0 group-hover:opacity-100">
                                                        {/* Tombol "Lihat" */}

                                                        <a
                                                            href={`/storage/${berkas.path}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
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
                                                            rel="noopener noreferrer"
                                                            className="flex items-end justify-center h-8 font-medium text-center group/button action-btn text-secondary/75 border-secondary/20 hover:bg-secondary hover:text-white"
                                                        >
                                                            Unduh
                                                            <FaDownload className="mx-1 fill-secondary/75 group-hover/button:fill-white" />
                                                        </a>
                                                    </div>
                                                </>
                                            ) : (
                                                <span className="text-center">
                                                    -
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="p-1 text-center">
                                        {berkas.is_valid === null &&
                                        berkas.nama ? (
                                            <div className="label-base bg-secondary/15">
                                                Diproses
                                            </div>
                                        ) : (
                                            <span className="text-center">
                                                -
                                            </span>
                                        )}

                                        {berkas.is_valid == true && (
                                            <div className="label-success">
                                                Valid
                                            </div>
                                        )}

                                        {berkas.is_valid == false && (
                                            <div className="label-warning">
                                                Tidak Valid
                                            </div>
                                        )}
                                    </td>
                                    <td className="w-full p-0 mx-auto ">
                                        {berkas.nama ? (
                                            <div className=" label-success">
                                                {pengajuan.status}
                                            </div>
                                        ) : (
                                            <div className=" label-base bg-base-300 text-nowrap">
                                                Berkas tidak diajukan
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            <tr></tr>
                        </tbody>
                    </table>
                ) : (
                    <>
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
                    </>
                )}
            </section>

            {/* end of content */}
        </AuthenticatedLayout>
    );
}
