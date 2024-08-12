import React, { useEffect, useState } from "react";
import { useForm, Link, Head, usePage, router } from "@inertiajs/react";
import Swal from "sweetalert2";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SecondaryButton from "@/Components/SecondaryButton";
import { RiArrowGoBackFill } from "react-icons/ri";
import { FaEdit, FaEye, FaFileUpload } from "react-icons/fa";
import { MdEditDocument } from "react-icons/md";
import { IoIosSend } from "react-icons/io";

export default function DetailPengajuan({
    title,
    auth,
    flash,
    pengajuan,
    ketuaTim,
    berkasPBJ,
    pengajuanKontrak,
    beritaAcara,
    kuitansi,
}) {
    const props = usePage().props;
    // Function to get the key based on the value
    const getKeyByValue = (object, value) => {
        return Object.keys(object).find((key) => object[key] === value);
    };

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

    const documentsPBJ = Object.keys(requiredBerkasPBJ).map((key) => {
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

    const berkasPK = Object.keys(requiredBerkasPK).map((key) => {
        const value = requiredBerkasPK[key];
        return (
            pengajuanKontrak.find((d) => d.jenis_dokumen === value) || {
                jenis_dokumen: value,
                is_valid: null,
                path: "",
                nama: "",
                tipe_file: "",
            }
        );
    });

    const berkasBA = Object.keys(requiredBerkasBA).map((key) => {
        const value = requiredBerkasBA[key];
        return (
            beritaAcara.find((d) => d.jenis_dokumen === value) || {
                jenis_dokumen: value,
                is_valid: null,
                path: "",
                nama: "",
                tipe_file: "",
            }
        );
    });

    const berkasKuitansi = Object.keys(requiredKuitansi).map((key) => {
        const value = requiredKuitansi[key];
        return (
            kuitansi.find((d) => d.jenis_dokumen === value) || {
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
        post(
            route("ppk.ajukan-berkas"),
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
            // {

            //     onSuccess: () => {
            //         clearErrors();
            //         console.log("Submit selesai dari On Success");

            //         router.reload(); // Anda dapat menentukan komponen mana yang ingin di-refresh
            //     },
            //     onError: () => {
            //         console.log("Gagal submit");
            //     },

            // }
        );
    }

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
                            Kembali{" "}
                            <RiArrowGoBackFill className="w-3 h-3 ml-2 fill-secondary" />
                        </SecondaryButton>
                    </div>

                    <div class="max-w-screen-phone  mt-10">
                        <div class="grid grid-cols-2 gap-0">
                            <span class="mr-1 font-bold">Nama Kegiatan</span>
                            <span>: {pengajuan.nama_kegiatan}</span>
                        </div>
                        <div class="grid grid-cols-2 gap-0">
                            <span class="mr-1  font-bold">Ketua TIM</span>
                            <span>: {ketuaTim.name}</span>
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto mt-16 mb-20">
                    <h2 className="text-base font-semibold">
                        Berkas Pengajuan PBJ
                    </h2>
                    {/* Tabel Berkas Pengajuan PBJ Start */}
                    <form onSubmit={submit} enctype="multipart/form-data">
                        <table className="table border rounded-md border-primary/25 mt-3 table-bordered">
                            {/* head */}
                            <thead className="">
                                <tr className="text-sm ">
                                    <th width="5%"></th>
                                    <th width="30%">Nama Berkas</th>
                                    <th width="35%">Berkas</th>
                                    <th width="15%" className="text-center">
                                        Status Saat Ini
                                    </th>
                                    <th width="15%" className="text-center">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {documentsPBJ.map((data, i) => (
                                    <tr>
                                        <th className="text-primary">
                                            {i + 1}
                                        </th>
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
                                                        data.is_valid !=
                                                            null && (
                                                            <div className="label-success">
                                                                Valid
                                                            </div>
                                                        )}

                                                    {!data.is_valid &&
                                                        data.is_valid !=
                                                            null && (
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
                                                        data.is_valid !=
                                                            null && (
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
                                                        data.is_valid !=
                                                            null && (
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
                                                            Berkas Belum
                                                            Diajukan
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
                                                        htmlFor={
                                                            data.jenis_dokumen
                                                        }
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
                        <div className="w-full mt-4 justify-end flex">
                            <button
                                type="submit"
                                className="button-correct uppercase"
                            >
                                Kirim Ulang
                                <IoIosSend />
                            </button>
                        </div>
                    </form>

                    <h2 className="text-base font-semibold  mt-2 ">
                        Berkas Berkas Pemesanan
                    </h2>
                    {/* Tabel Berkas Pemesanan */}
                    <form onSubmit={submit} enctype="multipart/form-data">
                        <table className="table border rounded-md border-primary/25 mt-3 table-bordered">
                            {/* head */}
                            <thead className="">
                                <tr className="text-sm ">
                                    <th width="5%"></th>
                                    <th width="30%">Nama Berkas</th>
                                    <th width="35%">Berkas</th>
                                    <th width="15%" className="text-center">
                                        Status Saat Ini
                                    </th>
                                    <th width="15%" className="text-center">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {berkasPK.map((data, i) => (
                                    <tr>
                                        <th className="text-primary">
                                            {i + 1}
                                        </th>
                                        <td className="capitalize ">
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
                                                        data.is_valid !=
                                                            null && (
                                                            <div className="label-success">
                                                                Valid
                                                            </div>
                                                        )}

                                                    {!data.is_valid &&
                                                        data.is_valid !=
                                                            null && (
                                                            <div className="label-warning">
                                                                Tidak Valid
                                                            </div>
                                                        )}
                                                </td>

                                                <td className="text-center  ">
                                                    {data.is_valid == null && (
                                                        <a
                                                            href={`/storage/${data.path}`}
                                                            target="_blank"
                                                            className="action-btn"
                                                        >
                                                            <FaEye className="mr-2 mx-1" />
                                                            Lihat
                                                        </a>
                                                    )}

                                                    {data.is_valid &&
                                                        data.is_valid !=
                                                            null && (
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
                                                        data.is_valid !=
                                                            null && (
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
                                                            Berkas Belum
                                                            Diajukan
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
                                                                    requiredBerkasPK,
                                                                    data.jenis_dokumen
                                                                )
                                                            )
                                                        }
                                                    />
                                                    <label
                                                        htmlFor={
                                                            data.jenis_dokumen
                                                        }
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
                        <div className="w-full mt-4 justify-end flex">
                            <button
                                type="submit"
                                className="button-correct uppercase"
                            >
                                Kirim Ulang
                                <IoIosSend />
                            </button>
                        </div>
                    </form>

                    <h2 className="text-base font-semibold mt-2">
                        Berkas Berita Acara
                    </h2>

                    {/* Tabel Berkas Berita Acara */}
                    <form onSubmit={submit} enctype="multipart/form-data">
                        <table className="table border rounded-md border-primary/25 mt-3 table-bordered">
                            {/* head */}
                            <thead className="">
                                <tr className="text-sm ">
                                    <th width="5%"></th>
                                    <th width="30%">Nama Berkas</th>
                                    <th width="35%">Berkas</th>
                                    <th width="15%" className="text-center">
                                        Status Saat Ini
                                    </th>
                                    <th width="15%" className="text-center">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {berkasBA.map((data, i) => (
                                    <tr>
                                        <th className="text-primary">
                                            {i + 1}
                                        </th>
                                        <td className="capitalize ">
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
                                                        data.is_valid !=
                                                            null && (
                                                            <div className="label-success">
                                                                Valid
                                                            </div>
                                                        )}

                                                    {!data.is_valid &&
                                                        data.is_valid !=
                                                            null && (
                                                            <div className="label-warning">
                                                                Tidak Valid
                                                            </div>
                                                        )}
                                                </td>

                                                <td className="text-center  ">
                                                    {data.is_valid == null && (
                                                        <a
                                                            href={`/storage/${data.path}`}
                                                            target="_blank"
                                                            className="action-btn"
                                                        >
                                                            <FaEye className="mr-2 mx-1" />
                                                            Lihat
                                                        </a>
                                                    )}

                                                    {data.is_valid &&
                                                        data.is_valid !=
                                                            null && (
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
                                                        data.is_valid !=
                                                            null && (
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
                                                            Berkas Belum
                                                            Diajukan
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
                                                                    requiredBerkasBA,
                                                                    data.jenis_dokumen
                                                                )
                                                            )
                                                        }
                                                    />
                                                    <label
                                                        htmlFor={
                                                            data.jenis_dokumen
                                                        }
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
                        <div className="w-full mt-4 justify-end flex">
                            <button
                                type="submit"
                                className="button-correct uppercase"
                            >
                                Kirim Ulang
                                <IoIosSend />
                            </button>
                        </div>
                    </form>

                    <h2 className="text-base font-semibold mt-2">
                        Berkas Kuitansi
                    </h2>
                    {/* Tabel Berkas Kuitansi */}
                    <form onSubmit={submit} enctype="multipart/form-data">
                        <table className="table border rounded-md border-primary/25 mt-3 table-bordered">
                            {/* head */}
                            <thead className="">
                                <tr className="text-sm ">
                                    <th width="5%"></th>
                                    <th width="30%">Nama Berkas</th>
                                    <th width="35%">Berkas</th>
                                    <th width="15%" className="text-center">
                                        Status Saat Ini
                                    </th>
                                    <th width="15%" className="text-center">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {berkasKuitansi.map((data, i) => (
                                    <tr>
                                        <th className="text-primary">
                                            {i + 1}
                                        </th>
                                        <td className="capitalize ">
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
                                                        data.is_valid !=
                                                            null && (
                                                            <div className="label-success">
                                                                Valid
                                                            </div>
                                                        )}

                                                    {!data.is_valid &&
                                                        data.is_valid !=
                                                            null && (
                                                            <div className="label-warning">
                                                                Tidak Valid
                                                            </div>
                                                        )}
                                                </td>

                                                <td className="text-center  ">
                                                    {data.is_valid == null && (
                                                        <a
                                                            href={`/storage/${data.path}`}
                                                            target="_blank"
                                                            className="action-btn"
                                                        >
                                                            <FaEye className="mr-2 mx-1" />
                                                            Lihat
                                                        </a>
                                                    )}

                                                    {data.is_valid &&
                                                        data.is_valid !=
                                                            null && (
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
                                                        data.is_valid !=
                                                            null && (
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
                                                            Berkas Belum
                                                            Diajukan
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
                                                                    requiredKuitansi,
                                                                    data.jenis_dokumen
                                                                )
                                                            )
                                                        }
                                                    />
                                                    <label
                                                        htmlFor={
                                                            data.jenis_dokumen
                                                        }
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
                        <div className="w-full mt-4 justify-end flex">
                            <button
                                type="submit"
                                className="button-correct uppercase"
                            >
                                Kirim Ulang
                                <IoIosSend />
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* end of content */}
        </AuthenticatedLayout>
    );
}
