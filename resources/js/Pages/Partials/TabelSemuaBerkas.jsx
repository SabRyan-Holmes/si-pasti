import React from "react";
import { FaDownload, FaEye } from "react-icons/fa6";

export default function TabelSemuaBerkas({ semuaBerkas }) {
    return (
        <table className="table my-20 mt-3 border rounded-md border-primary/25 table-bordered">
            {/* head */}
            <thead className="bg-secondary">
                <tr className="text-sm ">
                    <th width="5%"></th>
                    <th width="30%">Nama Berkas</th>
                    <th width="35%">Berkas</th>
                    <th width="15%" className="text-center">
                        Status
                    </th>
                    <th width="15%" className="text-center">
                        Keterangan
                    </th>
                </tr>
            </thead>
            <tbody>
                {semuaBerkas.map((berkas, i) => (
                    <tr key={i}>
                        <th className="text-primary">{i + 1}</th>
                        <td className="capitalize">{berkas.jenis_dokumen}</td>

                        <td className="text-sm capitalize">
                            <div className="relative group">
                                {berkas.nama ? (
                                    <>
                                        <a
                                            target="_blank"
                                            className="underline hover:text-primary text-primary decoration-primary"
                                        >
                                            {berkas.nama}.
                                            <span className="lowercase">
                                                {berkas.tipe_file}
                                            </span>
                                        </a>
                                        {/* Kontainer untuk tombol "Lihat" dan "Download" */}
                                        <div className="absolute flex justify-center gap-2 transition-opacity opacity-0 group-hover:opacity-100">
                                            {/* Tombol "Lihat" */}

                                            <a
                                                href={`/storage/${berkas.path}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-end justify-center h-8 font-medium text-center group/button action-btn text-hijau/75 border-hijau/20 hover:bg-hijau hover:text-white"
                                            >
                                                Lihat
                                                <FaEye className="mx-1 fill-hijau/75 group-hover/button:fill-white" />
                                            </a>

                                            {/* Tombol "Download" */}
                                            <a
                                                href={`/storage/${berkas.path}`}
                                                download={berkas.nama}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-end justify-center h-8 font-medium text-center group/button action-btn text-secondary/75 border-secondary/20 hover:bg-secondary hover:text-white"
                                            >
                                                Unduh
                                                <FaDownload className="mx-1 fill-secondary/75 group-hover/button:fill-white" />
                                            </a>
                                        </div>
                                    </>
                                ) : (
                                    <span className="text-center">-</span>
                                )}
                            </div>
                        </td>
                        <td className="p-1 text-center">
                            {berkas.is_valid === null && berkas.nama ? (
                                <div className="label-base bg-secondary/15">
                                    Diproses
                                </div>
                            ) : (
                                <span className="text-center">-</span>
                            )}

                            {berkas.is_valid == true && (
                                <div className="label-success">Valid</div>
                            )}

                            {berkas.is_valid == false && (
                                <div className="label-warning">Tidak Valid</div>
                            )}
                        </td>
                        <td className="w-full p-0 mx-auto ">
                            {berkas.nama ? (
                                <div className=" label-success">
                                    {pengajuan.status}
                                </div>
                            ) : (
                                <div className=" label-base bg-base-300 text-nowrap">
                                    Berkas tidak diajukan
                                </div>
                            )}
                        </td>
                    </tr>
                ))}
                <tr></tr>
            </tbody>
        </table>
    );
}
