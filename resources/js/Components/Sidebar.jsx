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

export default function Sidebar({ divisi, active }) {
    return (
        <div className="relative shadow-2xl drawer-side">
            <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

            {/* Smooth Gradient Background */}
            <div className="absolute inset-0 transform scale-110 shadow-xl bg-gradient-to-br from-slate-950 via-gray-800 to-cyan-950 rounded-tr-2xl rounded-br-2xl" />

            <ul className="relative z-10 min-h-full p-4 space-y-4 menu w-80 text-slate-100">
                {/* Sidebar content */}
                <div className="relative z-20 flex-col items-center justify-center mt-10">
                    {/* App Name */}
                    <strong className="flex justify-center text-2xl text-gradient gradient-bps">
                        SiPasti
                    </strong>

                    {/* App Logo */}
                    <img
                        src={logo}
                        className="relative z-20 w-24 h-24 m-3 mx-auto filter drop-shadow-lg"
                    />
                </div>

                <div className="relative z-20 h-[2px] mx-3 border-none outline-none rounded-md">
                    <div className="absolute inset-0 w-full h-full p-0 transition-colors duration-1000 ease-in-out rounded-md opacity-100 bg-gradient-to-r from-primary via-hijau to-secondary" />
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
                            active={route().current("ppk.riwayat-pengajuan") ||
                                route().current("ppk.show-pengajuan")}
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
                            href={route("keuangan.riwayat_pengajuan")}
                            active={route().current(
                                "keuangan.riwayat_pengajuan"
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
