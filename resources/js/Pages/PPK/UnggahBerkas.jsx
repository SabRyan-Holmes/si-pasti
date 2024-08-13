import React, { useEffect, useState } from "react";
import { useForm, Head, usePage } from "@inertiajs/react";
import Swal from "sweetalert2";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { RiArrowGoBackFill } from "react-icons/ri";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import {
    InputError,
    InputLabel,
    PrimaryButton,
    SecondaryButton,
} from "@/Components";

export default function UnggahBerkas({ title, auth, pengajuan, flash }) {
    const [select, setSelect] = useState("");
    const props = usePage().props;
    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            pengajuan_id: pengajuan.id,
            nama_kegiatan: pengajuan.nama_kegiatan,

            // Pengajuan PBJ
            rancangan_kontrak: null,
            spekteknis: null,
            rab: null,
            sppp: null,

            // Pengajuan Kontrak
            sppbj: null,
            surat_kontrak: null,

            // Pengajuan Berita Acara
            bast: null,
            bap: null,

            // Pengajuan Kuitansi
            kuintansi: null,
            surat_pesanan: null,
        });

    function submit(e) {
        e.preventDefault();
        post(route("ppk.ajukan-berkas"), {
            _token: props.csrf_token,
            _method: "POST",
            forceFormData: true,
            preserveState: false,
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
        });
    }

    // console.log(select);
    console.log("isi data");
    console.log(data);

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

    // TODO : Validasi saat upload berkas belum jalann dgn baik kalo berkas ny bener2 dikosongin
    // useEffect(() => {
    //     if (Object.values(errors)[0]) {
    //         Toast.fire({
    //             icon: "warning",
    //             title: Object.values(errors)[0],
    //         });
    //     }
    // }, [errors]);

    const ketuaTim = pengajuan.created_by;
    console.log("errors");
    console.log(errors);
    return (
        <AuthenticatedLayout user={auth.user} title={title} current={route().current()}>
            <Head title={title} />
            {/* content */}
            <section className="px-12 mx-auto phone:h-screen laptop:h-full max-w-screen-laptop">
                <div className="flex items-center justify-between">
                    <div className="mt-3 text-sm breadcrumbs">
                        <ul>
                            <li>
                                <a href={route("ppk.daftar-berkas")}>
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
                                <span>{pengajuan.nama_kegiatan}</span>
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
                        <h4 className="mt-6 font-extrabold">
                            Nama Kegiatan:
                            <span className="mx-1 font-normal capitalize">
                                {pengajuan.nama_kegiatan}
                            </span>
                        </h4>
                        <h4 className="mt-2 mb-3 font-extrabold">
                            Ketua Tim:
                            <span className="mx-1 font-normal capitalize ">
                                {ketuaTim.name}
                            </span>
                        </h4>

                        {/* <strong className="pt-4 italic font-extrabold">
                            Pilih Berkas yang ingin diunggah
                        </strong> */}

                        <div className="pb-5 max-w-screen-tablet">
                            <select
                                className="w-full px-2 my-2 rounded-md border-gradient"
                                onChange={(e) => setSelect(e.target.value)}
                            >
                                <option selected disabled value="">
                                    Pilih Berkas yang ingin diunggah
                                </option>
                                <option
                                    value="Pengajuan PBJ"
                                    onClick={(e) => setSelect("Pengajuan PBJ")}
                                >
                                    Pengajuan PBJ
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
                            </select>

                            {/* Pengajuan PBJ */}
                            {select == "Pengajuan PBJ" && (
                                <form
                                    onSubmit={submit}
                                    method="post"
                                    encType="multipart/form-data"
                                >
                                    {/* Rancangan Kontrak */}
                                    <div className="my-3">
                                        <InputLabel
                                            htmlFor="rancangan_kontrak"
                                            value="Rancangan Kontrak"
                                            className="my-2"
                                        />
                                        <div class="relative inline-block border rounded-md border-primary/25 w-full  focus:border-indigo-500 focus:ring-indigo-500 h-12 p-2">
                                            <input
                                                type="file"
                                                name="rancangan_kontrak"
                                                onChange={(e) =>
                                                    setData(
                                                        "rancangan_kontrak",
                                                        e.target.files[0]
                                                    )
                                                }
                                                class="
                                        file:absolute file:right-0
                                        file:bg-primary/85 file:text-white file:border-0
                                        file:py-1 file:px-3 file:rounded-full
                                        file:shadow-sm file:shadow-blue-500/30
                                        text-gray-600 text-sm
                                    "
                                            />
                                        </div>
                                        <InputError
                                            message={errors.rancangan_kontrak}
                                            className="mt-2"
                                        />
                                    </div>

                                    {/* Spekteknis */}
                                    <div className="my-3">
                                        <InputLabel
                                            htmlFor="spekteknis"
                                            value="Spekteknis"
                                            className="my-2"
                                        />
                                        <div class="relative inline-block border rounded-md border-primary/25 w-full  focus:border-indigo-500 focus:ring-indigo-500 h-12 p-2">
                                            <input
                                                type="file"
                                                name="spekteknis"
                                                onChange={(e) =>
                                                    setData(
                                                        "spekteknis",
                                                        e.target.files[0]
                                                    )
                                                }
                                                class="
                                        file:absolute file:right-0
                                        file:bg-primary/85 file:text-white file:border-0
                                        file:py-1 file:px-3 file:rounded-full
                                        file:shadow-sm file:shadow-blue-500/30
                                        text-gray-600 text-sm
                                    "
                                            />
                                        </div>
                                        <InputError
                                            message={errors.spekteknis}
                                            className="mt-2"
                                        />
                                    </div>

                                    {/* RAB/HPS */}
                                    <div className="my-3">
                                        <InputLabel
                                            htmlFor="rab"
                                            value="RAB/HPS"
                                            className="my-2"
                                        />
                                        <div class="relative inline-block border rounded-md border-primary/25 w-full  focus:border-indigo-500 focus:ring-indigo-500 h-12 p-2">
                                            <input
                                                type="file"
                                                name="rab"
                                                onChange={(e) =>
                                                    setData(
                                                        "rab",
                                                        e.target.files[0]
                                                    )
                                                }
                                                class="
                                        file:absolute file:right-0
                                        file:bg-primary/85 file:text-white file:border-0
                                        file:py-1 file:px-3 file:rounded-full
                                        file:shadow-sm file:shadow-blue-500/30
                                        text-gray-600 text-sm
                                    "
                                            />
                                        </div>
                                        <InputError
                                            message={errors.rab}
                                            className="mt-2"
                                        />
                                    </div>

                                    {/* Surat Penunjukan Penjabat Pengadaan/SPPP */}
                                    <div className="my-3">
                                        <InputLabel
                                            htmlFor="sppp"
                                            value="Surat Penunjukan Penjabat Pengadaan"
                                            className="my-2"
                                        />
                                        <div class="relative inline-block border rounded-md border-primary/25 w-full  focus:border-indigo-500 focus:ring-indigo-500 h-12 p-2">
                                            <input
                                                type="file"
                                                name="sppp"
                                                onChange={(e) =>
                                                    setData(
                                                        "sppp",
                                                        e.target.files[0]
                                                    )
                                                }
                                                class="
                                        file:absolute file:right-0
                                        file:bg-primary/85 file:text-white file:border-0
                                        file:py-1 file:px-3 file:rounded-full
                                        file:shadow-sm file:shadow-blue-500/30
                                        text-gray-600 text-sm
                                    "
                                            />
                                        </div>
                                        <InputError
                                            message={errors.sppp}
                                            className="mt-2"
                                        />
                                    </div>

                                    {/* Button */}
                                    <div className="flex justify-end w-full mt-4">
                                        <PrimaryButton
                                            disabled={processing}
                                            type="submit"
                                        >
                                            Ajukan
                                            <IoIosSend className="w-5 h-5 ml-1" />
                                        </PrimaryButton>
                                    </div>
                                </form>
                            )}

                            {/* Pengajuan Kontrak */}
                            {select == "Pengajuan Kontrak" && (
                                <form
                                    onSubmit={submit}
                                    method="post"
                                    encType="multipart/form-data"
                                >
                                    {/* SPPBJ */}
                                    <div className="my-3">
                                        <InputLabel
                                            htmlFor="sppbj"
                                            value="SPPBJ"
                                            className="my-2"
                                        />
                                        <div class="relative inline-block border rounded-md border-primary/25 w-full  focus:border-indigo-500 focus:ring-indigo-500 h-12 p-2">
                                            <input
                                                type="file"
                                                name="sppbj"
                                                onChange={(e) =>
                                                    setData(
                                                        "sppbj",
                                                        e.target.files[0]
                                                    )
                                                }
                                                class="
                                        file:absolute file:right-0
                                        file:bg-primary/85 file:text-white file:border-0
                                        file:py-1 file:px-3 file:rounded-full
                                        file:shadow-sm file:shadow-blue-500/30
                                        text-gray-600 text-sm
                                    "
                                            />
                                        </div>
                                        <InputError
                                            message={errors.sppbj}
                                            className="mt-2"
                                        />
                                    </div>

                                    {/* Surat_kontrak */}
                                    <div className="mb-3">
                                        <InputLabel
                                            htmlFor="surat_kontrak"
                                            value="Surat Kontrak"
                                            className="my-2"
                                        />
                                        <div class="relative inline-block border rounded-md border-primary/25 w-full  focus:border-indigo-500 focus:ring-indigo-500 h-12 p-2">
                                            <input
                                                type="file"
                                                name="surat_kontrak"
                                                onChange={(e) =>
                                                    setData(
                                                        "surat_kontrak",
                                                        e.target.files[0]
                                                    )
                                                }
                                                class="
                                        file:absolute file:right-0
                                        file:bg-primary/85 file:text-white file:border-0
                                        file:py-1 file:px-3 file:rounded-full
                                        file:shadow-sm file:shadow-blue-500/30
                                        text-gray-600 text-sm
                                    "
                                            />
                                        </div>
                                        <InputError
                                            message={errors.surat_kontrak}
                                            className="mt-2"
                                        />
                                    </div>

                                    {/* Button */}
                                    <div className="flex justify-end w-full mt-4">
                                        <PrimaryButton
                                            disabled={processing}
                                            type="submit"
                                        >
                                            Ajukan
                                            <IoIosSend className="w-5 h-5 ml-1" />
                                        </PrimaryButton>
                                    </div>
                                </form>
                            )}

                            {/* Pengajuan Berita Acara */}
                            {select == "Pengajuan Berita Acara" && (
                                <form
                                    onSubmit={submit}
                                    method="post"
                                    encType="multipart/form-data"
                                >
                                    {/* BAST */}
                                    <div className="my-3">
                                        <InputLabel
                                            htmlFor="bast"
                                            value="Berita Acara Serah Terima(BAST)"
                                            className="my-2"
                                        />
                                        <div class="relative inline-block border rounded-md border-primary/25 w-full  focus:border-indigo-500 focus:ring-indigo-500 h-12 p-2">
                                            <input
                                                type="file"
                                                name="bast"
                                                onChange={(e) =>
                                                    setData(
                                                        "bast",
                                                        e.target.files[0]
                                                    )
                                                }
                                                class="
                                        file:absolute file:right-0
                                        file:bg-primary/85 file:text-white file:border-0
                                        file:py-1 file:px-3 file:rounded-full
                                        file:shadow-sm file:shadow-blue-500/30
                                        text-gray-600 text-sm
                                    "
                                            />
                                        </div>
                                        <InputError
                                            message={errors.bast}
                                            className="mt-2"
                                        />
                                    </div>

                                    {/* BAP */}
                                    <div className="my-3">
                                        <InputLabel
                                            htmlFor="bap"
                                            value="Berita Acara Pembayaran(BAP)"
                                            className="my-2"
                                        />
                                        <div class="relative inline-block border rounded-md border-primary/25 w-full  focus:border-indigo-500 focus:ring-indigo-500 h-12 p-2">
                                            <input
                                                type="file"
                                                name="bap"
                                                onChange={(e) =>
                                                    setData(
                                                        "bap",
                                                        e.target.files[0]
                                                    )
                                                }
                                                class="
                                        file:absolute file:right-0
                                        file:bg-primary/85 file:text-white file:border-0
                                        file:py-1 file:px-3 file:rounded-full
                                        file:shadow-sm file:shadow-blue-500/30
                                        text-gray-600 text-sm
                                    "
                                            />
                                        </div>
                                        <InputError
                                            message={errors.bap}
                                            className="mt-2"
                                        />
                                    </div>

                                    {/* Button */}
                                    <div className="flex justify-end w-full mt-4">
                                        <PrimaryButton
                                            disabled={processing}
                                            type="submit"
                                        >
                                            Ajukan
                                            <IoIosSend className="w-5 h-5 ml-1" />
                                        </PrimaryButton>
                                    </div>
                                </form>
                            )}

                            {/* Pengajuan Kuitansi */}
                            {select == "Pengajuan Kuitansi" && (
                                <form
                                    onSubmit={submit}
                                    method="post"
                                    encType="multipart/form-data"
                                >
                                    {/* BAST */}
                                    <div className="my-3">
                                        <InputLabel
                                            htmlFor="kuitansi"
                                            value="Kuitansi"
                                            className="my-2"
                                        />
                                        <div class="relative inline-block border rounded-md border-primary/25 w-full  focus:border-indigo-500 focus:ring-indigo-500 h-12 p-2">
                                            <input
                                                type="file"
                                                name="kuitansi"
                                                onChange={(e) =>
                                                    setData(
                                                        "kuitansi",
                                                        e.target.files[0]
                                                    )
                                                }
                                                class="
                                        file:absolute file:right-0
                                        file:bg-primary/85 file:text-white file:border-0
                                        file:py-1 file:px-3 file:rounded-full
                                        file:shadow-sm file:shadow-blue-500/30
                                        text-gray-600 text-sm
                                    "
                                            />
                                        </div>
                                        <InputError
                                            message={errors.kuitansi}
                                            className="mt-2"
                                        />
                                    </div>

                                    {/* SURAT_PESANAN */}
                                    <div className="my-3">
                                        <InputLabel
                                            htmlFor="surat_pesanan"
                                            value="Surat Pesanan"
                                            className="my-2"
                                        />
                                        <div class="relative inline-block border rounded-md border-primary/25 w-full  focus:border-indigo-500 focus:ring-indigo-500 h-12 p-2">
                                            <input
                                                type="file"
                                                name="surat_pesanan"
                                                onChange={(e) =>
                                                    setData(
                                                        "surat_pesanan",
                                                        e.target.files[0]
                                                    )
                                                }
                                                class="
                                        file:absolute file:right-0
                                        file:bg-primary/85 file:text-white file:border-0
                                        file:py-1 file:px-3 file:rounded-full
                                        file:shadow-sm file:shadow-blue-500/30
                                        text-gray-600 text-sm
                                    "
                                            />
                                        </div>
                                        <InputError
                                            message={errors.surat_pesanan}
                                            className="mt-2"
                                        />
                                    </div>

                                    {/* Button */}
                                    <div className="flex justify-end w-full mt-4">
                                        <PrimaryButton
                                            disabled={processing}
                                            type="submit"
                                        >
                                            Ajukan
                                            <IoIosSend className="w-5 h-5 ml-1" />
                                        </PrimaryButton>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* end of content */}
        </AuthenticatedLayout>
    );
}
