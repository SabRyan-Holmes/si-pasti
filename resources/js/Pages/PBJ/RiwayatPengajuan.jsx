import React, { useState } from "react";
import Navbar from "@/Components/Navbar";
import { useForm, Link, Head } from "@inertiajs/react";
import AdminDrawer from "@/Components/AdminDrawer";
import { FaHistory } from "react-icons/fa";
import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import moment from "moment/min/moment-with-locales";
import { FaEye } from "react-icons/fa";

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
                {/* Breadcumbs */}
                <div className="breadcrumbs my-3 text-sm">
                    <ul>
                        <li>
                            <a>
                            <FaHistory className="w-4 h-4 mr-2" />
                                Riwayat Pengajuan
                            </a>
                        </li>
                        <li>
                            <a></a>
                        </li>
                    </ul>
                </div>
                <div className="overflow-x-auto">
                    <table className="table ">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Ketua Tim</th>
                                <th>Kegiatan</th>
                                <th>Tanggal Pengajuan</th>
                                <th className="text-center">Status</th>
                                <th className="text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {pengajuan.data?.map((data, i) => (
                                // <Link
                                //     as="tr"
                                //     className="group/item hover:bg-primary/50" href={route('pbj.show_pengajuan', data.kegiatan_id)}
                                // >
                                <tr>

                                    <th>{i + 1}</th>
                                    <td className="capitalize">Nama {data.kegiatan.user.name}</td>
                                    <td>
                                    {data.kegiatan.nama_kegiatan}
                                    </td>
                                    <td>
                                        {moment(data.updated_at).format("LL")}
                                    </td>
                                    <td className="">
                                        <div className=" uppercase text-center rounded-lg p-1 bg-info text-slate-700 font-semibold text-xs ">
                                            {data.stage}
                                        </div>
                                    </td>

                                    <Link as="td" href={route('pbj.show-pengajuan', data.kegiatan_id)} className="flex justify-center items-center gap-2 hover:bg-primary action-btn mt-2">
                                    <span>Lihat</span>
                                    <FaEye />
                                    </Link>
                                {/* </Link> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* end of content */}
        </AuthenticatedLayout>
    );
}
