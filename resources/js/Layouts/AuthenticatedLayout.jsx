import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, Head } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import AdminDrawer from "@/Components/AdminDrawer";

export default function Authenticated({ user, title, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

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
                    <Navbar user={user} />
                    <div className="mx-6 mt-6 h-full bg-white">
                        <main>{children}</main>
                    </div>
                </div>
                <AdminDrawer
                    active={route().current("pengajuan.index")}
                    divisi={user.name}
                ></AdminDrawer>
            </div>
        </div>
    );
}
