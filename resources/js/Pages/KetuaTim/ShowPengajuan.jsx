import React, { useState } from "react";
import Navbar from "@/Components/Navbar";
import { useForm, Link, Head } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { FaFileUpload } from "react-icons/fa";
import { RiArrowGoBackFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import { SecondaryButton } from "@/Components";
import { IoDocumentTextOutline } from "react-icons/io5";
import { TiDocumentText } from "react-icons/ti";

export default function ShowPengajuan({ title, auth, pengajuan }) {


    return (
        <AuthenticatedLayout user={auth.user} title={title} current={route().current()}>
            {/* content */}
            <section className="px-12 mx-auto phone:h-screen laptop:h-full max-w-screen-laptop ">
                <div className="my-6">
                <div className="flex items-center justify-between ">
                    {/* Breadcumbs */}
                    <div className="my-3 text-sm capitalize breadcrumbs">
                        <ul>
                            <li>
                                <a href={route("ppk.daftar-berkas")}>
                                    <IoDocumentTextOutline className="w-4 h-4 mr-2" />
                                    Riwayat Pengajuan
                                </a>
                            </li>
                            <li>
                                <a>
                                    <TiDocumentText className="w-4 h-4 mr-1" />
                                    {pengajuan.nama_kegiatan}
                                </a>
                            </li>
                            <li>
                                <a>{title}</a>
                            </li>
                        </ul>
                    </div>

                    <SecondaryButton
                        onClick={() => window.history.back()}
                        className="capitalize bg-secondary/5 "
                    >
                        Kembali
                        <RiArrowGoBackFill className="w-3 h-3 ml-2 fill-secondary" />
                    </SecondaryButton>
                </div>
                    <h4 className="mt-6 font-extrabold">
                        Nama Kegiatan:
                        <span className="font-normal capitalize">
                            {pengajuan.nama_kegiatan}
                        </span>
                    </h4>
                    <h4 className="mt-2 font-extrabold">
                        Status Kegiatan:
                        <span className="text-sm font-semibold uppercase label-base bg-base-200">
                            {pengajuan.status}
                        </span>
                    </h4>
                </div>

                <main className="mt-10 overflow-x-auto ">
                    <h2 className="text-base font-semibold">
                        Status Pengajuan Berkas
                    </h2>
                    <table className="table mt-3 table-bordered">
                        {/* head */}
                        <thead className="bg-secondary">
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
                            {pengajuan.documents.map((data, i) => (
                                <tr>
                                    <th className="text-primary">{i + 1}</th>
                                    <td className="capitalize">
                                        {data.jenis_dokumen}
                                    </td>
                                    <td className="text-xs capitalize">
                                        {data.nama}.
                                        <span className="lowercase">
                                            {data.tipe_file}
                                        </span>
                                    </td>
                                    <td className="">
                                        <div className="text-xs font-semibold text-center uppercase label-base bg-base-200 text-slate-700 ">
                                            {pengajuan.stage}
                                        </div>
                                    </td>
                                    <td className="text-center">

                                        <a
                                            href={`/storage/${data.path}`}
                                            target="_blank"
                                            className="items-center justify-center mx-auto font-medium text-center group/button action-btn text-hijau/75 group-hover/item:text-white border-hijau/20 hover:bg-hijau hover:text-white"
                                        >
                                            Lihat
                                            <FaEye className="mx-1 fill-hijau/75 group-hover/button:fill-white" />
                                        </a>
                                        {pengajuan.status != "diproses" && (
                                            <label
                                                for="dokumen"
                                                className="mx-2 text-xs text-left action-btn"
                                            >
                                                <input
                                                    id="dokumen"
                                                    name="dokumen"
                                                    type="file"
                                                    className="hidden"
                                                />
                                                <FaFileUpload className="mx-1" />
                                                Unggah
                                            </label>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Button */}
                    {/* <div className="flex justify-end w-full mt-4">
                        <PrimaryButton type="submit" className="">
                            Kirim Berkas
                        </PrimaryButton>
                    </div> */}
                </main>
            </section>

            {/* end of content */}
        </AuthenticatedLayout>
    );
}
