import React, { useState } from "react";
import { useForm, Link, Head } from "@inertiajs/react";
import { FaHistory } from "react-icons/fa";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import moment from "moment/min/moment-with-locales";
import { FaEye } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaUpload } from "react-icons/fa";
import { PrimaryButton } from "@/Components";

export default function RiwayatPengajuan({ title, auth, pengajuan }) {
    const { data, setData, post, processing, errors } = useForm({
        nama_kegiatan: "",
        kak: null,
        form_permintaan: null,
        surat_permintaan: false,
    });
    return (
        <AuthenticatedLayout user={auth.user} title={title} current={route().current()}>
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
                                //     className="group/item hover:bg-primary/50" href={route('pbj.show-pengajuan', data.kegiatan_id)}
                                // >
                                <tr>
                                    <th>{i + 1}</th>
                                    <td className="capitalize">
                                        Nama {data.kegiatan.user.name}
                                    </td>
                                    <td>{data.kegiatan.nama_kegiatan}</td>
                                    <td>
                                        {moment(data.updated_at).format("LL")}
                                    </td>
                                    <td className="">
                                        <div className=" uppercase text-center rounded-lg p-1 bg-info text-slate-700 font-semibold text-xs ">
                                            {data.status}
                                        </div>
                                    </td>

                                    <td className="flex justify-center items-center">
                                        {data.status == "selesai" ? (
                                            <Link
                                                as="button"
                                                href={route(
                                                    "keuangan.show-pengajuan",
                                                    data.kegiatan_id
                                                )}
                                                className="  action-btn bg-success/5 scale-125 border-success/50 "
                                            >
                                                <span className="text-xs font-extrabold text-green-800 scale-[0.8]">
                                                    Lihat
                                                </span>
                                                <FaEye className="fill-success" />
                                            </Link>
                                        ) : (
                                            <Link
                                                href={route(
                                                    "keuangan.unggah-berkas", data.kegiatan_id
                                                )}
                                                className=" action-btn scale-125 border-secondary/30 bg-secondary/5"
                                            >
                                                <span className="text-xs font-bold  text-orange-500/70 scale-[0.8]">
                                                    Unggah{" "}
                                                </span>
                                                <FaUpload className="fill-secondary/60" />
                                            </Link>
                                        )}
                                    </td>
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
