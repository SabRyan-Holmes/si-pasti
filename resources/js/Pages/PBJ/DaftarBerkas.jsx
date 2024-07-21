import React, { useState } from "react";
import Navbar from "@/Components/Navbar";
import { useForm, Link, Head } from "@inertiajs/react";
import AdminDrawer from "@/Components/AdminDrawer";

export default function DaftarBerkas({ title, auth }) {
    console.log(`isi route  : ${route}`);
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
                        <div className="text-xl font-bold">Daftar Berkas</div>
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
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row 1 */}
                                    <tr className="hover">
                                        <th>1</th>
                                        <td>Sabrian Maulana</td>
                                        <td>Seminar OJK</td>
                                        <td>Rabu, 1 Juli 2024</td>
                                        <td><div className="bg-[#B3B3B3] text-center rounded-md font-bold cursor-pointer">Cek Berkas</div></td>
                                        <td><div className="bg-[#B3B3B3] text-center rounded-md font-bold cursor-pointer">Unggah Berkas</div></td>
                                    </tr>
                                    {/* row 2 */}
                                    <tr className="hover">
                                        <th>2</th>
                                        <td>Sabrian Maulana</td>
                                        <td>Seminar OJK</td>
                                        <td>Rabu, 1 Juli 2024</td>
                                        <td><div className="bg-[#ADE1A8] text-center rounded-md font-bold">Selesai</div></td>
                                        <td><div className="bg-[#ADE1A8] text-center rounded-md font-bold">Selesai</div></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        {/* end of content  */}
                    </div>
                </div>
                <AdminDrawer
                    divisi={auth.user.name}
                    active={route().current("dashboard")}
                ></AdminDrawer>
            </div>
        </div>
    );
}
