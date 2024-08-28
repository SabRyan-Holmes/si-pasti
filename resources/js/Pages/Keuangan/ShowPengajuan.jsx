import React, { useEffect, useState } from "react";
import { useForm, usePage, router } from "@inertiajs/react";
import Swal from "sweetalert2";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SecondaryButton from "@/Components/SecondaryButton";
import { RiArrowGoBackFill } from "react-icons/ri";
import { IoDocumentTextOutline } from "react-icons/io5";
import { CgDetailsMore } from "react-icons/cg";
import { DetailPengajuan, TabelPengajuan } from "@/Pages/Partials";
import { PiSealWarningDuotone } from "react-icons/pi";

export default function ShowPengajuan({
    title,
    auth,
    pengajuan,
    berkasPembayaran,
    isDoneOrder,
    flash,
}) {
    const props = usePage().props;
    const [isEdit, setisEdit] = useState(false);

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

    const { data, setData, post, processing, errors, clearErrors } =
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
        post(route("keuangan.ajukan-berkas"), {
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

    // Logika untuk mengecek apakah  smaa2 berisi
    function cekKeyNamaBerisi(berkasDB, berkasRow) {
        // Fungsi untuk mengecek apakah ada obj.nama yang berisi
        const adaNamaBerisi = (arr) => {
            return arr.some(
                (obj) =>
                    obj.nama &&
                    obj.nama.trim() !== "" &&
                    obj.nama.trim() !== null
            );
        };

        // Cek jika salah satu array berkasDB atau berkasRow memiliki obj.nama yang berisi
        const isBerkasDBNamaValid = adaNamaBerisi(berkasDB);
        const isBerkasRowNamaValid = adaNamaBerisi(berkasRow);

        // Jika setidaknya salah satu dari berkasDB atau berkasRow berisi nama, return false
        // Jika tidak ada sama sekali yang berisi, return true
        return isBerkasDBNamaValid || isBerkasRowNamaValid;
    }
    let disabled = cekKeyNamaBerisi(berkasPembayaran, _berkasPembayaran);
    if (!isDoneOrder) {
        disabled = true;
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

    useEffect(() => {
        if (errors && Object.keys(errors).length > 0) {
            const firstErrorMessage = Object.values(errors)[0]; // Mengambil nilai objek pertama
            Toast.fire({
                icon: "warning",
                title: firstErrorMessage, // Menampilkan pesan error pertama
            });
        }
    }, [errors]);

    // console.log("data : 👇");
    // console.log(data);
    // console.log("disabled");
    // console.log(disabled);

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
                                <a className="truncate max-w-screen-tablet">
                                    <IoDocumentTextOutline className="w-4 h-4 mr-2" />

                                    {pengajuan.nama_kegiatan}
                                </a>
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
                <DetailPengajuan pengajuan={pengajuan}/>

                    <div className="mt-10 mb-20 overflow-x-auto">
                        <h2 className="text-base font-semibold">
                            Berkas Surat Perintah Pembayaran
                        </h2>
                        {/* Tabel Berkas Pengajuan Pembayaran Start */}
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

                        <TabelPengajuan
                            data={data}
                            setData={setData}
                            daftarBerkas={_berkasPembayaran}
                            requiredBerkas={requiredPembayaran}
                            isDisabled={disabled}
                            submit={submit}
                        />
                    </div>
                </main>
            </section>

            {/* end of content */}
        </AuthenticatedLayout>
    );
}
