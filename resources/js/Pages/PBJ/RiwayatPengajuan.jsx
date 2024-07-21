import React, { useState } from "react";
import Navbar from "@/Components/Navbar";
import { useForm, Link, Head } from "@inertiajs/react";
import AdminDrawer from "@/Components/AdminDrawer";

import PrimaryButton from "@/Components/PrimaryButton";

export default function RiwayatPengajuan({ title, auth }) {
    const { data, setData, post, processing, errors } = useForm({
        nama_kegiatan: "",
        kak: null,
        form_permintaan: null,
        surat_permintaan: false,
    });
    return (
        <div className="h-full">
            <Head title={title} />

            <div className="drawer lg:drawer-open h-full">
                <input
                    id="my-drawer-2"
                    type="checkbox"
                    className="drawer-toggle"
                />
                <div className="drawer-content flex flex-col bg-neutral h-full">
                    <Navbar user={auth.user} />
                    <div className="mx-6 mt-6 h-full bg-white">
                        {/* content */}
                        <div className="text-xl font-bold">History Pengajuan</div>
                        <div className="w-11/12 rounded-md border mt-3">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Ketua TIM</th>
                                        <th>Kegiatan</th>
                                        <th>Tanggal Pengajuan</th>
                                        <th>Status Berkas</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row 1 */}
                                    <tr className="hover">
                                        <th>1</th>
                                        <td>Sabrian Maulana</td>
                                        <td>Seminar OJK</td>
                                        <td>Rabu, 1 Juli 2024</td>
                                        <td><div className="bg-[#B3B3B3] text-center rounded-md font-bold">diproses</div></td>
                                    </tr>
                                    {/* row 2 */}
                                    <tr className="hover">
                                        <th>2</th>
                                        <td>Sabrian Maulana</td>
                                        <td>Seminar OJK</td>
                                        <td>Rabu, 1 Juli 2024</td>
                                        <td><div className="bg-[#ADE1A8] text-center rounded-md font-bold">Selesai</div></td>
                                    </tr>
                                    
                                    {/* row3 */}
                                    <tr className="hover">
                                        <th>2</th>
                                        <td>Sabrian Maulana</td>
                                        <td>Seminar OJK</td>
                                        <td>Rabu, 1 Juli 2024</td>
                                        <td><div className="bg-warning/60 text-center rounded-md font-bold">ditolak</div></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* end of content */}
                    </div>
                </div>
                <AdminDrawer
                    active={route().current("pengajuan.index")} divisi={auth.user.name}
                ></AdminDrawer>
            </div>
        </div>
    );
}
