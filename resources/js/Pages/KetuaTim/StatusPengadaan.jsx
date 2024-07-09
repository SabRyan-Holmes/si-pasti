import React, { useState } from "react";
import Navbar from "@/Components/Navbar";
import { useForm, Link, Head } from "@inertiajs/react";
import AdminDrawer from "@/Components/AdminDrawer";

import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { FaFileUpload } from "react-icons/fa";

export default function RiwayatPengajuan({ title, auth, pengajuan }) {
    const { data, setData, post, processing, errors } = useForm({
        nama_kegiatan: "",
        kak: null,
        form_permintaan: null,
        surat_permintaan: false,
    });
    return (
        <AuthenticatedLayout user={auth.user} title={title}>
            {/* content */}
            <div className="mx-24 ">
                <div className="my-6">
                    <strong className="text-2xl">{title}</strong>
                    <h4 className="mt-6 font-extrabold">
                        Nama Kegiatan:{" "}
                        <span className="font-normal">
                            {pengajuan}
                        </span>
                    </h4>
                    <h4 className="mt-2 font-extrabold">
                        Status Kegiatan:{" "}
                        <span className="bg-info rounded-md px-2 p-1 font-normal">
                            diproses
                        </span>
                    </h4>
                </div>
                <div className="overflow-x-auto mt-16">
                    <h2 className="text-base font-semibold">
                        Status Pengajuan Berkas
                    </h2>
                    <table className="table table-zebra ">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name Berkas</th>
                                <th>Berkas</th>
                                <th className="text-center">Status</th>
                                <th className="text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            <tr>
                                <th>1</th>
                                <td>Seminar OJK</td>
                                <td>05 Juli 2024</td>
                                <td className="">
                                    <div className=" uppercase text-center rounded-lg p-1 bg-info text-slate-700 font-semibold text-xs ">
                                        Menunggu Validasi
                                    </div>
                                </td>
                                <td className="flex justify-center items-center  ">
                                    <button className="action-btn">
                                        <FaFileUpload className="mr-3" /> Unggah
                                    </button>
                                </td>
                            </tr>
                            {/* row 2 */}
                            <tr>
                                <th>2</th>
                                <td>Hart Hagerty</td>
                                <td>07 Juli 2024</td>
                                {/* Kalo Berhasil jadi bg-success/hijau */}
                                <td>
                                    <div className="uppercase  text-center rounded-lg p-1 bg-success/60 text-slate-700 font-semibold text-xs">
                                        Selesai
                                    </div>
                                </td>
                                <td className="flex justify-center items-center  ">
                                    <button className="action-btn">
                                        <FaFileUpload className="mr-3" /> Unggah
                                    </button>
                                </td>
                            </tr>
                            {/* row 3 */}
                            <tr>
                                <th>3</th>
                                <td>Brice Swyre</td>
                                <td>9 Juli 2024</td>
                                {/* Kalo Berhasil jadi bg-success/hijau */}
                                <td>
                                    <div className="uppercase text-center rounded-lg p-1 bg-warning/60 text-slate-700 font-semibold text-xs">
                                        Ditolak
                                    </div>
                                </td>
                                <td className="flex justify-center items-center  ">
                                    <button className="action-btn">
                                        <FaFileUpload className="mr-3" /> Unggah
                                    </button>
                                </td>
                            </tr>
                            {/* row 3 */}
                            <tr>
                                <th>3</th>
                                <td>Brice Swyre</td>
                                <td>9 Juli 2024</td>
                                {/* Kalo Berhasil jadi bg-success/hijau */}
                                <td>
                                    <div className="uppercase text-center rounded-lg p-1 bg-warning/60 text-slate-700 font-semibold text-xs">
                                        Ditolak
                                    </div>
                                </td>
                                <td className="flex justify-center items-center  ">
                                    <button className="action-btn">
                                        <FaFileUpload className="mr-3" /> Unggah
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    {/* Button */}
                    <div className="w-full mt-4 justify-end flex">
                        <PrimaryButton
                            disabled={processing}
                            type="submit"
                            className=""
                        >
                            Kirim Berkas
                        </PrimaryButton>
                    </div>
                </div>
            </div>

            {/* end of content */}
        </AuthenticatedLayout>
    );
}
