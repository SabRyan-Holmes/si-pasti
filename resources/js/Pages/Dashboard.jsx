import React, { useState } from "react";
import Navbar from "@/Components/Navbar";
import { Link, Head } from "@inertiajs/react";
import AdminDrawer from "@/Components/AdminDrawer";
import { IconContext } from "react-icons";
import { FaUserTie } from "react-icons/fa";
import { MdEvent } from "react-icons/md";
import { MdEventAvailable } from "react-icons/md";
import { HiDocumentDuplicate } from "react-icons/hi2";
import { MdEventRepeat } from "react-icons/md";
import { MdEventBusy } from "react-icons/md";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function AdminPage({
    title,
    auth,
    userCount,
    kegiatanCount,
    documentCount,
    processCount,
}) {
    console.log(`isi route  : ${route}`);
    return (
        <AuthenticatedLayout user={auth.user} title={title}>
            {/* content */}
            <div class="grid bg-white grid-cols-1 gap-4 px-4 mt-8 sm:grid-cols-3 sm:px-8">
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
                            Total Jumlah Dokumen
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
                        <h3 class="text-sm tracking-wider">Jumlah Divisi</h3>
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
                            Total Semua Proses Terverifikasi
                        </h3>
                        <p class="text-3xl">{processCount}</p>
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
                            Total Semua Proses Belum Terverifikasi
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
                        <p class="text-3xl">{processCount}</p>
                    </div>
                </div>
            </div>
            {/* end of content               */}
        </AuthenticatedLayout>
    );
}
