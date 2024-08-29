import React, { useEffect } from "react";
import { Link, Head, usePage } from "@inertiajs/react";
import Swal from "sweetalert2";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { RiArrowGoBackFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import { SecondaryButton, SuccessButton } from "@/Components";
import {
    FaCheck,
    FaDownload,
    FaRegFolder,
    FaRegFolderOpen,
} from "react-icons/fa6";
import { DetailPengajuan } from "./Partials";

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
        ..._berkasPBJ,
        ..._berkasPK,
        ..._berkasPPK,
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

    return (
        <AuthenticatedLayout
            user={auth.user}
            title={title}
            current={route().current()}
        >
            <Head title={title} />
            {/* content */}
            <section className="mx-auto px-7 max-w-screen-laptop">
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


                    <div className="w-full mt-12">
                        <DetailPengajuan pengajuan={pengajuan} />

                        <div className="flex justify-end ">
                            {/* Muncul tombol kalo hanya pbj */}
                            {auth.user.divisi == "PBJ" ? (
                                <SuccessButton
                                    className="relative mr-3 scale-110 hover:scale-[1.15] group transition-all duration-200 disabled:hover:scale-110"
                                    disabled={isDoneOrder}
                                >
                                    <Link
                                        as="button"
                                        href={
                                            auth.user.divisi == "PBJ" &&
                                            route("pbj.order-done")
                                        }
                                        method="post"
                                        data={{ pengajuan_id: pengajuan.id }}
                                    >
                                        {isDoneOrder ? (
                                            <span>Pemesanan Selesai</span>
                                        ) : (
                                            <span>Konfirmasi Selesai</span>
                                        )}
                                        {pengajuan.stage ==
                                        "pesanan selesai" ? (
                                            ""
                                        ) : (
                                            <FaCheck className="float-right w-4 h-4 ml-1" />
                                        )}
                                        {/* Absolute hover yang menampilkan Kata2 "Konfirmasi Pesanan Selesai" */}
                                        {!isDoneOrder && (
                                            <div className="absolute hidden scale-75 group-hover:flex bg-slate-700 text-white text-sm py-3 px-3 rounded bottom-[-45px] left-1/2 transform -translate-x-1/2 whitespace-nowrap after:content-[''] after:absolute after:left-1/2 after:bottom-full after:-translate-x-1/2 after:border-8 after:border-transparent after:border-b-gray-700">
                                                Konfirmasi Pesanan Selesai
                                            </div>
                                        )}
                                    </Link>
                                </SuccessButton>
                            ) : (
                                // cuman muncul tombol disabled dan keterangan sudah selesai kalo yg lain
                                isDoneOrder && (
                                    <SuccessButton
                                        className="relative mr-3 scale-110 hover:scale-[1.15] group transition-all duration-200 disabled:hover:scale-110"
                                        disabled={isDoneOrder}
                                    >
                                        Pemesanan Selesai
                                        <FaCheck className="float-right w-4 h-4 ml-1" />
                                    </SuccessButton>
                                )
                            )}
                        </div>
                    </div>
                </div>

                <table className="table my-20 mt-3 border rounded-md border-primary/25 table-bordered">
                    {/* head */}
                    <thead className="bg-secondary">
                        <tr className="text-sm ">
                            <th width="2%"></th>
                            <th width="25%">Nama Berkas</th>
                            {/* <th width="30%">Kategori</th> */}
                            <th width="30%">Berkas</th>
                            <th width="8%" className="text-center">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {semuaBerkas.map((berkas, i) => (
                            <tr key={i}>
                                <th className="text-center text-primary w-fit">
                                    {i + 1}
                                </th>
                                <td className="capitalize">
                                    {berkas.jenis_dokumen}
                                </td>

                                {berkas.nama ? (
                                    <>
                                        <td className="text-sm capitalize">
                                            <div className="relative group">
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
                                                        download={berkas.nama}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-end justify-center h-8 font-medium text-center group/button action-btn text-secondary/75 border-secondary/20 hover:bg-secondary hover:text-white"
                                                    >
                                                        Unduh
                                                        <FaDownload className="mx-1 fill-secondary/75 group-hover/button:fill-white" />
                                                    </a>
                                                </div>
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
                                    </>
                                ) : (
                                    <td colSpan={2} className="text-center">
                                        <div className="label-base bg-base-200">
                                            Berkas Tidak Diajukan
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))}
                        <tr></tr>
                    </tbody>
                </table>
            </section>

            {/* end of content */}
        </AuthenticatedLayout>
    );
}
