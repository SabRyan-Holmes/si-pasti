import React, { useEffect } from "react";
import { useForm, usePage, router } from "@inertiajs/react";
import Swal from "sweetalert2";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SecondaryButton from "@/Components/SecondaryButton";
import { RiArrowGoBackFill } from "react-icons/ri";
import { FaRegFolder, FaRegFolderOpen } from "react-icons/fa6";
import { TabelPengajuan } from "../Partials";

export default function ShowPengajuan({
    title,
    auth,
    flash,
    pengajuan,
    ketuaTim,
    berkasPBJ,
    berkasPK,
    berkasBA,
    berkasKuitansi,
    berkasPembayaran,
}) {
    const props = usePage().props;
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

    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            pengajuan_id: pengajuan.id,
            nama_kegiatan: pengajuan.nama_kegiatan,

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

    const isDonePBJ = cekKeyNamaBerisi(berkasPBJ, _berkasPBJ);
    const isDonePK = cekKeyNamaBerisi(berkasPK, _berkasPK);
    const isDoneBA = cekKeyNamaBerisi(berkasBA, _berkasBA);
    const isDoneKuitansi = cekKeyNamaBerisi(berkasKuitansi, _berkasKuitansi);

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
                                <a href={route("riwayat-pengajuan")}>
                                    <FaRegFolder className="w-4 h-4 mr-2" />
                                    Riwayat Pengajuan
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
                <div class="max-w-screen-phone  mt-5">
                    <div class="grid grid-cols-2 gap-0">
                        <span class="mr-1 font-bold">Nama Kegiatan</span>
                        <span>: {pengajuan.nama_kegiatan}</span>
                    </div>
                    <div class="grid grid-cols-2 gap-0">
                        <span class="mr-1  font-bold">Ketua TIM</span>
                        <span>: {ketuaTim.name}</span>
                    </div>
                </div>

                <main className="px-7">
                    <div className="mt-10 mb-20 overflow-x-auto">
                        <h2 className="text-base font-semibold">
                            Berkas Pengajuan PBJ
                        </h2>
                        {/* Tabel Berkas Pengajuan PBJ Start */}
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
                        {/* Tabel Berkas Pemesanan */}
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

                        <h2 className="mt-2 text-base font-semibold">
                            Berkas Pembayaran
                        </h2>
                        {/* Tabel Berkas Pembayaran */}
                        <TabelPengajuan
                            data={data}
                            setData={setData}
                            daftarBerkas={_berkasPembayaran}
                            requiredBerkas={requiredPembayaran}
                            isDisabled={isDoneKuitansi}
                            submit={submit}
                        />
                    </div>
                </main>
            </section>

            {/* end of content */}
        </AuthenticatedLayout>
    );
}
