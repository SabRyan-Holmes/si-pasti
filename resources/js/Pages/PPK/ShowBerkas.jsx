import React, { useState } from "react";
import { useForm, Head, usePage, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SecondaryButton from "@/Components/SecondaryButton";
import { RiArrowGoBackFill } from "react-icons/ri";
import { FaRegFolderOpen } from "react-icons/fa";
import { FaRegFolder } from "react-icons/fa6";
import { TabelBerkas } from "../Partials";

export default function ShowBerkas({
    title,
    auth,
    pengajuan,
    berkasPBJ,
    berkasKT,
}) {
    const props = usePage().props;
    // Function to get the key based on the value
    const getKeyByValue = (object, value) => {
        return Object.keys(object).find((key) => object[key] === value);
    };

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

    // const requiredBerkasPK = ["SPPBJ", "surat kontrak"];

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

    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            pengajuan_id: pengajuan.id,
            nama_kegiatan: pengajuan.nama_kegiatan,

            // Berkas Ketua Tim
            kak: null,
            form_permintaan: null,
            surat_permintaan: null,

            // Pengajuan PBJ
            rancangan_kontrak: null,
            spekteknis: null,
            rab: null,
            sppp: null,
        });

    console.log("isi data");
    console.log(data);

    console.log("errors :");
    console.log(errors);
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

                    <div className="mt-10 capitalize max-w-screen-phone text-nowrap">
                        <div className="grid grid-cols-2 gap-0">
                            <span className="mr-1 font-bold">
                                Nama Kegiatan
                            </span>
                            <span>: {pengajuan.nama_kegiatan}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-0">
                            <span className="mr-1 font-bold">Ketua TIM</span>
                            <span>
                                : {nama} {gelar}
                            </span>
                        </div>
                        <div className="grid grid-cols-2 gap-0">
                            <span className="mr-1 font-bold">Nama Tim</span>
                            <span>: {pengajuan.nama_tim}</span>
                        </div>
                    </div>
                </div>
                <div className="pb-16 mt-10 overflow-x-auto">
                    <h2 className="text-base font-semibold">
                        Berkas Ketua Tim
                    </h2>
                    {/* Tabel Berkas Ketua Tim Start */}
                    <TabelBerkas
                        daftarBerkas={_berkasKT}
                        validasiLink={route('ppk.validasi')}
                        data={data}
                        pengajuan={pengajuan}
                    />
                </div>
                <div className="pb-20 overflow-x-auto">
                    <h2 className="text-base font-semibold">
                        Berkas Pengajuan PBJ
                    </h2>
                    {/* Tabel Berkas Pengajuan PBJ Start */}
                    <TabelBerkas
                        daftarBerkas={_berkasPBJ}
                        data={data}
                        validasiLink={route('ppk.validasi')}
                        pengajuan={pengajuan}
                    />
                </div>
            </section>

            {/* end of content */}
        </AuthenticatedLayout>
    );
}
