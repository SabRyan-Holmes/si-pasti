import { MdAdminPanelSettings } from "react-icons/md";
import { MdSpaceDashboard } from "react-icons/md";
import { FaNotesMedical } from "react-icons/fa6";
import { MdSwitchAccount } from "react-icons/md";
import { Link } from "@inertiajs/react";
import logo from "../../assets/image/logo.png";
import ApplicationLogo from "@/Components/ApplicationLogo";
import NavLinkDashboard from "@/Components/NavLinkDashboard";
import NavLinkCollapse from "./NavLinkCollapse";
import { CiViewTimeline } from "react-icons/ci";
import { GrOverview } from "react-icons/gr";
import { MdOutlineDocumentScanner } from "react-icons/md";
import { ImFolderUpload } from "react-icons/im";
import { MdOutlineEventAvailable } from "react-icons/md";
import { HiDocumentMagnifyingGlass } from "react-icons/hi2";
export default function Sidebar({ divisi, active }) {
    console.log(divisi);
    return (
        <section className="drawer-side shadow-2xl">
            <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
            <ul className="menu p-4 w-80 min-h-full bg-gradient-to-b text-opacity-75 from-slate-950 to bg-cyan-950  text-slate-100 ">
                {/* Sidebar content heres */}
                <div className="flex-col justify-center items-center mt-10">
                    {/* App Name */}
                    <strong className="flex justify-center text-2xl text-gradient gradient-bps">
                        SiPasti
                    </strong>
                    {/* App Logo */}
                    <img
                        src={logo}
                        className=" text-primary/70 w-24 h-24 m-3 mx-auto"
                    />
                </div>

                <div className="border-b-2 border-yellow-600 mt-4 mb-2 mx-3 " />

                {/* Link Dashboard */}
                <NavLinkDashboard
                    href={route("dashboard")}
                    active={route().current("dashboard")}
                >
                    <MdSpaceDashboard />
                    Dashboard
                </NavLinkDashboard>

                {divisi == "Ketua Tim" ? (
                    <section>
                        <NavLinkDashboard
                            href={route("ketua_tim.pengajuan")}
                            active={route().current("ketua_tim.pengajuan")}
                        >
                            <FaNotesMedical />
                            Pengajuan
                        </NavLinkDashboard>

                        <NavLinkDashboard
                            href={route("ketua_tim.riwayat_pengajuan")}
                            active={route().current(
                                "ketua_tim.riwayat_pengajuan"
                            )}
                        >
                            <MdSwitchAccount />
                            Riwayat Pengajuan
                        </NavLinkDashboard>
                    </section>
                ) : (
                    ""
                )}

                {divisi == "PPK" ? (
                    <section>
                        <NavLinkDashboard
                            href={route("ppk.daftar-berkas")}
                            active={
                                route().current("ppk.daftar-berkas") ||
                                route().current("pengajuan.show_pbj")
                            }
                        >
                            <HiDocumentMagnifyingGlass />
                            Daftar Berkas
                        </NavLinkDashboard>

                        {/* <NavLinkCollapse
                            // href={route("dashboard")}
                            // active={route().current("pengajuan.show_ketua_tim") || route().current("pengajuan.show_pbj") }
                            submenu={["Pengajuan PBJ", "Pemesanan", "Kuitansi"]}
                            routes={[
                                "ppk.unggah-pengajuan-pbj",
                                "ppk.unggah-pemesanan",
                                "ppk.unggah-kuitansi",
                            ]}
                        >
                            <ImFolderUpload />
                            Unggah Berkas
                        </NavLinkCollapse> */}

                        <NavLinkDashboard
                            href={route("ppk.riwayat_pengajuan")}
                            active={route().current("ppk.riwayat_pengajuan")}
                        >
                            <MdSwitchAccount />
                            Riwayat Pengajuan
                        </NavLinkDashboard>
                    </section>
                ) : (
                    ""
                )}

                {divisi == "PBJ" ? (
                    <section>
                        <NavLinkDashboard
                            href={route("pbj.daftar_berkas")}
                            active={route().current("pbj.daftar_berkas") || active == 'pbj.show-berkas'}
                        >
                            <HiDocumentMagnifyingGlass />
                            Daftar Berkas
                        </NavLinkDashboard>

                        <NavLinkDashboard
                            href={route("pbj.riwayat_pengajuan")}
                            active={route().current("pbj.riwayat_pengajuan")}
                        >
                            <MdSwitchAccount />
                            Riwayat Pengajuan
                        </NavLinkDashboard>
                    </section>
                ) : (
                    ""
                )}

                {divisi == "Keuangan" && (
                    <section>
                        <NavLinkDashboard
                            href={route("keuangan.riwayat_pengajuan")}
                            active={route().current(
                                "keuangan.riwayat_pengajuan"
                            )}
                        >
                            <MdSwitchAccount />
                            Riwayat Pengajuan
                        </NavLinkDashboard>
                    </section>
                )}
            </ul>
        </section>
    );
}
