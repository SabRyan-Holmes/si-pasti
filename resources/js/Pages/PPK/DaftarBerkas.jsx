import React, { useState } from "react";
import Navbar from "@/Components/Navbar";
import { Link, Head } from "@inertiajs/react";
import { FiEye } from "react-icons/fi";
import moment from "moment/min/moment-with-locales";
import { RiFolderUploadFill } from "react-icons/ri";
import { Sidebar } from "@/Components";

export default function DaftarBerkas({ title, auth, pengajuans }) {
    moment.locale("id");


    console.log("current route : ", route().current());
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
                            {/* Breadcumbs */}
                            <div className="breadcrumbs my-3 text-sm">
                                <ul>
                                    <li>
                                        <a>
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
                                        <a></a>
                                    </li>
                                </ul>
                            </div>
                            <div className="my-10 overflow-x-auto">
                                <table className="table ">
                                    {/* head */}
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Ketua Tim</th>
                                            <th>Kegiatan</th>
                                            <th>Tanggal Pengajuan</th>
                                            <th className="text-center">
                                                Status
                                            </th>
                                            <th className="text-center">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* row 1 */}
                                        {pengajuans.map((pengajuan, i) => {
                                            let kegiatan = pengajuan.kegiatan;
                                            let ketua_tim = kegiatan.user;

                                            return (
                                                <tr>
                                                    <th>{pengajuan.id}</th>
                                                    <td>
                                                        Namas {ketua_tim.name}
                                                    </td>
                                                    <td>
                                                        {kegiatan.nama_kegiatan}
                                                    </td>
                                                    <td>
                                                        {moment(
                                                            pengajuan.start_date
                                                        ).format("LL")}
                                                    </td>
                                                    <td>
                                                        {pengajuan.status ==
                                                            "diproses" && (
                                                            <div className="label-base bg-base-200 ">
                                                                {
                                                                    pengajuan.status
                                                                }
                                                            </div>
                                                        )}

                                                        {pengajuan.status ==
                                                            "selesai" && (
                                                            <div className="uppercase text-center rounded-lg p-1 bg-success/70 text-slate-700 font-semibold text-xs ">
                                                                {
                                                                    pengajuan.status
                                                                }
                                                            </div>
                                                        )}

                                                        {pengajuan.status ==
                                                            "ditolak" && (
                                                            <div className="uppercase text-center rounded-lg p-1 bg-warning/70 text-slate-700 font-semibold text-xs ">
                                                                {
                                                                    pengajuan.status
                                                                }
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td className="flex justify-around items-center gap-3 ">
                                                        {/* Button View */}
                                                        <Link
                                                            href={route(
                                                                "ppk.show-berkas-kt",
                                                                pengajuan.id
                                                            )}
                                                            className=" action-btn bg-success/5 scale-125 border-success/50"
                                                        >
                                                            <span className="text-xs font-medium text-slate-500 scale-[0.8] ">
                                                                Cek Berkas
                                                            </span>
                                                            <FiEye className="stroke-success" />
                                                        </Link>
                                                        {/* Button Upload */}
                                                        <Link
                                                            href={route(
                                                                "ppk.unggah-berkas",
                                                                pengajuan.id
                                                            )}
                                                            className=" action-btn scale-125 border-secondary/30 bg-secondary/5"
                                                        >
                                                            <span className="text-xs font-medium text-slate-500 scale-[0.8]">
                                                                Unggah{" "}
                                                            </span>
                                                            <RiFolderUploadFill className="fill-secondary/60" />
                                                        </Link>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* end of content */}
                    </div>
                </div>
                <Sidebar
                    active={route().current("ppk.show-berkas-kt")}
                    divisi={auth.user.name}
                ></Sidebar>
            </div>
        </div>
    );
}
