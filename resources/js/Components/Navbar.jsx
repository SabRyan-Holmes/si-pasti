import { Link } from "@inertiajs/react";
import { BiSolidDownArrowAlt } from "react-icons/bi";
import ProfileImage from "./ProfileImage";
import { IoIosArrowDown } from "react-icons/io";

const Navbar = ({ user, title }) => {
    let admin = false;
    let name = "a";
    let loggedIn = false;
    if (user) {
        name = user.email;
        loggedIn = true;
    }

    if (name == "admin@admin.com") {
        admin = true;
    }

    let nameOnly = user.name.split(" / ")[0];
    const nameParts = user.name.split(" ");
    const first = nameParts[0];
    const second = nameParts.length > 1 ? nameParts[1] : "";
    const removeSlashes = (str) => str.replace(/\//g, "");

    const fullName = removeSlashes(first + " " + second);

    return (
        <div className="">
            <hr className="h-1 bg-base" />
            <div className="navbar bg-neutral text-neutral-content">
                <div className="flex-none">
                    <label
                        htmlFor="my-drawer-2"
                        className="btn btn-square btn-ghost lg:hidden"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block w-5 h-5 stroke-current"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            ></path>
                        </svg>
                    </label>
                </div>
                <div className="navbar-start">
                    <button>
                        <a className="text-2xl normal-case btn btn-ghost">
                            {title}
                        </a>
                    </button>
                </div>
                <div className="navbar-end">
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="">
                            {!user ? (
                                <button className="mr-8 btn btn-ghost">
                                    Login / Register
                                </button>
                            ) : (
                                <div className="flex items-center justify-end gap-2 p-2 transition-all group/item w-60 hover:shadow-md hover:bg-base-100/10 rounded-xl hover:cursor-pointer">
                                    <div className="mr-1 font-semibold text-nowrap">
                                        <span className="block text-sm text-slate-600 ">
                                            {fullName}
                                        </span>
                                        <span
                                            className={
                                                "block text-xs text-right " +
                                                (user.divisi == "Ketua Tim"
                                                    ? "text-primary"
                                                    : "text-secondary")
                                            }
                                        >
                                            {user.divisi}
                                        </span>
                                    </div>
                                    {user.profile ? (
                                        <img
                                            src={user.profile}
                                            alt="pp"
                                            className="w-6 h-6 rounded-full avatar"
                                        />
                                    ) : (
                                        <ProfileImage name={fullName} />
                                    )}
                                    <IoIosArrowDown className="w-5 h-5 fill-slate-500 group-hover/item:fill-secondary/60" />
                                </div>
                            )}
                            {/* <button className="mr-8 btn btn-ghost">Logged In as {user.divisi} <BiSolidDownArrowAlt size="1.5em"></BiSolidDownArrowAlt></button> */}
                        </label>

                        <ul
                            tabIndex={0}
                            className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-neutral rounded-box w-52 z-[50] relative text-black"
                        >
                            <>
                                <li>
                                    <Link href="/home">Homepage</Link>
                                </li>
                                <li>
                                    <Link href={route("profile.edit")}>
                                        Edit Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                    >
                                        Logout
                                    </Link>
                                </li>
                            </>
                        </ul>
                    </div>
                </div>
            </div>
            <hr className="h-1 bg-base" />
        </div>
    );
};

export default Navbar;
