import {
    MdAdminPanelSettings,
    MdSpaceDashboard,
    MdSwitchAccount,
    MdOutlineEventAvailable,
    MdOutlineDocumentScanner,
} from "react-icons/md";
import { FaNotesMedical } from "react-icons/fa6";
import {
    HiDocumentPlus,
    HiDocumentDuplicate,
    HiDocumentMagnifyingGlass,
    HiClipboardDocumentList,
} from "react-icons/hi2";
import logo from "../../assets/image/logo.png";
import NavLinkDashboard from "@/Components/NavLinkDashboard";
import ApplicationLogo from "./ApplicationLogo";

export default function Sidebar({ divisi, active }) {
    return (
        <div className="relative shadow-2xl drawer-side">
            <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

            {/* Smooth Gradient Background */}
            <div className="absolute inset-0 transform scale-110 shadow-xl bg-gradient-to-br from-slate-950 via-gray-800 to-cyan-950 rounded-tr-2xl rounded-br-2xl" />

            <ul className="relative z-10 min-h-full p-4 space-y-4 menu w-80 text-slate-100">
                {/* Sidebar content */}
                <div className="flex items-center justify-start gap-2 mb-5">
                    <a href="/">
                        <ApplicationLogo className="mx-auto text-gray-500 fill-current w-7 h-7 aspect-square " />
                    </a>
                    <strong className="text-xs italic font-bold text-slate-400">
                        BPS Provinsi Jambi
                    </strong>
                </div>
                <div className="relative z-20 flex-col items-center justify-center mt-10 space-y-6">
                    {/* App Name */}
                    <strong className="flex justify-center -mb-3 text-3xl tracking-wider uppercase text-gradient gradient-base">
                        SIPASTI
                    </strong>

                    <div className="flex items-center justify-center h-16 mx-5 border rounded-xl bg-slate-400/50 border-t-primary/70 border-x-secondary/70 border-b-hijau/70">
                        <strong className="mx-5 text-lg font-semibold leading-6 text-center height text-slate-300 text-opacity-90 ">
                            Sistem Pengadaan Terintegrasi
                        </strong>
                    </div>

                    {/* <div className="relative z-20 h-[2px] mx-3 border-none outline-none rounded-md bg-slate-300 ">
                        <div className="absolute inset-0 w-full h-full p-0 transition-colors duration-1000 ease-in-out rounded-md opacity-100 bg-gradient-to-r from-primary/10 via-hijau/15 to-secondary/20" />
                    </div> */}
                    <div className="relative z-20 h-[2px] mx-3 border-none outline-none rounded-md bg-slate-300 ">
                        <div className="absolute inset-0 w-full h-full p-0 transition-colors duration-1000 ease-in-out rounded-md opacity-100 bg-gradient-to-r from-primary/40 via-hijau/40 to-secondary/40" />
                    </div>
                </div>

                {/* Link Dashboard */}
                <NavLinkDashboard
                    href={route("dashboard")}
                    active={route().current("dashboard")}
                    className="relative z-20 -mb-4"
                >
                    <MdSpaceDashboard />
                    Dashboard
                </NavLinkDashboard>

                {divisi === "Ketua Tim" && (
                    <section>
                        <NavLinkDashboard
                            href={route("ketua-tim.pengajuan")}
                            active={route().current("ketua-tim.pengajuan")}
                            className="relative z-20"
                        >
                            <HiDocumentPlus />
                            Buat Pengajuan
                        </NavLinkDashboard>

                        <NavLinkDashboard
                            href={route("ketua-tim.riwayat-pengajuan")}
                            active={
                                route().current(
                                    "ketua-tim.riwayat-pengajuan"
                                ) ||
                                active === "ketua-tim.show-pengajuan" ||
                                active === "pegawai.edit" ||
                                active === "pegawai.show"
                            }
                            className="relative z-20"
                        >
                            <HiDocumentDuplicate />
                            Riwayat Pengajuan
                        </NavLinkDashboard>
                    </section>
                )}

                {divisi === "PPK" && (
                    <section>
                        <NavLinkDashboard
                            href={route("ppk.daftar-berkas")}
                            active={
                                route().current("ppk.daftar-berkas") ||
                                route().current("ppk.show-berkas") ||
                                active === "ppk.unggah-berkas"
                            }
                            className="relative z-20"
                        >
                            <HiClipboardDocumentList />
                            Daftar Berkas
                        </NavLinkDashboard>

                        <NavLinkDashboard
                            href={route("ppk.riwayat-pengajuan")}
                            active={
                                route().current("ppk.riwayat-pengajuan") ||
                                route().current("ppk.show-pengajuan")
                            }
                            className="relative z-20"
                        >
                            <HiDocumentDuplicate />
                            Riwayat Pengajuan
                        </NavLinkDashboard>
                    </section>
                )}

                {divisi === "PBJ" && (
                    <section>
                        <NavLinkDashboard
                            href={route("pbj.daftar-berkas")}
                            active={
                                route().current("pbj.daftar-berkas") ||
                                active === "pbj.show-berkas"
                            }
                            className="relative z-20"
                        >
                            <HiClipboardDocumentList />
                            Daftar Berkas
                        </NavLinkDashboard>

                        <NavLinkDashboard
                            href={route("pbj.riwayat-pengajuan")}
                            active={
                                route().current("pbj.riwayat-pengajuan") ||
                                active === "pbj.show-pengajuan"
                            }
                            className="relative z-20"
                        >
                            <HiDocumentDuplicate />
                            Riwayat Pengajuan
                        </NavLinkDashboard>
                    </section>
                )}

                {divisi === "Keuangan" && (
                    <section>
                        <NavLinkDashboard
                            href={route("keuangan.daftar-berkas")}
                            active={
                                route().current("keuangan.daftar-berkas") ||
                                active === "keuangan.show-berkas"
                            }
                            className="relative z-20"
                        >
                            <HiClipboardDocumentList />
                            Daftar Berkas
                        </NavLinkDashboard>

                        <NavLinkDashboard
                            href={route("keuangan.riwayat-pengajuan")}
                            active={route().current(
                                "keuangan.riwayat-pengajuan" ||
                                active === "keuangan.show-pengajuan"
                            )}
                            className="relative z-20"
                        >
                            <HiDocumentDuplicate />
                            Riwayat Pengajuan
                        </NavLinkDashboard>
                    </section>
                )}
            </ul>

            {/* Decorative Bottom Shadow */}
            <div className="absolute inset-x-0 bottom-0 h-16 rounded-b-lg shadow-inner bg-gradient-to-t from-slate-900 to-transparent" />
        </div>
    );
}
