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
                        <div className="mx-24 ">
                            <div className="overflow-x-auto">
                                <table className="table table-zebra">
                                    {/* head */}
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Name Kegiatan</th>
                                            <th>Tanggal Pengajuan</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* row 1 */}
                                        <tr>
                                            <th>1</th>
                                            <td>Seminar OJK</td>
                                            <td>05 Juli 2024</td>
                                            <td>
                                              <div className="w-24 text-center rounded-lg p-1 bg-info text-black font-bold">
                                                  diproses
                                              </div>
                                            </td>
                                            <td></td>
                                        </tr>
                                        {/* row 2 */}
                                        <tr>
                                            <th>2</th>
                                            <td>Hart Hagerty</td>
                                            <td>07 Juli 2024</td>
                                            {/* Kalo Berhasil jadi bg-success/hijau */}
                                            <td>
                                              <div className="w-24 text-center rounded-lg p-1 bg-success/60 text-black font-bold">
                                                  Selesai
                                              </div>
                                            </td>
                                            <td></td>
                                        </tr>
                                        {/* row 3 */}
                                        <tr>
                                            <th>3</th>
                                            <td>Brice Swyre</td>
                                            <td>9 Juli 2024</td>
                                           {/* Kalo Berhasil jadi bg-success/hijau */}
                                           <td>
                                              <div className=" w-24 text-center rounded-lg p-1 bg-warning/60 text-black font-bold">
                                                  ditolak
                                              </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* end of content */}
                    </div>
                </div>
                <AdminDrawer
                    active={route().current("pengajuan.index")}
                ></AdminDrawer>
            </div>
        </div>
    );
}
