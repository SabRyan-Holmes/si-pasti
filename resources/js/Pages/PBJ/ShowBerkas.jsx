import React, { useEffect } from "react";
import { Link, Head, usePage } from "@inertiajs/react";
import Swal from "sweetalert2";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SecondaryButton from "@/Components/SecondaryButton";
import { RiArrowGoBackFill } from "react-icons/ri";
import { SuccessButton } from "@/Components";
import { FaCheck, FaRegFolder, FaRegFolderOpen } from "react-icons/fa6";
import { DetailPengajuan, TabelBerkas } from "@/Pages/Partials";

export default function ShowBerkas({
    title,
    auth,
    flash,
    pengajuan,
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
                                    <a className="truncate max-w-screen-phone">
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
                        <DetailPengajuan pengajuan={pengajuan} />

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
                                {pengajuan.stage == "pesanan selesai" ? (
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
                    </div>
                </div>

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
                        Berkas Pembayaran
                    </h2>
                    {/* Tabel Berkas Ketua Tim Start */}
                    <TabelBerkas
                        daftarBerkas={_berkasPembayaran}
                        validasiLink={route("pbj.validasi")}
                        pengajuan={pengajuan}
                    />
                </div>

                <div className="pb-20 overflow-x-auto">
                    <h2 className="text-base font-semibold">Berkas Kuitansi</h2>
                    {/* Tabel Berkas Kuitansi */}
                    <TabelBerkas
                        daftarBerkas={_berkasKuitansi}
                        validasiLink={route("pbj.validasi")}
                        pengajuan={pengajuan}
                    />
                </div>
            </section>

            {/* end of content */}
        </AuthenticatedLayout>
    );
}
