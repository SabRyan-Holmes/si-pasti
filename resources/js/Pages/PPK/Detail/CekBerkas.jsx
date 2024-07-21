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

export default function CekBerkas({
    title,
    auth,
    pengajuan,
    kegiatan,
    ketuaTim,
    berkas_pbj,
}) {

    return (
        <AuthenticatedLayout user={auth.user} title={title} current={route().current()}>
            {/* content */}
            <div className="mx-24">
                <div className="mb-6">
                    <div className="breadcrumbs mt-3 text-sm">
                        <ul>
                            <li>
                                <a href={route('ppk.daftar-berkas')}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        className="mr-1 h-4 w-4 stroke-current"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                                        ></path>
                                    </svg>
                                    Daftar Berkas
                                </a>
                            </li>

                            <li>
                                <span className="inline-flex items-center gap-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        className="h-4 w-4 stroke-current"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        ></path>
                                    </svg>
                                    {kegiatan.nama_kegiatan}
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div className="flex justify-between mt-7">
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
                        Nama Kegiatan:
                        <span className="mx-1 font-normal capitalize">
                            {kegiatan.nama_kegiatan}
                        </span>
                    </h4>
                    <h4 className="mt-6 font-extrabold">
                        Ketua Tim:
                        <span className=" mx-1 font-normal capitalize">
                            {ketuaTim.name}
                        </span>
                    </h4>
                    <h4 className="mt-2 font-extrabold">
                        Status Kegiatan:{" "}
                        <span className="bg-info rounded-md px-2 p-1  uppercase text-sm font-semibold">
                            {pengajuan.status}
                        </span>
                    </h4>
                </div>
                {/* Tabel Berkas Ketua Tim Start */}
                <div className="overflow-x-auto mt-16">
                    <h2 className="text-base font-semibold">
                        Berkas Ketua Tim
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
                {/* Tabel Berkas Ketua Tim End */}

                {/* Tabel Berkas PBJ Start */}
                <div className="overflow-x-auto my-16">
                    <h2 className="text-base font-semibold">Berkas PBJ</h2>
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
                            {/* row  */}
                            {berkas_pbj.length ? (
                                berkas_pbj.map((data, i) => (
                                    <tr>
                                        <th className="text-primary">
                                            {i + 1}
                                        </th>
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
                                ))
                            ) : (
                                < >
                                    <tr>
                                        <th className="text-primary">1</th>
                                        <td className="capitalize">
                                            Berita Acara Negoisasi
                                        </td>
                                        <td className="capitalize text-xs">
                                            <span className="lowercase"></span>
                                        </td>
                                        <td className="">
                                            <div className=" uppercase text-center rounded-lg p-1 bg-info text-slate-700 font-semibold text-xs ">Berkas Belum Diajukan</div>
                                        </td>
                                        <td className="flex justify-center items-center gap-2  ">
                                            <td
                                                for="dokumen"
                                                className="action-btn mx-2 text-left text-xs"
                                            >
                                                <input
                                                    id="dokumen"
                                                    name="dokumen"
                                                    type="file"
                                                    className="hidden"
                                                />
                                                Berkas Belum Diajukan
                                            </td>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="text-primary">2</th>
                                        <td className="capitalize">
                                            Berita Acara Hasil Pemilihan
                                        </td>
                                        <td className="capitalize text-xs">
                                            <span className="lowercase"></span>
                                        </td>
                                        <td className="">
                                            <div className=" uppercase text-center rounded-lg p-1 bg-info text-slate-700 font-semibold text-xs ">Berkas Belum Diajukan</div>
                                        </td>
                                        <td className="flex justify-center items-center gap-2  ">
                                            <td
                                                for="dokumen"
                                                className="action-btn mx-2 text-left text-xs"
                                            >
                                                <input
                                                    id="dokumen"
                                                    name="dokumen"
                                                    type="file"
                                                    className="hidden"
                                                />
                                                Berkas Belum Diajukan
                                            </td>
                                        </td>
                                    </tr>
                                </>
                            )}
                            {}
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
