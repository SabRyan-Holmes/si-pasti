import React, { useState } from "react";
import Navbar from "@/Components/Navbar";
import { useForm, Link, Head } from "@inertiajs/react";
import AdminDrawer from "@/Components/AdminDrawer";

import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function RiwayatPengajuan({ title, auth }) {
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
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name Kegiatan</th>
                                <th>Tanggal Pengajuan</th>
                                <th>Tanggal Disetujui</th>
                                <th className="text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            <tr>
                                <th>1</th>
                                <td>Seminar OJK</td>
                                <td>05 Juli 2024</td>
                                <td>10 Juli 2024</td>
                                <td className="">
                                    <div className=" uppercase text-center rounded-lg p-1 bg-info text-slate-700 font-semibold text-xs ">
                                        Menunggu Validasi
                                    </div>
                                </td>
                            </tr>
                            {/* row 2 */}
                            <tr>
                                <th>2</th>
                                <td>Hart Hagerty</td>
                                <td>07 Juli 2024</td>
                                {/* Kalo Berhasil jadi bg-success/hijau */}
                                <td>10 Juli 2024</td>
                                <td className="">
                                    <div className=" uppercase text-center rounded-lg p-1 bg-success text-slate-700 font-semibold text-xs ">
                                        selesai
                                    </div>
                                </td>
                            </tr>
                            {/* row 3 */}
                            <tr>
                                <th>3</th>
                                <td>Brice Swyre</td>
                                <td>9 Juli 2024</td>
                                {/* Kalo Ditolak jadi jadi bg-warning/merah */}
                                <td>10 Juli 2024</td>
                                <td className="">
                                    <div className=" uppercase text-center rounded-lg p-1 bg-warning/60 text-slate-700 font-semibold text-xs ">
                                        ditolak
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* end of content */}
        </AuthenticatedLayout>
    );
}
