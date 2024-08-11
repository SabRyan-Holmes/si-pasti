import React, { useState } from "react";
import { useForm, Link, Head, usePage } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { FaFileUpload } from "react-icons/fa";
import SecondaryButton from "@/Components/SecondaryButton";
import { RiArrowGoBackFill } from "react-icons/ri";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";

export default function UnggahBerkas({
    title,
    auth,
    pengajuan,
    kegiatan,
    ketuaTim,
}) {
    const [select, setSelect] = useState("");
    const props = usePage().props;
    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
        clearErrors,
        recentlySuccessful,
    } = useForm({
        nama_kegiatan: "",
        kak: null,
        form_permintaan: null,
        surat_permintaan: false,
    });

    function submit(e) {
        e.preventDefault();
        // post(
        //     route("ketua_tim.ajukan_pengajuan", data, {
        //         _token: props.csrf_token,
        //         _method: "POST",
        //         preserveScroll: true,
        //         onSuccess: () => {
        //             reset(
        //                 "name_kegiatan",
        //                 "kak",
        //                 "form_permintaan",
        //                 "surat_permintaan"
        //             );
        //             clearErrors();
        //         },
        //         recentlySuccessful: () => {
        //             console.log("Berhasil cuy")

        //         }
        //     })
        // );
    }

    console.log(select);

    return (
        <AuthenticatedLayout user={auth.user} title={title}>
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
                        {/* Pengajuan PBJ */}

                        <form
                            action=""
                            onSubmit={submit}
                            method="post"
                            encType="multipart/form-data"
                        >
                            {/* Berita Acara Negoisasi */}
                            <div className="my-3">
                                <InputLabel
                                    htmlFor="berita_acara_negoisasi"
                                    value="Berita Acara Negoisasi"
                                    className="my-2"
                                />
                                <div class="relative inline-block border rounded-md border-primary/25 w-full  focus:border-indigo-500 focus:ring-indigo-500 h-12 p-2">
                                    <input
                                        type="file"
                                        name="berita_acara_negoisasi"
                                        onChange={(e) =>
                                            setData(
                                                "berita_acara_negoisasi",
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
                                    message={errors.berita_acara_negoisasi}
                                    className="mt-2"
                                />
                            </div>

                            {/* Bahp */}
                            <div className="my-3">
                                <InputLabel
                                    htmlFor="bahp"
                                    value="Berita Acara Hasil Pemilihan(BAHP)"
                                    className="my-2"
                                />
                                <div class="relative inline-block border rounded-md border-primary/25 w-full  focus:border-indigo-500 focus:ring-indigo-500 h-12 p-2">
                                    <input
                                        type="file"
                                        name="bahp"
                                        onChange={(e) =>
                                            setData(
                                                "bahp",
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
                                    message={errors.bahp}
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
                    </div>
                </div>
            </div>

            {/* end of content */}
        </AuthenticatedLayout>
    );
}
