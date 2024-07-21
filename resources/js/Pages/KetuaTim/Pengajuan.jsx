import React, { useState } from "react";
import Navbar from "@/Components/Navbar";
import { useForm, Link, Head, usePage, router } from "@inertiajs/react";
import AdminDrawer from "@/Components/AdminDrawer";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import Swal from "sweetalert2";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { IoIosSend } from "react-icons/io";

export default function Pengajuan({ title, auth, flash }) {
    const props = usePage().props;
    const { data, setData, post, processing, errors, reset, clearErrors,recentlySuccessful } =
        useForm({
            nama_kegiatan: "",
            kak: null,
            form_permintaan: null,
            surat_permintaan: false,
        });

    function submit(e) {
        e.preventDefault();
        post(
            route("ketua_tim.ajukan_pengajuan", data, {
                _token: props.csrf_token,
                _method: "POST",
                preserveScroll: true,
                onSuccess: () => {
                    console.log("Berhasil cuy")
                    reset(
                        "name_kegiatan",
                        "kak",
                        "form_permintaan",
                        "surat_permintaan"
                    );
                    clearErrors();
                },
                recentlySuccessful: () => {
                    console.log("Berhasil cuy")

                }
            })
        );

    }

    return (
        <AuthenticatedLayout user={auth.user} title={title}>
            <Head title={"Pengajuan"}/>
            {/* content */}
            <div className="mx-24">
                <strong className="text-2xl text-center w-full mx-auto flex justify-center mb-16">
                    {title}
                </strong>

                {flash.message &&
                    Swal.fire({
                        title: "Berhasil!",
                        text: `${flash.message}`,
                        icon: "success",
                        iconColor: "#50C878",
                        confirmButtonText: "Oke",
                        confirmButtonColor: "#2D95C9",
                    })
                }
                <form
                    onSubmit={submit}
                    method="post"
                    encType="multipart/form-data"
                    className="w-full max-w-2xl mx-auto my-4 "
                >
                    {/* Nama Kegiatan */}
                    <div className="my-4">
                        <InputLabel
                            htmlFor="nama_kegiatan"
                            value="Nama Kegiatan"
                            className="my-4"
                        />
                        <TextInput
                            type="text"
                            name="nama_kegiatan"
                            placeholder="Masukkan nama kegiatan"
                            isFocused={true}
                            className="bg-white mb-2 input input-bordered input-primary w-full"
                            value={data.question}
                            onChange={(e) =>
                                setData("nama_kegiatan", e.target.value)
                            }
                        />
                        <InputError
                            message={errors.nama_kegiatan}
                            className="mt-2"
                        />
                    </div>

                    {/* KAK */}
                    <div className="my-3">
                        <InputLabel
                            htmlFor="kak"
                            value="Kerangka Ajuan Kerja(KAK)"
                            className="my-2"
                        />

                        <div class="relative inline-block border rounded-md border-primary/25 w-full focus:border-indigo-500 focus:ring-indigo-500  h-12 p-2">
                            <input
                                type="file"
                                name="kak"
                                onChange={(e) =>
                                    setData("kak", e.target.files[0])
                                }
                                className="
                                            file:absolute file:right-0
                                            file:bg-primary file:text-white file:border-0
                                            file:py-1 file:px-3 file:rounded-full
                                            file:shadow-sm file:shadow-blue-500/30
                                            text-gray-600 text-sm
                                    "
                            />
                        </div>
                        <InputError message={errors.kak} className="mt-2" />
                    </div>

                    {/* form_permintaan */}
                    <div className="my-3">
                        <InputLabel
                            htmlFor="form_permintaan"
                            value="Form Permintaan"
                            className="my-2"
                        />
                        <div class="relative inline-block border rounded-md border-primary/25 w-full  focus:border-indigo-500 focus:ring-indigo-500 h-12 p-2">
                            <input
                                type="file"
                                name="form_permintaan"
                                onChange={(e) =>
                                    setData(
                                        "form_permintaan",
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
                            message={errors.form_permintaan}
                            className="mt-2"
                        />
                    </div>

                    {/* surat_permintaan */}
                    <div className="my-3">
                        <InputLabel
                            htmlFor="surat_permintaan"
                            value="Surat Permintaan"
                            className="my-2"
                        />
                        <div class="relative inline-block border rounded-md border-primary/25 w-full focus:border-indigo-500 focus:ring-indigo-500 h-12 p-2">
                            <input
                                type="file"
                                name="surat_permintaan"
                                onChange={(e) =>
                                    setData(
                                        "surat_permintaan",
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
                            message={errors.surat_permintaan}
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
                            Ajukan <IoIosSend className="ml-1 w-5 h-5" />
                        </PrimaryButton>
                    </div>
                </form>
            </div>

            {/* end of content */}
        </AuthenticatedLayout>
    );
}
