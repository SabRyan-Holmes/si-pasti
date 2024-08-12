import React, { useEffect, useState } from "react";
import { useForm, Link, Head, usePage, router } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { FaFileUpload } from "react-icons/fa";
import { RiArrowGoBackFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import { SecondaryButton } from "@/Components";
import Swal from "sweetalert2";

export default function DetailPengajuan({ title, auth, pengajuan, flash,kegiatan }) {
    const props = usePage().props;
    // Function to get the key based on the value
    const getKeyByValue = (object, value) => {
        return Object.keys(object).find((key) => object[key] === value);
    };

    const requiredBerkas = {
        kak: "Kerangka Ajuan Kerja",
        form_permintaan: "Form Permintaan",
        surat_permintaan: "Surat Permintaan",
    };

    const documentsData = kegiatan.documents

    const documents = Object.keys(requiredBerkas).map((key) => {
        const value = requiredBerkas[key];
        return (
            documentsData.find((d) => d.jenis_dokumen === value) || {
                jenis_dokumen: value,
                is_valid: null,
                path: "",
                nama: "",
                tipe_file: "",
            }
        );
    });
    const [uploadedFiles, setUploadedFiles] = useState({});
    const handleFileChange = (e, docType, fileKey) => {
        const file = e.target.files[0];
        if (file) {
            setUploadedFiles((prev) => ({
                ...prev,
                [docType]: file.name,
            }));
            setData(fileKey, file); // Assuming setData sets the file data in your form
        }
    };

    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            kegiatan_id: kegiatan.id,
            kak: null,
            form_permintaan: null,
            surat_permintaan: null,
        });

    function submit(e) {
        e.preventDefault(); // Mencegah perilaku default dari form submit
        post(
            route("ketua-tim.ajukan-pengajuan"),
            {
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
            }

        );
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

    console.log("errors :");
    console.log(errors);

    console.log('documents')
    console.log(documents)


    console.log('kegiatan.documents')
    console.log(kegiatan.documents)
    return (
        <AuthenticatedLayout user={auth.user} title={title}>
            <Head title={title} />
            {/* content */}
            <div className="mx-24">
                <div className="my-6">
                    <div className="flex justify-between">
                        <strong className="text-2xl">{title}</strong>
                        <SecondaryButton
                            onClick={() => window.history.back()}
                            className="bg-secondary/5 capitalize "
                        >
                            Kembali
                            <RiArrowGoBackFill className="w-3 h-3 ml-2 fill-secondary" />
                        </SecondaryButton>
                    </div>
                    <h4 className="mt-6 font-extrabold">
                        Nama Kegiatan:
                        <span className="font-normal capitalize">
                            {kegiatan.nama_kegiatan}
                        </span>
                    </h4>
                    <h4 className="mt-2 font-extrabold">
                        Status Kegiatan:
                        <span className="label-base bg-base-200 uppercase text-sm font-semibold">
                            {pengajuan.status}
                        </span>
                    </h4>
                </div>
                <div className="overflow-x-auto mt-16">
                    <h2 className="text-base font-semibold">
                        Status Pengajuan Berkas
                    </h2>
                    <table className="table table-bordered mt-3">
                        {/* head */}
                        <thead>
                            <tr className="text-sm ">
                                <th></th>
                                <th>Jenis Berkas</th>
                                <th>Berkas</th>
                                <th className="text-center">Stage Saat Ini</th>
                                <th className="text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {documents.map((data, i) => (
                                <tr>
                                    <th className="text-primary">{i + 1}</th>
                                    <td className="capitalize">
                                        {data.jenis_dokumen}
                                    </td>
                                    {data.nama ? (
                                        <>
                                            <td className="capitalize text-xs ">
                                                {data.nama}.
                                                <span className="lowercase">
                                                    {data.tipe_file}
                                                </span>
                                            </td>

                                            <td className="text-center">
                                                {data.is_valid === null && (
                                                    <div className="label-secondary">
                                                        Diproses
                                                    </div>
                                                )}

                                                {data.is_valid &&
                                                    data.is_valid != null && (
                                                        <div className="label-success">
                                                            Valid
                                                        </div>
                                                    )}

                                                {!data.is_valid &&
                                                    data.is_valid != null && (
                                                        <div className="label-warning">
                                                            Tidak Valid
                                                        </div>
                                                    )}
                                            </td>

                                            <td className="text-center">
                                                {data.is_valid == null && (
                                                    <a
                                                        href={`/storage/${data.path}`}
                                                        target="_blank"
                                                        className="action-btn mx-auto"
                                                    >
                                                        <FaEye className="mr-2 mx-1" />
                                                        Lihat
                                                    </a>
                                                )}

                                                {data.is_valid &&
                                                    data.is_valid != null && (
                                                        <a
                                                            href={`/storage/${data.path}`}
                                                            target="_blank"
                                                            className="action-btn"
                                                        >
                                                            <FaEye className="mr-2 mx-1" />
                                                            Lihat
                                                        </a>
                                                    )}

                                                {!data.is_valid &&
                                                    data.is_valid != null && (
                                                        <a
                                                            // href={`/storage/${data.path}`}
                                                            className="action-btn"
                                                        >
                                                            <FaEdit className="mr-2 mx-1" />
                                                            Edit
                                                        </a>
                                                    )}
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td
                                                colSpan={2}
                                                className="text-center"
                                            >
                                                {uploadedFiles[
                                                    data.jenis_dokumen
                                                ] ? (
                                                    <span className="capitalize text-sm text-secondary font-medium text-center">
                                                        {
                                                            uploadedFiles[
                                                                data
                                                                    .jenis_dokumen
                                                            ]
                                                        }
                                                    </span>
                                                ) : (
                                                    <div className="label-base bg-base-200">
                                                        Berkas Belum Diajukan
                                                    </div>
                                                )}
                                            </td>
                                            <td className="text-center">
                                                <input
                                                    id={data.jenis_dokumen}
                                                    type="file"
                                                    className="hidden"
                                                    onChange={(e) =>
                                                        handleFileChange(
                                                            e,
                                                            data.jenis_dokumen,
                                                            getKeyByValue(
                                                                requiredBerkasPBJ,
                                                                data.jenis_dokumen
                                                            )
                                                        )
                                                    }
                                                />
                                                <label
                                                    htmlFor={data.jenis_dokumen}
                                                    className="action-btn"
                                                >
                                                    <FaFileUpload className="mr-2 mx-1" />
                                                    {uploadedFiles[
                                                        data.jenis_dokumen
                                                    ] ? (
                                                        <span className="truncate bg-accent max-w-xs">
                                                            Upload
                                                        </span>
                                                    ) : (
                                                        <span className="cursor-pointer">
                                                            Upload
                                                        </span>
                                                    )}
                                                </label>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Button */}
                    {/* <div className="w-full mt-4 justify-end flex">
                        <PrimaryButton type="submit" className="">
                            Kirim Berkas
                        </PrimaryButton>
                    </div> */}
                </div>
            </div>

            {/* end of content */}
        </AuthenticatedLayout>
    );
}
