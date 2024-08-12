import React, { useState } from "react";
import Navbar from "@/Components/Navbar";
import { useForm, Link, Head } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { FaFileUpload } from "react-icons/fa";
import { RiArrowGoBackFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import { SecondaryButton } from "@/Components";

export default function DetailPengajuan({ title, auth, pengajuan }) {


    return (
        <AuthenticatedLayout user={auth.user} title={title} current={route().current()}>
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
                        <span className="label-base bg-base-200 uppercase text-sm font-semibold">
                            {pengajuan.status}
                        </span>
                    </h4>
                </div>

                <div className="overflow-x-auto mt-16">
                    <h2 className="text-base font-semibold">
                        Status Pengajuan Berkas
                    </h2>
                    <table className="table table-bordered mt-3">
                        {/* head */}
                        <thead>
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
                                    <td className="capitalize text-xs">
                                        {data.nama}.
                                        <span className="lowercase">
                                            {data.tipe_file}
                                        </span>
                                    </td>
                                    <td className="">
                                        <div className="uppercase text-center label-base bg-base-200 text-slate-700 font-semibold text-xs ">
                                            {pengajuan.stage}
                                        </div>
                                    </td>
                                    <td className="text-center">

                                        <a
                                            href={`/storage/${data.path}`}
                                            target="_blank"
                                            className="group/button action-btn text-hijau/75  text-center font-medium  group-hover/item:text-white items-center justify-center  mx-auto action-btn border-hijau/20 hover:bg-hijau hover:text-white"
                                        >
                                            Lihat
                                            <FaEye className="mx-1 fill-hijau/75 group-hover/button:fill-white" />
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
