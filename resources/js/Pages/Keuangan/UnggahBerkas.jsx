import React, { useState } from "react";
import { useForm, Link, Head, usePage } from "@inertiajs/react";

import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SecondaryButton from "@/Components/SecondaryButton";
import { RiArrowGoBackFill } from "react-icons/ri";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import { FaRegFolder } from "react-icons/fa6";

export default function UnggahBerkas({
    title,
    auth,
    pengajuan,
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
        //     route("ketua-tim.ajukan_pengajuan", data, {
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
    const ketuaTim = pengajuan.created_by;
    let nama = ketuaTim.name.split(" / ")[0];
    let gelar = ketuaTim.name.split(" / ")[1];


    return (
        <AuthenticatedLayout user={auth.user} title={title}>
            {/* content */}
            <div className="mx-24">
                <div className="mb-6">

                    <div className="flex justify-between mt-7">
                    <div className="mt-3 text-sm breadcrumbs">
                        <ul>
                            <li>
                                <a href={route("daftar-berkas")}>
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
                        <SecondaryButton
                            onClick={() => window.history.back()}
                            className="capitalize bg-secondary/5 "
                        >
                            Kembali{" "}
                            <RiArrowGoBackFill className="w-3 h-3 ml-2 fill-secondary" />
                        </SecondaryButton>
                    </div>



                    <div class="mt-10 capitalize max-w-screen-phone text-nowrap mb-8">
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

                    <strong className="font-extrabold ">
                        Pilih Berkas yang ingin diunggah
                    </strong>

                    <div className="pb-5 max-w-screen-tablet">
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
                                    htmlFor="spm"
                                    value="SPM(Surat Perintah Pembayaran"
                                    className="my-2"
                                />
                                <div class="relative inline-block border rounded-md border-primary/25 w-full  focus:border-indigo-500 focus:ring-indigo-500 h-12 p-2">
                                    <input
                                        type="file"
                                        name="spm"
                                        onChange={(e) =>
                                            setData("spm", e.target.files[0])
                                        }
                                        class="
                                        file:absolute file:right-0
                                        file:bg-primary/75 file:text-white file:border-0
                                        file:py-1 file:px-3 file:rounded-full
                                        file:shadow-sm file:shadow-blue-500/30
                                        text-gray-600 text-sm
                                    "
                                    />
                                </div>
                                <InputError
                                    message={errors.spm}
                                    className="mt-2"
                                />
                            </div>

                            {/* Button */}
                            <div className="flex justify-end w-full mt-4">
                                <PrimaryButton
                                    disabled={processing}
                                    type="submit"
                                    className="bg-hijau"
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
