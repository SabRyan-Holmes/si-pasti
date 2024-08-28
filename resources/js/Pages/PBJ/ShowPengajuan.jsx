import React, { useEffect } from "react";
import { useForm, usePage, router } from "@inertiajs/react";
import Swal from "sweetalert2";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SecondaryButton from "@/Components/SecondaryButton";
import { RiArrowGoBackFill } from "react-icons/ri";
import { DetailPengajuan, TabelPengajuan } from "@/Pages/Partials";
import { IoDocumentTextOutline } from "react-icons/io5";
import { TiDocumentText } from "react-icons/ti";

export default function ShowPengajuan({
    title,
    auth,
    flash,
    pengajuan,
    berkasPPK, // BerkasPPK/Berita Acara PBJ
}) {
    const props = usePage().props;

    // BerkasPPK/Berita Acara PBJ
    const requiredBerkasPPK = {
        ban: "Berita Acara Negoisasi",
        bahp: "Berita Acara Hasil Pemilihan(BAHP)",
    };

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

    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            pengajuan_id: pengajuan.id,
            nama_kegiatan: pengajuan.nama_kegiatan,

            // Berita Acara PBJs
        });

    function submit(e) {
        e.preventDefault(); // Mencegah perilaku default dari form submit
        post(route("pbj.ajukan-berkas-ulang"), {
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
            },
        });
    }

    console.log("isi data");
    console.log(data);

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
        return !(isBerkasDBNamaValid || isBerkasRowNamaValid);
    }

    const isDonePPK = cekKeyNamaBerisi(berkasPPK, _berkasPPK);


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

    console.log("errors :");
    console.log(errors);

    return (
        <AuthenticatedLayout
            user={auth.user}
            title={title}
            current={route().current()}
        >
            {/* content */}
            <section className="mx-auto px-7 phone:h-screen laptop:h-full max-w-screen-laptop ">
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
                            <a className="truncate max-w-screen-tablet">
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

                <main className="px-7">
                <DetailPengajuan pengajuan={pengajuan}/>

                    <div className="mt-10 mb-20 overflow-x-auto">
                        <h2 className="text-base font-semibold">
                            Berita Acara PBJ
                        </h2>
                        {/* Tabel Berkas Pengajuan PBJ Start */}
                        <TabelPengajuan
                            data={data}
                            setData={setData}
                            daftarBerkas={_berkasPPK}
                            requiredBerkas={requiredBerkasPPK}
                            isDisabled={false}
                            submit={submit}
                        />


                    </div>
                </main>
            </section>

            {/* end of content */}
        </AuthenticatedLayout>
    );
}
