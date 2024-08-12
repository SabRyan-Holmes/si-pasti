import React, { useState } from "react";
import { IconContext } from "react-icons";
import { FaUserTie } from "react-icons/fa";
import { MdEvent } from "react-icons/md";
import { MdEventAvailable } from "react-icons/md";
import { HiDocumentDuplicate } from "react-icons/hi2";
import { MdEventRepeat } from "react-icons/md";
import { MdEventBusy } from "react-icons/md";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Dashboard({
    title,
    auth,
    userCount,
    kegiatanCount,
    documentCount,
    ketuaTimCount,
    divisiCount,
    processCount,
    rejectedCount,
    acceptedCount
}) {
    console.log(`isi route  : ${route}`);
    return (
        <AuthenticatedLayout user={auth.user} title={title}>
            {/* content */}
            <section class="grid bg-white grid-cols-1 gap-4 px-4 mt-8 sm:grid-cols-3 sm:px-8 capitalize">
                <div class="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                    <div class="p-4 bg-primary">
                        <IconContext.Provider
                            value={{ color: "white", size: "50px" }}
                        >
                            <MdEvent className="h-full w-12" />
                        </IconContext.Provider>
                    </div>
                    <div class="px-4 text-gray-700">
                        <h3 class="text-sm tracking-wider">
                            Total Pengajuan Kegiatan
                        </h3>
                        <p class="text-3xl">{kegiatanCount}</p>
                    </div>
                </div>
                <div class="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                    <div class="p-4 bg-secondary">
                        <IconContext.Provider
                            value={{ color: "white", size: "50px" }}
                        >
                            <HiDocumentDuplicate className="h-full w-12" />
                        </IconContext.Provider>
                    </div>
                    <div class="px-4 text-gray-700">
                        <h3 class="text-sm tracking-wider">
                            Total Jumlah Berkas
                        </h3>
                        <p class="text-3xl">{documentCount}</p>
                    </div>
                </div>
                <div class="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                    <div class="p-4 bg-indigo-400 h-full">
                        <IconContext.Provider
                            value={{ color: "white", size: "50px" }}
                        >
                            <FaUserTie className="h-full w-12" />
                        </IconContext.Provider>
                    </div>
                    <div class="px-4 text-gray-700">
                        <h3 class="text-sm tracking-wider">Jumlah Pengguna</h3>
                        <p class="text-3xl">{userCount}</p>
                    </div>
                </div>

                <div class="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                    <div class="p-4 bg-success">
                        <IconContext.Provider
                            value={{ color: "white", size: "50px" }}
                        >
                            <MdEventAvailable className="h-full w-12" />
                        </IconContext.Provider>
                    </div>
                    <div class="px-4 text-gray-700">
                        <h3 class="text-sm tracking-wider">
                            Total Pengajuan yang Selesai
                        </h3>
                        <p class="text-3xl">{acceptedCount}</p>
                    </div>
                </div>

                <div class="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                    <div class="p-4 bg-info">
                        <IconContext.Provider
                            value={{ color: "white", size: "50px" }}
                        >
                            <MdEventRepeat className="h-full w-12" />
                        </IconContext.Provider>
                    </div>
                    <div class="px-4 text-gray-700">
                        <h3 class="text-sm tracking-wider">
                            Total pengajuan masih diproses
                        </h3>
                        <p class="text-3xl">{processCount}</p>
                    </div>
                </div>

                <div class="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                    <div class="p-4 bg-warning/80">
                        <IconContext.Provider
                            value={{ color: "white", size: "50px" }}
                        >
                            <MdEventBusy className="h-full w-12" />
                        </IconContext.Provider>
                    </div>
                    <div class="px-4 text-gray-700">
                        <h3 class="text-sm tracking-wider">
                            Total pengajuan yang tertolak
                        </h3>
                        <p class="text-3xl">{rejectedCount}</p>
                    </div>
                </div>
            </section>
            {/* end of content               */}
        </AuthenticatedLayout>
    );
}
