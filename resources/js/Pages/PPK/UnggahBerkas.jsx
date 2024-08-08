import React, { useEffect, useState } from "react";
import { useForm, Link, Head, usePage } from "@inertiajs/react";
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
    Sidebar,
} from "@/Components";

export default function UnggahBerkas({
    title,
    auth,
    kegiatan,
    ketuaTim,
    flash,
}) {
    const [select, setSelect] = useState("");
    const props = usePage().props;
    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            kegiatan_id: kegiatan.id,
            nama_kegiatan: kegiatan.nama_kegiatan,

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
        post(
            route("ppk.ajukan-berkas", data, {
                _token: props.csrf_token,
                _method: "POST",
                forceFormData: true,
                preserveState: false,
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    clearErrors();
                    e.preventDefault();
                },
                recentlySuccessful: () => {
                    e.preventDefault();
                    console.log("Berhasil cuy");
                },
            })
        );
    }




    // console.log(select);
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

    console.log(errors)
    return (
        <AuthenticatedLayout user={auth.user} title={title}>
            <Head title={title} />
            {/* content */}
            <div className="mx-24">
                <div className="mb-6">
                    <div className="breadcrumbs mt-3 text-sm">
                        <ul>
                            <li>
                                <a href={route("ppk.daftar-berkas")}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        className="mr-1 h-4 w-4 stroke-current"
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
                                <span className="inline-flex items-center gap-2">
                                    {kegiatan.nama_kegiatan}
                                </span>
                            </li>

                            <li>
                                <span className="inline-flex items-center gap-2">
                                    <MdOutlineDriveFolderUpload className="h-4 w-4 stroke-current" />
                                    {/* <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        className="h-4 w-4 stroke-current"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        ></path>
                                    </svg> */}
                                    Unggah Berkas
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div className="flex justify-between mt-7">
                        <strong className="text-2xl">{title}</strong>
                        <SecondaryButton
                            onClick={() => window.history.back()}
                            className="bg-secondary/5 capitalize "
                        >
                            Kembali{" "}
                            <RiArrowGoBackFill className="w-3 h-3 ml-2 fill-secondary" />
                        </SecondaryButton>
                    </div>
                    <h4 className="mt-6 font-extrabold">
                        Nama Kegiatan:
                        <span className="mx-1 font-normal capitalize">
                            {kegiatan.nama_kegiatan}
                        </span>
                    </h4>
                    <h4 className="mt-2 mb-10 font-extrabold">
                        Ketua Tim:
                        <span className=" mx-1 font-normal capitalize">
                            {ketuaTim.name}
                        </span>
                    </h4>

                    <strong className="font-extrabold pt-12">
                        Pilih Berkas yang ingin diunggah
                    </strong>

                    <div className="max-w-screen-tablet pb-5">
                        <select
                            className="my-2  w-full px-2 rounded-md  border-gradient"
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
                                        file:bg-primary file:text-white file:border-0
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
                                        file:bg-primary file:text-white file:border-0
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
                                        file:bg-primary file:text-white file:border-0
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
                                        file:bg-primary file:text-white file:border-0
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
                                <div className="w-full mt-4 justify-end flex">
                                    <PrimaryButton
                                        disabled={processing}
                                        type="submit"
                                        className="bg-success"
                                    >
                                        Ajukan{" "}
                                        <IoIosSend className="ml-1 w-5 h-5" />
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
                                        file:bg-primary file:text-white file:border-0
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
                                        file:bg-primary file:text-white file:border-0
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
                                <div className="w-full mt-4 justify-end flex">
                                    <PrimaryButton
                                        disabled={processing}
                                        type="submit"
                                        className="bg-success"
                                    >
                                        Ajukan
                                        <IoIosSend className="ml-1 w-5 h-5" />
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
                                        file:bg-primary file:text-white file:border-0
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
                                        file:bg-primary file:text-white file:border-0
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
                                <div className="w-full mt-4 justify-end flex">
                                    <PrimaryButton
                                        disabled={processing}
                                        type="submit"
                                        className="bg-success"
                                    >
                                        Ajukan
                                        <IoIosSend className="ml-1 w-5 h-5" />
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
                                        file:bg-primary file:text-white file:border-0
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
                                        file:bg-primary file:text-white file:border-0
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
                                <div className="w-full mt-4 justify-end flex">
                                    <PrimaryButton
                                        disabled={processing}
                                        type="submit"
                                        className="bg-success"
                                    >
                                        Ajukan
                                        <IoIosSend className="ml-1 w-5 h-5" />
                                    </PrimaryButton>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>

            {/* end of content */}
        </AuthenticatedLayout>
    );
}
