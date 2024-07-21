import React, { useState } from "react";
import Navbar from "@/Components/Navbar";
import { useForm, Link, Head } from "@inertiajs/react";
import AdminDrawer from "@/Components/AdminDrawer";

import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { FaFileUpload } from "react-icons/fa";
import SecondaryButton from "@/Components/SecondaryButton";
import { RiArrowGoBackFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";

export default function DetailPengajuan({ title, auth, pengajuan, kegiatan }) {
    return (
        <AuthenticatedLayout user={auth.user} title={title}>
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
                    <h4 className="mt-6 font-extrabold">
                        Nama Kegiatan:{" "}
                        <span className="font-normal capitalize">
                            {kegiatan.nama_kegiatan}
                        </span>
                    </h4>
                    <h4 className="mt-2 font-extrabold">
                        Status Kegiatan:{" "}
                        <span className="bg-info rounded-md px-2 p-1  uppercase text-sm font-semibold">
                            {pengajuan.status}
                        </span>
                    </h4>
                </div>
                <div className="overflow-x-auto mt-16">
                    <h2 className="text-base font-semibold">
                        Status Pengajuan Berkas
                    </h2>
                    <table className="table table-zebra mt-3">
                        {/* head */}
                        <thead>
                            <tr className="text-sm ">
                                <th></th>
                                <th>Jenis Berkas</th>
                                <th>Berkas</th>
                                <th className="text-center">Status Saat Ini</th>
                                <th className="text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {kegiatan.documents.map((data, i) => (
                                <tr>
                                    <th className="text-primary">{i + 1}</th>
                                    <td className="capitalize">{data.jenis_dokumen}</td>
                                    <td className="capitalize text-xs">
                                        {data.nama}.
                                        <span className="lowercase">
                                            {data.tipe_file}
                                        </span>
                                    </td>
                                    <td className="">
                                        <div className=" uppercase text-center rounded-lg p-1 bg-info text-slate-700 font-semibold text-xs ">
                                            {pengajuan.stage}
                                        </div>
                                    </td>
                                    <td className="flex justify-center items-center gap-2  ">
                                        <a
                                            href={`/storage/${data.path}`}
                                            target="_blank"
                                            className="action-btn"
                                        >
                                            <FaEye className="mr-2 mx-1" />{" "}
                                            Lihat
                                        </a>
                                        {pengajuan.status != "diproses" && (
                                            <label
                                                for="dokumen"
                                                className="action-btn mx-2 text-left text-xs"
                                            >
                                                <input
                                                    id="dokumen"
                                                    name="dokumen"
                                                    type="file"
                                                    className="hidden"
                                                />
                                                <FaFileUpload className="mx-1" />{" "}
                                                Unggah
                                            </label>
                                        )}
                                    </td>
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
