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

const AdminDrawer = ({ divisi }) => {
    console.log(divisi);
    return (
        <div className="drawer-side  shadow-2xl">
            <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
            <ul className="menu p-4 w-72 min-h-full bg-gradient-to-b text-opacity-75 from-slate-950 to bg-cyan-950  text-slate-100 ">
                {/* Sidebar content here */}
                <div className="flex justify-center">
                    <img
                        src={logo}
                        className=" text-primary/70 w-24 h-24 m-3"
                    />
                </div>

                {/* <ApplicationLogo className="mx-16 " /> */}
                <div className="border-b-2 border-yellow-600 mt-4 mb-2" />

                {divisi == "Ketua Tim" ? (
                    <section>
                        <NavLinkDashboard
                            href={route("dashboard")}
                            active={route().current("dashboard")}
                        >
                            <MdSpaceDashboard />
                            Dashboard
                        </NavLinkDashboard>

                        <NavLinkDashboard
                            href={route("pengajuan.create")}
                            active={route().current("pengajuan.create")}
                        >
                            <FaNotesMedical />
                            Pengajuan
                        </NavLinkDashboard>

                        <NavLinkDashboard
                            href={route("pengajuan.index")}
                            active={route().current("pengajuan.index")}
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
                            href={route("dashboard")}
                            active={route().current("dashboard")}
                        >
                            <MdSpaceDashboard />
                            Dashboard
                        </NavLinkDashboard>

                        <NavLinkCollapse
                            href={route("dashboard")}
                            active={route().current("dashboard")}
                            submenu={['Ketua Tim', 'PBJ']}
                        >
                            <MdOutlineDocumentScanner />
                            Cek Berkas
                        </NavLinkCollapse>

                        {/* <ul className="menu bg-base-200 rounded-box w-56">

                            <li>
                                <details open>
                                    <summary> <MdOutlineDocumentScanner /> Parent</summary>
                                    <ul>
                                        <li>
                                            <a>Submenu 1</a>
                                        </li>
                                        <li>
                                            <a>Submenu 2</a>
                                        </li>

                                    </ul>
                                </details>
                            </li>

                        </ul> */}

                        {/* <NavLinkDashboard href={route('pengajuan.create')} active={route().current('pengajuan.create')}><FaNotesMedical />
              Cek Berkas
            </NavLinkDashboard>
              <ul className="inline-block menu menu-xs w-40 ml-12">
                <li>Ketua Tim</li>
                <li>PBJ</li>
              </ul> */}

                        <NavLinkDashboard
                            href={route("pengajuan.index")}
                            active={route().current("pengajuan.index")}
                        >
                            <MdSwitchAccount />
                            Riwayat Pengajuan
                        </NavLinkDashboard>
                    </section>
                ) : (
                    ""
                )}
            </ul>
        </div>
    );
};

export default AdminDrawer;
