import React, { useEffect, useState } from "react";
import { useForm, Link, Head, usePage, router } from "@inertiajs/react";
import { FaDownload, FaEye } from "react-icons/fa6";
import { MdEditDocument } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { Dropdown } from "@/Components";

export default function TabelBerkas({ daftarBerkas, pengajuan, validasiLink }) {
    const [uploadedFiles, setUploadedFiles] = useState({});

    return (
        <table className="table mt-3 border rounded-md border-primary/25 table-bordered">
            {/* head */}
            <thead className="bg-secondary">
                <tr className="text-sm ">
                    <th width="5%"></th>
                    <th width="30%">Nama Berkas</th>
                    <th width="35%">Berkas</th>
                    <th width="15%" className="text-center">
                        Status Saat Ini
                    </th>
                    <th width="15%" className="text-center">
                        Aksi
                    </th>
                </tr>
            </thead>
            <tbody>
                {daftarBerkas.map((data, i) => (
                    <tr key={i}>
                        <th className="text-primary">{i + 1}</th>
                        <td className="capitalize">{data.jenis_dokumen}</td>
                        {data.nama ? (
                            <>
                                <td className="text-sm capitalize">
                                    <div className="relative group">
                                        <a
                                            href={`/storage/${data.path}`}
                                            target="_blank"
                                            className="underline hover:text-primary text-primary decoration-primary"
                                        >
                                            {data.nama}.
                                            <span className="lowercase">
                                                {data.tipe_file}
                                            </span>
                                        </a>

                                        {/* Kontainer untuk tombol "Lihat" dan "Download" */}
                                        <div className="absolute flex justify-center gap-2 transition-opacity opacity-0 group-hover:opacity-100">
                                            {/* Tombol "Lihat" */}

                                            <a
                                                href={`/storage/${data.path}`}
                                                target="_blank"
                                                className="flex items-end justify-center h-8 font-medium text-center group/button action-btn text-hijau/75 border-hijau/20 hover:bg-hijau hover:text-white"
                                            >
                                                Lihat
                                                <FaEye className="mx-1 fill-hijau/75 group-hover/button:fill-white" />
                                            </a>

                                            {/* Tombol "Download" */}
                                            <a
                                                href={`/storage/${data.path}`}
                                                download={data.nama}
                                                target="_blank"
                                                className="flex items-end justify-center h-8 font-medium text-center group/button action-btn text-secondary/75 border-secondary/20 hover:bg-secondary hover:text-white"
                                            >
                                                Unduh
                                                <FaDownload className="mx-1 fill-secondary/75 group-hover/button:fill-white" />
                                            </a>
                                        </div>
                                    </div>
                                </td>

                                <td className="text-center">
                                    {data.is_valid === null && (
                                        <div className="label-base bg-secondary/15">
                                            Diproses
                                        </div>
                                    )}

                                    {data.is_valid == true && (
                                        <div className="label-success">
                                            Valid
                                        </div>
                                    )}

                                    {data.is_valid == false && (
                                        <div className="label-warning">
                                            Tidak Valid
                                        </div>
                                    )}
                                </td>

                                <td className="text-center">
                                    <div className="inline-flex items-center gap-2">
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <span className="inline-flex rounded-md text-nowrap">
                                                    <button
                                                        type="button"
                                                        className="inline-flex items-center py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out bg-white border border-transparent rounded-md group/button hover:text-secondary hover:text-gray-700 focus:outline-none"
                                                    >
                                                        <span>
                                                            Pilih Status
                                                        </span>
                                                        <IoIosArrowDown className="w-5 h-5 fill-slate-500 group-hover/button:fill-secondary/60" />
                                                    </button>
                                                </span>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link
                                                    as="button"
                                                    method="post"
                                                    href={validasiLink}
                                                    data={{
                                                        id: data.id,
                                                        is_valid: true,
                                                        pengajuan_id:
                                                            pengajuan.id,
                                                    }}
                                                >
                                                    <span className="text-hijau">
                                                        Valid
                                                    </span>
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    as="button"
                                                    method="post"
                                                    href={validasiLink}
                                                    data={{
                                                        id: data.id,
                                                        is_valid: false,
                                                        pengajuan_id:
                                                            pengajuan.id,
                                                    }}
                                                >
                                                    <span className="text-error">
                                                        Tidak Valid
                                                    </span>
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </div>
                                </td>
                            </>
                        ) : (
                            <>
                                {/* Kalo Belum Diupload Sama seklai */}

                                <td
                                    colSpan={2}
                                    className="text-center cursor-not-allowed"
                                >
                                    <div className="label-base bg-base-200">
                                        Berkas Belum Diajukan
                                    </div>
                                </td>
                                <td className="text-center">
                                    <div className="inline-flex items-center">
                                        <Dropdown disabled>
                                            <Dropdown.Trigger>
                                                <span className="inline-flex rounded-md hover:cursor-not-allowed">
                                                    <button
                                                        type="button"
                                                        className="z-auto inline-flex items-center py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out bg-white border border-transparent rounded-md hover:cursor-not-allowed hover:text-gray-700 focus:outline-none"
                                                    >
                                                        Pilih Status
                                                        <IoIosArrowDown className="w-5 h-5 fill-slate-500 group-hover/item:fill-secondary/60" />
                                                    </button>
                                                </span>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link disabled={true}>
                                                    Valid
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    disabled={true}
                                                >
                                                    Tidak Valid
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </div>
                                </td>
                            </>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
