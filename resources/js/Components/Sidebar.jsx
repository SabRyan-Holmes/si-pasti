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
        <div className="drawer-side shadow-2xl relative">
            <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

            {/* Smooth Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-gray-800 to-cyan-950 transform scale-110 rounded-tr-2xl rounded-br-2xl shadow-xl" />

            <ul className="menu p-4 w-80 min-h-full relative z-10 text-slate-100 space-y-4">
                {/* Sidebar content */}
                <div className="flex-col justify-center items-center mt-10 relative z-20">
                    {/* App Name */}
                    <strong className="flex justify-center text-2xl text-gradient gradient-bps">
                        SiPasti
                    </strong>

                    {/* App Logo */}
                    <img
                        src={logo}
                        className="w-24 h-24 m-3 mx-auto filter drop-shadow-lg relative z-20"
                    />
                </div>

                <div className="relative z-20 h-[2px] mx-3 border-none outline-none rounded-md">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary rounded-md via-hijau to-secondary p-0 opacity-100 h-full w-full transition-colors duration-1000 ease-in-out" />
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
                                route().current("ppk.show-berkas")
                            }
                            className="relative z-20"
                        >
                            <HiClipboardDocumentList />
                            Daftar Berkas
                        </NavLinkDashboard>

                        <NavLinkDashboard
                            href={route("ppk.riwayat-pengajuan")}
                            active={route().current("ppk.riwayat-pengajuan")}
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
                            href={route("pbj.riwayat_pengajuan")}
                            active={
                                route().current("pbj.riwayat_pengajuan") ||
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
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-900 to-transparent rounded-b-lg shadow-inner" />
        </div>
    );
}
