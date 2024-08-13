import React, { useEffect, useState } from "react";
import Navbar from "@/Components/Navbar";
import { useForm, Link, Head, usePage, router } from "@inertiajs/react";

import {
    InputError,
    InputLabel,
    TextInput,
    PrimaryButton,
    SecondaryButton,
    Dropdown,
} from "@/Components";
import Swal from "sweetalert2";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { IoIosSend } from "react-icons/io";
import { HiDocumentPlus } from "react-icons/hi2";
import { RiArrowGoBackFill } from "react-icons/ri";

export default function CreatePengajuan({ title, auth, flash }) {
    const props = usePage().props;
    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            nama_tim: "",
            nama_kegiatan: "",
            kak: null,
            form_permintaan: null,
            surat_permintaan: null,
        });

    function submit(e) {
        e.preventDefault();
        post(route("ketua-tim.ajukan-pengajuan"), {
            data: data,
            _token: props.csrf_token,
            _method: "POST",
            forceFormData: true,
            onSuccess: () => {
                reset();
                clearErrors();
                console.log("Submit selesai dari On Success");
            },
            onError: () => {
                console.log("Gagal submit");
            },
        });
    }

    useEffect(() => {
        if (flash.message) {
            Swal.fire({
                title: "Berhasil!",
                text: `${flash.message}`,
                icon: "success",
                iconColor: "#50C878",
                confirmButtonText: "Oke",
                confirmButtonColor: "#2D95C9",
            }).then((result) => {
                if (result.isConfirmed) {
                    location.reload();
                }
            });
        }
    }, [flash.message]);

    console.log("data");
    console.log(data);

    const namaTim = auth.user.nama_tim;
    return (
        <AuthenticatedLayout user={auth.user} title={title}>
            {/* content */}
            <section className="px-12 mx-auto phone:h-screen laptop:h-full max-w-screen-laptop">
                {/* Breadcumbs */}
                <div className="flex items-center justify-between">
                    <div className="my-3 text-sm breadcrumbs">
                        <ul>
                            <li>
                                <a>
                                    <HiDocumentPlus className="w-4 h-4 mr-2" />
                                    Buat Pengajuan
                                </a>
                            </li>
                            <li>
                                <a>Pengajuan Permintaan Pengadaan</a>
                            </li>
                        </ul>
                    </div>
                    <SecondaryButton
                        onClick={() => window.history.back()}
                        className="capitalize bg-secondary/5"
                    >
                        Kembali
                        <RiArrowGoBackFill className="w-3 h-3 ml-2 fill-secondary" />
                    </SecondaryButton>
                </div>
                <strong className="flex justify-center w-full mx-auto text-2xl text-center my-9">
                    Pengajuan Permintaan Pengadaan
                </strong>

                <form
                    onSubmit={submit}
                    method="post"
                    encType="multipart/form-data"
                    className="w-full max-w-2xl mx-auto my-4 "
                >
                    {/* Nama Tim */}
                    <div className="my-3">
                        <InputLabel htmlFor="nama_kegiatan" value="Nama Tim" />
                        <select
                            className="w-full px-2 my-2 rounded-md border-gradient"
                            onChange={(e) =>
                                setData("nama_tim", e.target.value)
                            }
                            defaultValue={""}
                        >
                            <option value={""}>Pilih Nama Tim</option>
                            {namaTim.map((tim, i) => (
                                <option>{tim.nama_tim}</option>
                            ))}
                        </select>
                        <InputError
                            message={errors.nama_tim}
                            className="mt-2"
                        />
                    </div>
                    {/* Nama Kegiatan */}
                    <div className="my-3">
                        <InputLabel
                            htmlFor="nama_kegiatan"
                            value="Nama Kegiatan"
                        />
                        <TextInput
                            type="text"
                            name="nama_kegiatan"
                            id="nama_kegiatan"
                            placeholder="Masukkan nama kegiatan"
                            isFocused={true}
                            className="w-full mt-1 mb-2 bg-white border "
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
                                className="text-sm text-gray-600 file:absolute file:right-0 file:bg-primary/80 hu file:text-white file:border-0 file:py-1 file:px-3 file:rounded-full file:shadow-sm file:shadow-blue-500/30"
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
                                        file:bg-primary/80 file:text-white file:border-0
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
                                        file:bg-primary/80 file:text-white file:border-0
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
                    <div className="flex justify-end w-full mt-4">
                        <button
                            disabled={processing}
                            type="submit"
                            className="uppercase bg-hijau button-correct"
                        >
                            Ajukan <IoIosSend className="w-5 h-5 ml-1" />
                        </button>
                    </div>
                </form>
            </section>

            {/* end of content */}
        </AuthenticatedLayout>
    );
}
