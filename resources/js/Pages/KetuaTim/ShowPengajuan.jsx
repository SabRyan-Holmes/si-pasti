import React, { useEffect, useState } from "react";
import { useForm, Link, Head, usePage, router } from "@inertiajs/react";
import Swal from "sweetalert2";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SecondaryButton from "@/Components/SecondaryButton";
import { RiArrowGoBackFill } from "react-icons/ri";
import { FaEdit, FaEye, FaFileUpload } from "react-icons/fa";
import { MdEditDocument } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import {
    FaDownload,
    FaFileCircleCheck,
    FaRegFolder,
    FaRegFolderOpen,
    FaUpload,
} from "react-icons/fa6";
import { IoDocumentTextOutline } from "react-icons/io5";

import { TiDocumentText } from "react-icons/ti";
import { SuccessButton } from "@/Components";
import { TabelPengajuan } from "../Partials";

export default function ShowPengajuan({
    title,
    auth,
    flash,
    pengajuan,
    berkasKT,
}) {
    const props = usePage().props;
    // Function to get the key based on the value

    const requiredBerkasKT = {
        kak: "Kerangka Ajuan Kerja",
        form_permintaan: "Form Permintaan",
        surat_permintaan: "Surat Permintaan",
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

    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            pengajuan_id: pengajuan.id,
            nama_kegiatan: pengajuan.nama_kegiatan,
            unggah_ulang: true,
            kak: null,
            form_permintaan: null,
            surat_permintaan: null,

            // If edited
            edited_id: [],
        });

    function submit(e) {
        e.preventDefault(); // Mencegah perilaku default dari form submit
        post(route("ketua-tim.ajukan-berkas-ulang"), {
            data: data,
            _token: props.csrf_token,
            _method: "POST",
            forceFormData: true,

            onSuccess: () => {
                clearErrors();
                console.log("Submit selesai dari On Success");

                router.reload(); // Anda dapat menentukan komponen mana yang ingin di-refresh
            },
            onError: () => {
                console.log("Gagal submit");
            },
            onFinish: () => {
                console.log("Submit selesai");
                setisEdit(false);
            },
        });
    }


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

    const [isEdit, setisEdit] = useState(false);
    const ketuaTim = pengajuan.created_by;
    let nama = ketuaTim.name.split(" / ")[0];
    let gelar = ketuaTim.name.split(" / ")[1];

    // Logika untuk mengecek apakah  smaa2 berisi
    function cekKeyNamaBerisi(berkasDB, documentsRow) {
        // Cek panjang kedua array sama
        if (berkasDB.length !== documentsRow.length) {
            return false;
        }

        // Fungsi untuk mengecek apakah nilai dari key 'nama' tidak kosong, null, atau undefined
        const isNamaValid = (obj) =>
            obj.nama !== undefined &&
            obj.nama !== null &&
            obj.nama.trim() !== "";

        // Cek semua elemen di 'berkasDB'
        const isBerkasNamaValid = berkasDB.every(isNamaValid);

        // Cek semua elemen di 'documentsRow'
        const isDocumentsNamaValid = documentsRow.every(isNamaValid);

        // Return true jika semua key 'nama' berisi nilai valid
        return isBerkasNamaValid && isDocumentsNamaValid;
    }

    const isDone = cekKeyNamaBerisi(berkasKT, _berkasKT);

    console.log("isi data");
    console.log(data);
    console.log("errors :");
    console.log(errors);

    console.log("is Edit & isDone ", isEdit, isDone);
    return (
        <AuthenticatedLayout
            user={auth.user}
            title={title}
            current={route().current()}
        >
            <Head title={title} />
            {/* content */}
            <section className="px-12 mx-auto phone:h-screen laptop:h-full max-w-screen-laptop ">
                <div className="flex items-center justify-between ">
                    {/* Breadcumbs */}
                    <div className="my-3 text-sm capitalize breadcrumbs">
                        <ul>
                            <li>
                                <a href={route("daftar-berkas")}>
                                    <IoDocumentTextOutline className="w-4 h-4 mr-2" />
                                    Riwayat Pengajuan
                                </a>
                            </li>
                            <li>
                                <a>
                                    <TiDocumentText className="w-4 h-4 mr-1" />
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

                <main>
                    <div class="mt-10 capitalize max-w-screen-phone text-nowrap">
                        <div class="grid grid-cols-2 gap-0">
                            <span class="mr-1 font-bold">Nama Kegiatan</span>
                            <span>: {pengajuan.nama_kegiatan}</span>
                        </div>
                        <div class="grid grid-cols-2 gap-0">
                            <span class="mr-1 font-bold">Ketua TIM /NIP</span>
                            <span>
                                : {nama} {gelar}
                            </span>
                        </div>
                        <div class="grid grid-cols-2 gap-0">
                            <span class="mr-1 font-bold">Nama Tim</span>
                            <span>: {pengajuan.nama_tim}</span>
                        </div>
                    </div>

                    <div className="mt-10 mb-20 overflow-x-auto">
                        <h2 className="text-base font-semibold">
                            Pengajuan Permintaan Pengadaan
                        </h2>
                        {/* Tabel Berkas Pengajuan KT/Pengadaan  */}
                        <TabelPengajuan
                            data={data}
                            setData={setData}
                            daftarBerkas={_berkasKT}
                            requiredBerkas={requiredBerkasKT}
                            isDisabled={isDone}
                            submit={submit}
                        />
                    </div>
                </main>
            </section>

            {/* end of content */}
        </AuthenticatedLayout>
    );
}
