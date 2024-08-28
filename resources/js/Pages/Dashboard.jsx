
import React, { useState } from "react";
import { IconContext } from "react-icons";
import { FaUserTie } from "react-icons/fa";
import { MdEvent } from "react-icons/md";
import { MdEventAvailable } from "react-icons/md";
import { HiDocumentDuplicate } from "react-icons/hi2";
import { MdEventRepeat } from "react-icons/md";
import { MdEventBusy } from "react-icons/md";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Graph from "./Partials/Graph";

export default function Dashboard({
    title,
    auth,
    userCount,
    documentCount,
    pengajuanCount,
    rejectedCount,
    doneCount,
    processCount,
    data,
}) {
    console.log(`isi route  : ${route}`);
    return (
        <AuthenticatedLayout user={auth.user} title={title}>
            {/* content */}
            <section className="flex items-center justify-center grid-cols-3 gap-5 px-5 mx-auto ">
                {/* Grid */}

                {/* Graph */}
                <section>
                    <Graph data={data} />
                </section>

                <section className="grid items-center justify-center grid-cols-2 my-auto gap-y-3 gap-x-5 ">
                    <div className="flex items-center overflow-hidden bg-white border shadow rounded-xl ">
                        <div className="p-4 bg-primary">
                            <IconContext.Provider
                                value={{ color: "white", size: "50px" }}
                            >
                                <MdEvent className="w-12 h-full" />
                            </IconContext.Provider>
                        </div>
                        <div className="px-4 text-gray-700">
                            <h3 className="text-sm tracking-wider">
                                Total Pengajuan Kegiatan
                            </h3>
                            <p className="text-3xl">{pengajuanCount}</p>
                        </div>
                    </div>
                    <div className="flex items-center overflow-hidden bg-white border shadow rounded-xl ">
                        <div className="p-4 bg-secondary">
                            <IconContext.Provider
                                value={{ color: "white", size: "50px" }}
                            >
                                <HiDocumentDuplicate className="w-12 h-full" />
                            </IconContext.Provider>
                        </div>
                        <div className="px-4 text-gray-700">
                            <h3 className="text-sm tracking-wider">
                                Total Jumlah Berkas
                            </h3>
                            <p className="text-3xl">{documentCount}</p>
                        </div>
                    </div>
                    <div className="flex items-center overflow-hidden bg-white border shadow rounded-xl ">
                        <div className="h-full p-4 bg-indigo-400">
                            <IconContext.Provider
                                value={{ color: "white", size: "50px" }}
                            >
                                <FaUserTie className="w-12 h-full" />
                            </IconContext.Provider>
                        </div>
                        <div className="px-4 text-gray-700">
                            <h3 className="text-sm tracking-wider">
                                Jumlah Pengguna
                            </h3>
                            <p className="text-3xl">{userCount}</p>
                        </div>
                    </div>

                    <div className="flex items-center overflow-hidden bg-white border shadow rounded-xl ">
                        <div className="p-4 bg-hijau">
                            <IconContext.Provider
                                value={{ color: "white", size: "50px" }}
                            >
                                <MdEventAvailable className="w-12 h-full" />
                            </IconContext.Provider>
                        </div>
                        <div className="px-4 text-gray-700">
                            <h3 className="text-sm tracking-wider">
                                Total Pengajuan yang Selesai
                            </h3>
                            <p className="text-3xl">{doneCount}</p>
                        </div>
                    </div>

                    <div className="flex items-center overflow-hidden bg-white border shadow rounded-xl ">
                        <div className="p-4 bg-info">
                            <IconContext.Provider
                                value={{ color: "white", size: "50px" }}
                            >
                                <MdEventRepeat className="w-12 h-full" />
                            </IconContext.Provider>
                        </div>
                        <div className="px-4 text-gray-700">
                            <h3 className="text-sm tracking-wider">
                                Total pengajuan masih diproses
                            </h3>
                            <p className="text-3xl">{processCount}</p>
                        </div>
                    </div>

                    <div className="flex items-center overflow-hidden bg-white border shadow rounded-xl ">
                        <div className="p-4 bg-warning/80">
                            <IconContext.Provider
                                value={{ color: "white", size: "50px" }}
                            >
                                <MdEventBusy className="w-12 h-full" />
                            </IconContext.Provider>
                        </div>
                        <div className="px-4 text-gray-700">
                            <h3 className="text-sm tracking-wider">
                                Total pengajuan yang tertolak
                            </h3>
                            <p className="text-3xl">{rejectedCount}</p>
                        </div>
                    </div>


                </section>

                {/* end of content */}
            </section>
        </AuthenticatedLayout>
    );
}
