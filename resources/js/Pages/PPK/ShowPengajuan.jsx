import React, { useEffect, useState } from "react";
import { useForm, Link, Head, usePage, router } from "@inertiajs/react";
import Swal from "sweetalert2";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SecondaryButton from "@/Components/SecondaryButton";
import { RiArrowGoBackFill } from "react-icons/ri";
import { IoDocumentTextOutline } from "react-icons/io5";
import { TiDocumentText } from "react-icons/ti";
import TabelPengajuan from "../Partials/TabelPengajuan";

export default function ShowPengajuan({
    title,
    auth,
    flash,
    pengajuan,
    berkasPBJ,
    berkasPK,
    berkasBA,
    berkasKuitansi,
}) {
    const props = usePage().props;
    // Function to get the key based on the value
    const getKeyByValue = (object, value) => {
        return Object.keys(object).find((key) => object[key] === value);
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
        kuitansi: "Kuitansi",
        surat_pesanan: "Surat Pesanan",
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

    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            pengajuan_id: pengajuan.id,
            nama_kegiatan: pengajuan.nama_kegiatan,
            unggah_ulang: true,

            // If edited
            edited_id: [],

            // Pengajuan PBJ
            "rancangan kontrak": null,
            spekteknis: null,
            rab: null,
            "surat penunjukan penjabat pengadaan": null,

            // Pengajuan Kontrak
            sppbj: null,
            surat_kontrak: null,

            // Pengajuan Berita Acara
            bast: null,
            bap: null,

            // Pengajuan Kuitansi
            kuitansi: null,
            surat_pesanan: null,
        });

    function submit(e) {
        e.preventDefault(); // Mencegah perilaku default dari form submit
        post(route("ppk.ajukan-berkas-ulang"), {
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
                // Balikkan
                setisEdit(false);
            },
        });
    }

    console.log("isi data");
    console.log(data);

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

    // Logika untuk mengecek apakah  smaa2 berisi
    function cekKeyNamaBerisi(berkasDB, berkasRow) {
        // Cek panjang kedua array sama
        if (berkasDB.length !== berkasRow.length) {
            return true;
        }

        // Fungsi untuk mengecek apakah nilai dari key 'nama' tidak kosong, null, atau undefined
        const isNamaValid = (obj) =>
            obj.nama !== undefined &&
            obj.nama !== null &&
            obj.nama.trim() !== "";

        // Cek semua elemen di 'berkasDB'
        const isBerkasDBNamaValid = berkasDB.every(isNamaValid);

        // Cek semua elemen di 'berkasRow'
        const isBerkasNamaValid = berkasRow.every(isNamaValid);

        // Return true jika semua key 'nama' berisi nilai valid
        return !isBerkasNamaValid && !isBerkasDBNamaValid;
    }

    // berkasPBJ,
    // pengajuanKontrak,
    // beritaAcara,
    // kuitansi,
    const isDonePBJ = cekKeyNamaBerisi(berkasPBJ, _berkasPBJ);
    const isDonePK = cekKeyNamaBerisi(berkasPK, _berkasPK);
    const isDoneBA = cekKeyNamaBerisi(berkasBA, _berkasBA);
    const isDoneKuitansi = cekKeyNamaBerisi(berkasKuitansi, _berkasKuitansi);

    const [isEdit, setisEdit] = useState(false);
    console.log("isDone : ", isDonePBJ, isDonePK, isDoneBA, isDoneKuitansi);
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
                    <div className="mt-10 capitalize max-w-screen-phone text-nowrap">
                        <div className="grid grid-cols-2 gap-0">
                            <span className="mr-1 font-bold">
                                Nama Kegiatan
                            </span>
                            <span>: {pengajuan.nama_kegiatan}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-0">
                            <span className="mr-1 font-bold">
                                Ketua TIM /NIP
                            </span>
                            <span>
                                : {nama} {gelar}
                            </span>
                        </div>
                        <div className="grid grid-cols-2 gap-0">
                            <span className="mr-1 font-bold">Nama Tim</span>
                            <span>: {pengajuan.nama_tim}</span>
                        </div>
                    </div>

                    <div className="mt-10 mb-20 overflow-x-auto">
                        <h2 className="text-base font-semibold">
                            Berkas Pengajuan PBJ
                        </h2>
                        {/* Tabel Berkas Pengajuan PBJ */}
                        <TabelPengajuan
                            data={data}
                            setData={setData}
                            daftarBerkas={_berkasPBJ}
                            requiredBerkas={requiredBerkasPBJ}
                            isDisabled={false}
                            submit={submit}
                        />

                        <h2 className="mt-2 text-base font-semibold ">
                            Berkas Berkas Pemesanan
                        </h2>
                        {/* Tabel Berkas Pemesanan /Pengajuan Kontrak*/}
                        <TabelPengajuan
                            data={data}
                            setData={setData}
                            daftarBerkas={_berkasPK}
                            requiredBerkas={requiredBerkasPK}
                            isDisabled={isDonePBJ}
                            submit={submit}
                        />

                        <h2 className="mt-2 text-base font-semibold">
                            Berkas Berita Acara
                        </h2>
                        {/* Tabel Berkas Berita Acara */}
                        <TabelPengajuan
                            data={data}
                            setData={setData}
                            daftarBerkas={_berkasBA}
                            requiredBerkas={requiredBerkasBA}
                            isDisabled={isDonePK}
                            submit={submit}
                        />

                        <h2 className="mt-2 text-base font-semibold">
                            Berkas Kuitansi
                        </h2>
                        {/* Tabel Berkas Kuitansi */}
                        <TabelPengajuan
                            data={data}
                            setData={setData}
                            daftarBerkas={_berkasKuitansi}
                            requiredBerkas={requiredKuitansi}
                            isDisabled={isDoneBA}
                            submit={submit}
                        />
                    </div>
                </main>
            </section>

            {/* end of content */}
        </AuthenticatedLayout>
    );
}
