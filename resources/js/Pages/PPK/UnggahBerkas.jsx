import React, { useEffect, useState } from "react";
import { useForm, Head, usePage } from "@inertiajs/react";
import Swal from "sweetalert2";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { RiArrowGoBackFill } from "react-icons/ri";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { InputLabel, SecondaryButton } from "@/Components";
import { FaCheck } from "react-icons/fa6";
import { FormUnggah } from "../Partials";
import { PiSealWarningDuotone } from "react-icons/pi";

export default function UnggahBerkas({
    title,
    auth,
    pengajuan,
    flash,
    berkasPBJ,
    berkasPK,
    berkasBA,
    berkasKuitansi,
    isCheckedBerkasPBJ,
    isCheckedBerkasPK,
    isCheckedBerkasBA,
}) {
    const [select, setSelect] = useState("");
    const props = usePage().props;
    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            pengajuan_id: pengajuan.id,
            nama_kegiatan: pengajuan.nama_kegiatan,
            // Pengajuan PBJ
            // rancangan_kontrak: null,
            // spekteknis: null,
            // rab: null,
            // sppp: null,

            // Pengajuan Kontrak
            // sppbj: null,
            // surat_kontrak: null,

            // Pengajuan Berita Acara
            // bast: null,
            // bap: null,

            // Pengajuan Kuitansi
            // kuintansi: null,
            // surat_pesanan: null,
        });

    function submit(e) {
        e.preventDefault();
        post(route(submitLink), {
            _token: props.csrf_token,
            _method: "POST",
            forceFormData: true,
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                reset();
                clearErrors();
            },
            onFinish: () => {
                // setTimeout(function () {
                //     location.reload();
                // }, 5000);
            },
            onError: () => {
                console.log(errors);
            },
        });
    }

    const [openSelect, setOpenSelect] = useState(false);

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

    // Fungsi untuk memeriksa apakah dokumen sudah ada di berkasPBJ
    const checkBerkas = (kategori, jenis_dokumen) => {
        return kategori.find((doc) => doc.jenis_dokumen === jenis_dokumen);
    };

    const ketuaTim = pengajuan.created_by;
    let nama = ketuaTim.name.split(" / ")[0];
    let gelar = ketuaTim.name.split(" / ")[1];

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 4000,
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

    console.log("errors");
    console.log(errors);
    console.log(select);
    console.log("isi data");
    console.log(data);

    const [submitLink, setSubmitLink] = useState("");

    useEffect(() => {
        switch (select) {
            case "Pengajuan PBJ":
                setSubmitLink("ppk.ajukan-berkas-pbj");
                break;
            case "Pengajuan Kontrak":
                setSubmitLink("ppk.ajukan-berkas-kontrak");
                break;
            case "Pengajuan Berita Acara":
                setSubmitLink("ppk.ajukan-berkas-ba");
                break;
            case "Pengajuan Kuitansi":
                setSubmitLink("ppk.ajukan-berkas-kuitansi");
                break;
            default:
                return;
        }
    }, [select]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            title={title}
            current={route().current()}
        >
            <Head title={title} />
            {/* content */}
            <section className="px-12 mx-auto mb-16 phone:h-screen laptop:h-full max-w-screen-laptop">
                <div className="flex items-center justify-between">
                    <div className="mt-3 text-sm breadcrumbs">
                        <ul>
                            <li>
                                <a href={route("daftar-berkas")}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        className="w-4 h-4 mr-1 stroke-current"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                                        ></path>
                                    </svg>
                                    Daftar Berkas
                                </a>
                            </li>

                            <li>
                                <a className="truncate max-w-screen-tablet">
                                    {pengajuan.nama_kegiatan}
                                </a>
                            </li>

                            <li>
                                <span className="inline-flex items-center gap-1">
                                    <MdOutlineDriveFolderUpload className="w-4 h-4 stroke-current" />
                                    Unggah Berkas
                                </span>
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

                <div className="px-12 mx-auto mt-10">
                    {/* Dro */}
                    <div className="mx-auto ">
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

                        <div className="pb-5 max-w-screen-tablet">
                            <InputLabel
                                value="Pilih Berkas"
                                htmlFor="pilihBerkas"
                                className="font-semibold mt-7"
                            />
                            <div className="relative w-full mt-2">
                                <button
                                    className="inline-flex justify-between w-full px-2 py-3 text-sm text-left border rounded-md border-gradient"
                                    id="pilihBerkas"
                                    onClick={() =>
                                        setOpenSelect((prev) => !prev)
                                    }
                                >
                                    {select ||
                                        "Pilih Berkas yang ingin diunggah"}
                                    <IoIosArrowDown className="w-5 h-5 fill-primary" />
                                </button>
                                {openSelect && (
                                    <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                                        <li
                                            className="px-2 py-2 text-sm text-gray-500 cursor-pointer hover:bg-gray-100"
                                            onClick={() =>
                                                setSelect(
                                                    "Pilih Berkas yang ingin diunggah"
                                                )
                                            }
                                        >
                                            Pilih Berkas yang ingin diunggah
                                        </li>
                                        <li
                                            className="flex justify-between px-2 py-2 text-sm cursor-pointer hover:bg-gray-100"
                                            onClick={() => {
                                                setSelect("Pengajuan PBJ");
                                                setOpenSelect(false);
                                            }}
                                        >
                                            <span>Pengajuan PBJ</span>
                                            {berkasPBJ.length > 0 && (
                                                <FaCheck className="w-4 h-4 fill-hijau" />
                                            )}
                                        </li>
                                        <li
                                            className="flex justify-between px-2 py-2 text-sm cursor-pointer hover:bg-gray-100"
                                            onClick={() => {
                                                setSelect("Pengajuan Kontrak");
                                                setOpenSelect(false);
                                            }}
                                        >
                                            <span>Pengajuan Kontrak</span>

                                            {berkasPK.length > 0 && (
                                                <FaCheck className="w-4 h-4 fill-hijau" />
                                            )}
                                        </li>
                                        <li
                                            className="flex justify-between px-2 py-2 text-sm cursor-pointer hover:bg-gray-100"
                                            onClick={() => {
                                                setSelect(
                                                    "Pengajuan Berita Acara"
                                                );
                                                setOpenSelect(false);
                                            }}
                                        >
                                            <span>Pengajuan Berita Acara</span>

                                            {berkasBA.length > 0 && (
                                                <FaCheck className="w-4 h-4 fill-hijau" />
                                            )}
                                        </li>
                                        <li
                                            className="flex justify-between px-2 py-2 text-sm cursor-pointer hover:bg-gray-100"
                                            onClick={() => {
                                                setSelect("Pengajuan Kuitansi");
                                                setOpenSelect(false);
                                            }}
                                        >
                                            <span>Pengajuan Kuitansi</span>
                                            {berkasKuitansi.length > 0 && (
                                                <FaCheck className="w-4 h-4 fill-hijau" />
                                            )}
                                        </li>
                                    </ul>
                                )}
                            </div>

                            {/* <select
                                className="w-full px-2 my-2 text-sm rounded-md border-gradient"
                                id="pilihBerkass"
                                onChange={(e) => setSelect(e.target.value)}
                            >
                                <option selected disabled value="">
                                    Pilih Berkas yang ingin diunggah
                                </option>
                                <option
                                    value="Pengajuan PBJ"
                                    onClick={(e) => setSelect("Pengajuan PBJ")}
                                    className="flex justify-between"
                                >
                                    <span>Pengajuan PBJss</span>
                                    <FaCheck className="w-4 h-4" />
                                </option>
                                <option value="Pengajuan Kontrak">
                                    Pengajuan Kontrak
                                </option>
                                <option value="Pengajuan Berita Acara">
                                    Pengajuan Berita Acara
                                </option>
                                <option value="Pengajuan Kuitansi">
                                    Pengajuan Kuitansi
                                </option>
                            </select> */}

                            {/* Pengajuan PBJ */}
                            {select == "Pengajuan PBJ" && (
                                <FormUnggah
                                    setData={setData}
                                    requiredBerkas={requiredBerkasPBJ}
                                    berkas={berkasPBJ}
                                    processing={processing}
                                    errors={errors}
                                    submit={submit}
                                />
                            )}

                            {/* Pengajuan Kontrak */}
                            {select == "Pengajuan Kontrak" && (
                                <>
                                    {!isCheckedBerkasPBJ && (
                                        <div
                                            role="alert"
                                            className="my-4 alert bg-secondary/25"
                                        >
                                            <PiSealWarningDuotone className="w-6 h-6 fill-warning" />
                                            <span className="text-sm">
                                                Berkas sebelumnya harus
                                                divalidasi terlebih dahulu oleh
                                                PBJ!
                                            </span>
                                        </div>
                                    )}

                                    <FormUnggah
                                        setData={setData}
                                        requiredBerkas={requiredBerkasPK}
                                        berkas={berkasPK}
                                        checkedBefore={isCheckedBerkasPBJ}
                                        processing={processing}
                                        errors={errors}
                                        submit={submit}
                                    />
                                </>
                            )}

                            {/* Pengajuan Berita Acara */}
                            {select == "Pengajuan Berita Acara" && (
                                <>
                                    {!isCheckedBerkasPK && (
                                        <div
                                            role="alert"
                                            className="my-4 alert bg-secondary/25"
                                        >
                                            <PiSealWarningDuotone className="w-6 h-6 fill-warning" />
                                            <span className="text-sm">
                                                Berkas sebelumnya harus
                                                divalidasi terlebih dahulu oleh
                                                PBJ!
                                            </span>
                                        </div>
                                    )}
                                    <FormUnggah
                                        setData={setData}
                                        requiredBerkas={requiredBerkasBA}
                                        berkas={berkasBA}
                                        checkedBefore={isCheckedBerkasPK}
                                        processing={processing}
                                        errors={errors}
                                        submit={submit}
                                    />
                                </>
                            )}

                            {/* Pengajuan Kuitansi */}
                            {select == "Pengajuan Kuitansi" && (
                                <>
                                    {!isCheckedBerkasBA && (
                                        <div
                                            role="alert"
                                            className="my-4 alert bg-secondary/25"
                                        >
                                            <PiSealWarningDuotone className="w-6 h-6 fill-warning" />
                                            <span className="text-sm">
                                                Berkas sebelumnya harus
                                                divalidasi terlebih dahulu oleh
                                                PBJ!
                                            </span>
                                        </div>
                                    )}
                                    <FormUnggah
                                        setData={setData}
                                        requiredBerkas={requiredKuitansi}
                                        berkas={berkasKuitansi}
                                        checkedBefore={isCheckedBerkasBA}
                                        processing={processing}
                                        errors={errors}
                                        submit={submit}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* end of content */}
        </AuthenticatedLayout>
    );
}
