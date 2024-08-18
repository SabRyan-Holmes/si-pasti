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
import { FaRegFolder } from "react-icons/fa";

export default function UnggahBerkas({ title, auth, pengajuan }) {
    const [select, setSelect] = useState("");
    const props = usePage().props;
    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            pengajuan_id: pengajuan.id,
            nama_kegiatan: pengajuan.nama_kegiatan,
            ban: null,
            bahp: null,
        });

    function submit(e) {
        e.preventDefault();
        post(route("pbj.ajukan-berkas"), {
            data: data,
            _token: props.csrf_token,
            _method: "POST",
            forceFormData: true,
            onSuccess: () => {
                reset();
                clearErrors();
            },
            onError: () => {
                console.log("Gagal submit");
            },
            onFinish: () => {
                location.reload();
            },
        });
    }
    const ketuaTim = pengajuan.created_by;
    let nama = ketuaTim.name.split(" / ")[0];
    let gelar = ketuaTim.name.split(" / ")[1];
    console.log("errors");
    console.log(errors);

    return (
        <AuthenticatedLayout user={auth.user} title={title}>
            {/* content */}
            <div className="mx-24">
                <div className="mb-6">
                    <div className="mt-3 text-sm breadcrumbs">
                        <ul>
                            <li>
                                <a href={route("ppk.daftar-berkas")}>
                                    <FaRegFolder className="w-4 h-4 mr-2 stroke-current" />
                                    Daftar Berkas
                                </a>
                            </li>

                            <li>
                                <span className="inline-flex items-center gap-2">
                                    {pengajuan.nama_kegiatan}
                                </span>
                            </li>

                            <li>
                                <span className="inline-flex items-center gap-2">
                                    <MdOutlineDriveFolderUpload className="w-4 h-4 stroke-current" />
                                    Unggah Berkas
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div className="flex justify-between mt-7">
                        <strong className="text-2xl">{title}</strong>
                        <SecondaryButton
                            onClick={() => window.history.back()}
                            className="capitalize bg-secondary/5 "
                        >
                            Kembali
                            <RiArrowGoBackFill className="w-3 h-3 ml-2 fill-secondary" />
                        </SecondaryButton>
                    </div>

                    <div class="mt-10 capitalize max-w-screen-phone text-nowrap">
                        <div class="grid grid-cols-2 gap-0">
                            <span class="mr-1 font-bold">Nama Kegiatan</span>
                            <span>: {pengajuan.nama_kegiatan}</span>
                        </div>
                        <div class="grid grid-cols-2 gap-0">
                            <span class="mr-1 font-bold">Ketua Tim</span>
                            <span>
                                : {nama} {gelar}
                            </span>
                        </div>
                        <div class="grid grid-cols-2 gap-0">
                            <span class="mr-1 font-bold">Nama Tim</span>
                            <span>: {pengajuan.nama_tim}</span>
                        </div>
                    </div>

                    <div className="pb-5 mt-10 max-w-screen-tablet">
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
                                    htmlFor="ban"
                                    value="Berita Acara Negoisasi"
                                    className="my-2"
                                />
                                <div class="relative inline-block border rounded-md border-primary/25 w-full  focus:border-indigo-500 focus:ring-indigo-500 h-12 p-2">
                                    <input
                                        type="file"
                                        name="ban"
                                        onChange={(e) =>
                                            setData("ban", e.target.files[0])
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
                                    message={errors.ban}
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
                                            setData("bahp", e.target.files[0])
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
                    </div>
                </div>
            </div>

            {/* end of content */}
        </AuthenticatedLayout>
    );
}
