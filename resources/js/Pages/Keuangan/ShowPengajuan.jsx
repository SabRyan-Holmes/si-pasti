import React, { useEffect, useState } from "react";
import { useForm, usePage, router } from "@inertiajs/react";
import Swal from "sweetalert2";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SecondaryButton from "@/Components/SecondaryButton";
import { RiArrowGoBackFill } from "react-icons/ri";
import { IoDocumentTextOutline } from "react-icons/io5";
import { CgDetailsMore } from "react-icons/cg";
import { TabelPengajuan } from "../Partials";


export default function ShowPengajuan({
    title,
    auth,
    pengajuan,
    flash,
    berkasPembayaran,
}) {
    const props = usePage().props;
    const [isEdit, setisEdit] = useState(false)

    const requiredPembayaran = {
        spm: "Surat Perintah Pembayaran(SPM)",
    };

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

    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            pengajuan_id: pengajuan.id,
            nama_kegiatan: pengajuan.nama_kegiatan,
            unggah_ulang: true,
            spm: null,

            // If edited
            edited_id: [],
        });

    function submit(e) {
        e.preventDefault(); // Mencegah perilaku default dari form submit
        post(route("keuangan.ajukan-berkas-ulang"), {
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
                setisEdit(false)
            },
        });
    }




    // Logika untuk mengecek apakah  smaa2 berisi
    function cekKeyNamaBerisi(berkasDB, berkasRow) {
        // Fungsi untuk mengecek apakah ada obj.nama yang berisi
        const adaNamaBerisi = (arr) => {
            return arr.some(obj => obj.nama && obj.nama.trim() !== "" && obj.nama.trim() !== null);
        };

        // Cek jika salah satu array berkasDB atau berkasRow memiliki obj.nama yang berisi
        const isBerkasDBNamaValid = adaNamaBerisi(berkasDB);
        const isBerkasRowNamaValid = adaNamaBerisi(berkasRow);

        // Jika setidaknya salah satu dari berkasDB atau berkasRow berisi nama, return false
        // Jika tidak ada sama sekali yang berisi, return true
        return (isBerkasDBNamaValid || isBerkasRowNamaValid);
    }
    const isDone = cekKeyNamaBerisi(berkasPembayaran, _berkasPembayaran);


    const ketuaTim = pengajuan.created_by;
    let nama = ketuaTim.name.split(" / ")[0];
    let gelar = ketuaTim.name.split(" / ")[1];

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

    console.log("data : 👇");
    console.log(data);

    return (
        <AuthenticatedLayout
            user={auth.user}
            title={title}
            current={route().current()}
        >
            {/* content */}
            <section className="px-12 mx-auto phone:h-screen laptop:h-full max-w-screen-laptop ">
                <div className="flex items-center justify-between ">
                    <div className="my-3 text-sm breadcrumbs">
                        <ul>
                            <li>
                                <a href={route("riwayat-pengajuan")}>
                                    <IoDocumentTextOutline className="w-4 h-4 mr-2" />
                                    Riwayat Pengajuan
                                </a>
                            </li>

                            <li>
                                <span className="inline-flex items-center gap-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        className="w-4 h-4 stroke-current"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        ></path>
                                    </svg>
                                    {pengajuan.nama_kegiatan}
                                </span>
                            </li>
                            <li>
                                <span className="inline-flex items-center gap-2">
                                    <CgDetailsMore className="w-4 h-4" /> Detail
                                    Pengajuan
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
                            Berkas Surat Perintah Pembayaran
                        </h2>
                        {/* Tabel Berkas Pengajuan Pembayaran Start */}
                        <TabelPengajuan
                            data={data}
                            setData={setData}
                            daftarBerkas={_berkasPembayaran}
                            requiredBerkas={requiredPembayaran}
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
