import React, { useState } from "react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SecondaryButton from "@/Components/SecondaryButton";
import { RiArrowGoBackFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import { MdEditDocument } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import { CgDetailsMore } from "react-icons/cg";

export default function CekBerkas({
    title,
    auth,
    pengajuan,
    kegiatan,
    ketuaTim,
    berkasPBJ,
}) {
    return (
        <AuthenticatedLayout user={auth.user} title={title}>
            {/* content */}
            <div className="mx-24">
                <div className="my-3">
                    <div className="breadcrumbs mt-3 text-sm">
                        <ul>
                            <li>
                                <a href={route("ppk.daftar-berkas")}>
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
                            <li>
                                <span className="inline-flex items-center gap-2">
                                    <CgDetailsMore className="w-4 h-4" /> Detail
                                    Pengajuan
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div className="flex justify-between mt-6">
                        <strong className="text-2xl">{title}</strong>
                        <SecondaryButton
                            onClick={() => window.history.back()}
                            className="bg-secondary/5 capitalize "
                        >
                            Kembali{" "}
                            <RiArrowGoBackFill className="w-3 h-3 ml-2 fill-secondary" />
                        </SecondaryButton>
                    </div>

                    {/* <h4 className="mt-6 font-extrabold flex justify-between">
                        Nama Kegiatan :
                        <span className="font-normal capitalize ml-1">
                            {kegiatan.nama_kegiatan}
                        </span>
                    </h4>
                    <h4 className="mt-2 font-extrabold">
                        Ketua Tim :
                        <span className="font-normal capitalize ml-1">
                            {ketuaTim.name}
                        </span>
                    </h4> */}
                    <div class="max-w-screen-phone  mt-10">
                        <div class="grid grid-cols-2 gap-0">
                            <span class="mr-1 font-bold">Nama Kegiatan</span>
                            <span>: {kegiatan.nama_kegiatan}</span>
                        </div>
                        <div class="grid grid-cols-2 gap-0">
                            <span class="mr-1  font-bold">Ketua TIM</span>
                            <span>: {ketuaTim.name}</span>
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto mt-16 mb-20">
                    <h2 className="text-base font-semibold">
                        Berkas Pengajuan PBJ
                    </h2>
                    {/* Tabel Berkas Pengajuan PBJ Start */}
                    <table className="table border rounded-md border-primary/25 mt-3">
                        {/* head */}
                        <thead className="">
                            <tr className="text-sm ">
                                <th></th>
                                <th>Nama Berkas</th>
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
                                    {data.is_valid != null && data.is_valid ? (
                                        <td className="">
                                            <div className=" uppercase text-center rounded-lg p-1 bg-info text-slate-700 font-semibold text-xs ">
                                                Valid
                                            </div>
                                        </td>
                                    ) : (
                                        <td className="text-center">
                                            <div className="label-warning">
                                                Tidak Valid
                                            </div>
                                        </td>
                                    )}

                                    <td className="flex justify-center items-center gap-2  ">
                                        {!data.is_valid &&
                                        data.is_valid != null ? (
                                            <a
                                                href={`/storage/${data.path}`}
                                                target="_blank"
                                                className="action-btn"
                                            >
                                                <FaEye className="mr-2 mx-1" />{" "}
                                                Lihat
                                            </a>
                                        ) : (
                                            <a
                                                href={`/storage/${data.path}`}
                                                target="_blank"
                                                className="action-btn"
                                            >
                                                <MdEditDocument className="mr-2 mx-1" />
                                                Edit
                                            </a>
                                        )}

                                        {/* {pengajuan.status != "diproses" && (
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
                                        )} */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* Button */}
                    <div className="w-full mt-4 justify-end flex">
                        <button
                            type="submit"
                            className="button-correct uppercase"
                        >
                            Kirim Ulang
                            <IoIosSend />
                        </button>
                    </div>

                    <h2 className="text-base font-semibold  mt-2mt-2 ">
                        Berkas Berkas Pemesanan
                    </h2>
                    {/* Tabel Berkas Pemesanan */}
                    <table className="table border rounded-md border-primary/25 mt-3">
                        {/* head */}
                        <thead className="">
                            <tr className="text-sm ">
                                <th></th>
                                <th>Nama Berkas</th>
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
                                    {data.is_valid != null && data.is_valid ? (
                                        <td className="">
                                            <div className=" uppercase text-center rounded-lg p-1 bg-info text-slate-700 font-semibold text-xs ">
                                                Valid
                                            </div>
                                        </td>
                                    ) : (
                                        <td className="text-center">
                                            <div className="label-warning">
                                                Tidak Valid
                                            </div>
                                        </td>
                                    )}

                                    <td className="flex justify-center items-center gap-2  ">
                                        {!data.is_valid &&
                                        data.is_valid != null ? (
                                            <a
                                                href={`/storage/${data.path}`}
                                                target="_blank"
                                                className="action-btn"
                                            >
                                                <FaEye className="mr-2 mx-1" />{" "}
                                                Lihat
                                            </a>
                                        ) : (
                                            <a
                                                href={`/storage/${data.path}`}
                                                target="_blank"
                                                className="action-btn"
                                            >
                                                <MdEditDocument className="mr-2 mx-1" />
                                                Edit
                                            </a>
                                        )}

                                        {/* {pengajuan.status != "diproses" && (
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
                                        )} */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* Button */}
                    <div className="w-full mt-4 justify-end flex">
                        <button
                            type="submit"
                            className="button-correct uppercase"
                        >
                            Kirim Ulang
                            <IoIosSend />
                        </button>
                    </div>

                    <h2 className="text-base font-semibold mt-2">
                        Berkas Berita Acara
                    </h2>
                    {/* Tabel Berkas Berita Acara */}
                    <table className="table border rounded-md border-primary/25 mt-3">
                        {/* head */}
                        <thead className="">
                            <tr className="text-sm ">
                                <th></th>
                                <th>Nama Berkas</th>
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
                                    {data.is_valid != null && data.is_valid ? (
                                        <td className="">
                                            <div className=" uppercase text-center rounded-lg p-1 bg-info text-slate-700 font-semibold text-xs ">
                                                Valid
                                            </div>
                                        </td>
                                    ) : (
                                        <td className="text-center">
                                            <div className="label-warning">
                                                Tidak Valid
                                            </div>
                                        </td>
                                    )}

                                    <td className="flex justify-center items-center gap-2  ">
                                        {!data.is_valid &&
                                        data.is_valid != null ? (
                                            <a
                                                href={`/storage/${data.path}`}
                                                target="_blank"
                                                className="action-btn"
                                            >
                                                <FaEye className="mr-2 mx-1" />{" "}
                                                Lihat
                                            </a>
                                        ) : (
                                            <a
                                                href={`/storage/${data.path}`}
                                                target="_blank"
                                                className="action-btn"
                                            >
                                                <MdEditDocument className="mr-2 mx-1" />
                                                Edit
                                            </a>
                                        )}

                                        {/* {pengajuan.status != "diproses" && (
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
                                        )} */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* Button */}
                    <div className="w-full mt-4 justify-end flex">
                        <button
                            type="submit"
                            className="button-correct uppercase"
                        >
                            Kirim Ulang
                            <IoIosSend />
                        </button>
                    </div>

                    <h2 className="text-base font-semibold mt-2">
                        Berkas Kuitansi
                    </h2>
                    {/* Tabel Berkas Kuitansi */}
                    <table className="table border rounded-md border-primary/25 mt-3">
                        {/* head */}
                        <thead className="">
                            <tr className="text-sm ">
                                <th></th>
                                <th>Nama Berkas</th>
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
                                    {data.is_valid != null && data.is_valid ? (
                                        <td className="">
                                            <div className=" uppercase text-center rounded-lg p-1 bg-info text-slate-700 font-semibold text-xs ">
                                                Valid
                                            </div>
                                        </td>
                                    ) : (
                                        <td className="text-center">
                                            <div className="label-warning">
                                                Tidak Valid
                                            </div>
                                        </td>
                                    )}

                                    <td className="flex justify-center items-center gap-2  ">
                                        {!data.is_valid &&
                                        data.is_valid != null ? (
                                            <a
                                                href={`/storage/${data.path}`}
                                                target="_blank"
                                                className="action-btn"
                                            >
                                                <FaEye className="mr-2 mx-1" />{" "}
                                                Lihat
                                            </a>
                                        ) : (
                                            <a
                                                href={`/storage/${data.path}`}
                                                target="_blank"
                                                className="action-btn"
                                            >
                                                <MdEditDocument className="mr-2 mx-1" />
                                                Edit
                                            </a>
                                        )}

                                        {/* {pengajuan.status != "diproses" && (
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
                                        )} */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* Button */}
                    <div className="w-full mt-4 justify-end flex">
                        <button
                            type="submit"
                            className="button-correct uppercase"
                        >
                            Kirim Ulang
                            <IoIosSend />
                        </button>
                    </div>

                    <h2 className="text-base font-semibold mt-2">
                        Berkas Pembayaran
                    </h2>
                    {/* Tabel Berkas Pembayaran */}
                    <table className="table border rounded-md border-primary/25 mt-3">
                        {/* head */}
                        <thead className="">
                            <tr className="text-sm ">
                                <th></th>
                                <th>Nama Berkas</th>
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
                                    {data.is_valid != null && data.is_valid ? (
                                        <td className="">
                                            <div className=" uppercase text-center rounded-lg p-1 bg-info text-slate-700 font-semibold text-xs ">
                                                Valid
                                            </div>
                                        </td>
                                    ) : (
                                        <td className="text-center">
                                            <div className="label-warning">
                                                Tidak Valid
                                            </div>
                                        </td>
                                    )}

                                    <td className="flex justify-center items-center gap-2  ">
                                        {!data.is_valid &&
                                        data.is_valid != null ? (
                                            <a
                                                href={`/storage/${data.path}`}
                                                target="_blank"
                                                className="action-btn"
                                            >
                                                <FaEye className="mr-2 mx-1" />{" "}
                                                Lihat
                                            </a>
                                        ) : (
                                            <a
                                                href={`/storage/${data.path}`}
                                                target="_blank"
                                                className="action-btn"
                                            >
                                                <MdEditDocument className="mr-2 mx-1" />
                                                Edit
                                            </a>
                                        )}

                                        {/* {pengajuan.status != "diproses" && (
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
                                        )} */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* Button */}
                    <div className="w-full mt-4 justify-end flex">
                        <button
                            type="submit"
                            className="button-correct uppercase"
                        >
                            Kirim Ulang
                            <IoIosSend />
                        </button>
                    </div>
                </div>
            </div>

            {/* end of content */}
        </AuthenticatedLayout>
    );
}
