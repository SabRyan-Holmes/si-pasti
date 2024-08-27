import React, { useEffect, useState } from "react";
import { useForm, Link, Head, usePage, router } from "@inertiajs/react";
import Swal from "sweetalert2";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SecondaryButton from "@/Components/SecondaryButton";
import { RiArrowGoBackFill } from "react-icons/ri";
import { FaEdit, FaEye, FaFileUpload } from "react-icons/fa";
import { MdEditDocument } from "react-icons/md";
import { IoIosArrowDown, IoIosSend } from "react-icons/io";
import { Dropdown, InputLabel, SuccessButton } from "@/Components";
import {
    FaCheck,
    FaDownload,
    FaRegFolder,
    FaRegFolderOpen,
} from "react-icons/fa6";
import { TabelBerkas } from "../Partials";

export default function ShowBerkas({
    title,
    auth,
    flash,
    pengajuan,
    berkasKT,
    berkasPPK,
    berkasPBJ,
    berkasPK,
    berkasBA,
    berkasKuitansi,
    berkasPembayaran,
    // semuaBerkas,
}) {
    const props = usePage().props;
    // Function to get the key based on the value

    const requiredBerkasKT = {
        kak: "Kerangka Ajuan Kerja",
        form_permintaan: "Form Permintaan",
        surat_permintaan: "Surat Permintaan",
    };
    const requiredBerkasPPK = {
        ban: "Berita Acara Negoisasi",
        bahp: "Berita Acara Hasil Pemilihan(BAHP)",
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
        berkasKuitansi: "Kuitansi",
        surat_pesanan: "Surat Pesanan",
    };
    const requiredPembayaran = {
        spm: "Surat Perintah Pembayaran(SPM)",
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

    const _berkasPK = Object.keys(requiredBerkasPK).map((key) => {
        const value = requiredBerkasPK[key];
        return (
            berkasPK.find((d) => d.jenis_dokumen === value) || {
                jenis_dokumen: value,
                is_valid: null,
                path: "",
                nama: "",
                tipe_file: "",
            }
        );
    });

    const _berkasBA = Object.keys(requiredBerkasBA).map((key) => {
        const value = requiredBerkasBA[key];
        return (
            berkasBA.find((d) => d.jenis_dokumen === value) || {
                jenis_dokumen: value,
                is_valid: null,
                path: "",
                nama: "",
                tipe_file: "",
            }
        );
    });

    const _berkasKuitansi = Object.keys(requiredKuitansi).map((key) => {
        const value = requiredKuitansi[key];
        return (
            berkasKuitansi.find((d) => d.jenis_dokumen === value) || {
                jenis_dokumen: value,
                is_valid: null,
                path: "",
                nama: "",
                tipe_file: "",
            }
        );
    });

    const _berkasPembayaran = Object.keys(requiredPembayaran).map((key) => {
        const value = requiredPembayaran[key];
        return (
            berkasPembayaran.find((d) => d.jenis_dokumen === value) || {
                jenis_dokumen: value,
                is_valid: null,
                path: "",
                nama: "",
                tipe_file: "",
            }
        );
    });

    const semuaBerkas = [
        ..._berkasKT,
        ..._berkasPPK,
        ..._berkasPBJ,
        ..._berkasPK,
        ..._berkasBA,
        ..._berkasKuitansi,
        ..._berkasPembayaran,
    ];

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


    // FIXME: Ini kalo ditampilin semua tu kalo pengajuan stage ny pas pesanan selesai be atau juga seteahjh pesanan selesai, kayak pembayaran dan selesai juga
    //  Terus kalo misalkan udah ditampilin semua, itu kan tombol validasiny jadi hilang, kek mano pbj menvalidasiny kalo gitu?
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

                        <SuccessButton
                            className="relative mr-3 scale-110 hover:scale-[1.2] group transition-all duration-200 disabled:hover:scale-110"
                            disabled={pengajuan.stage == "pesanan selesai"}
                        >
                            <Link
                                as="button"
                                href={route("pbj.order-done")}
                                method="post"
                                data={{ pengajuan_id: pengajuan.id }}
                            >
                                {pengajuan.stage == "pemesanan selesai" ? (
                                    <span>Pemesanan Selesai</span>
                                ) : (
                                    <span>Konfirmasi Selesai</span>
                                )}
                                {pengajuan.stage == "pesanan selesai" ? (
                                    ""
                                ) : (
                                    <FaCheck className="float-right w-4 h-4 ml-1" />
                                )}
                                {/* Absolute hover yang menampilkan Kata2 "Konfirmasi Pesanan Selesai" */}
                                {pengajuan.stage !== "pesanan selesai" && (
                                    <div className="absolute hidden scale-75 group-hover:flex bg-slate-700 text-white text-sm py-2 px-3 rounded bottom-[-50px] left-1/2 transform -translate-x-1/2 whitespace-nowrap after:content-[''] after:absolute after:left-1/2 after:bottom-full after:-translate-x-1/2 after:border-8 after:border-transparent after:border-b-gray-700">
                                        Konfirmasi Pesanan Selesai
                                    </div>
                                )}
                            </Link>
                        </SuccessButton>
                    </div>
                </div>

                {pengajuan.stage === "pesanan selesai" ? (
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
                                Berkas Pengajuan PBJ
                            </h2>
                            {/* Tabel Berkas Pengajuan PBJ */}

                            <TabelBerkas
                                daftarBerkas={_berkasPBJ}
                                validasiLink={route("pbj.validasi")}
                                pengajuan={pengajuan}
                            />
                        </div>

                        <div className="pb-20 overflow-x-auto">
                            <h2 className="text-base font-semibold">
                                Berkas Pemesanan/ Kontrak
                            </h2>
                            {/* Tabel Berkas Pemesanan/Kontrak */}
                            <TabelBerkas
                                daftarBerkas={_berkasPK}
                                validasiLink={route("pbj.validasi")}
                                pengajuan={pengajuan}
                            />
                        </div>

                        <div className="pb-20 overflow-x-auto">
                            <h2 className="text-base font-semibold">
                                Berkas Berita Acara
                            </h2>
                            {/* Tabel Berkas Berita Acara */}
                            <TabelBerkas
                                daftarBerkas={_berkasBA}
                                validasiLink={route("pbj.validasi")}
                                pengajuan={pengajuan}
                            />
                        </div>

                        <div className="pb-20 overflow-x-auto">
                            <h2 className="text-base font-semibold">
                                Berkas Kuitansi
                            </h2>
                            {/* Tabel Berkas Kuitansi */}
                            <TabelBerkas
                                daftarBerkas={_berkasKuitansi}
                                validasiLink={route("pbj.validasi")}
                                pengajuan={pengajuan}
                            />
                        </div>

                        <div className="pb-20 overflow-x-auto">
                            <h2 className="text-base font-semibold">
                                Berkas Pembayaran
                            </h2>
                            {/* Tabel Berkas Ketua Tim Start */}
                            <TabelBerkas
                                daftarBerkas={_berkasPembayaran}
                                validasiLink={route("pbj.validasi")}
                                pengajuan={pengajuan}
                            />
                        </div>
                    </>
                )}
            </section>

            {/* end of content */}
        </AuthenticatedLayout>
    );
}
