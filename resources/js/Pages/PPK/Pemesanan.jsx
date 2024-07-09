import React, { useState } from "react";
import Navbar from "@/Components/Navbar";
import { useForm, Link, Head } from "@inertiajs/react";
import AdminDrawer from "@/Components/AdminDrawer";
import { FaUserEdit } from "react-icons/fa";
import PrimaryButton from "@/Components/PrimaryButton";
import { FiEye } from "react-icons/fi";
import { IconContext } from "react-icons";
import { LuFileCheck2 } from "react-icons/lu";
import { AiFillCloseSquare } from "react-icons/ai";

export default function Pemesanan({ title, auth }) {
    const { data, setData, post, processing, errors } = useForm({
        nama_kegiatan: "",
        kak: null,
        form_permintaan: null,
        surat_permintaan: false,
    });
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
                    <Navbar user={auth.user} />
                    <div className="mx-6 mt-6 h-full bg-white">
                        {/* content */}
                        <div className="mx-24 ">
                            <div className="overflow-x-auto">
                                <table className="table table-zebra">
                                    {/* head */}
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Ketua Tim</th>
                                            <th>Kegiatan</th>
                                            <th>Tanggal Pengajuan</th>
                                            <th className="">Status</th>
                                            <th className="text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* row 1 */}
                                        <tr>
                                            <th>1</th>
                                            <td>Bababuy</td>
                                            <td>Seminar OJK</td>
                                            <td>05 Juli 2024</td>
                                            <td>
                                                <div className="w-24 text-center rounded-lg p-1 bg-info text-black font-bold">
                                                    diproses
                                                </div>
                                            </td>
                                            <td className="flex justify-center items-center ">
                                                {/* Button View */}
                                                <button
                                                    // onClick={() => {
                                                    //     openEditDialog(
                                                    //         data.id,
                                                    //         data.name,
                                                    //         data.nim,
                                                    //         data.email
                                                    //     );
                                                    // }}
                                                    className="bg-info px-8 scale-75 btn glass"
                                                >
                                                    <FiEye className="scale-[2.4] stroke-yellow-500"></FiEye>
                                                </button>

                                                {/* Button Edit */}
                                                <button
                                                    // onClick={() => {
                                                    //     openEditDialog(
                                                    //         data.id,
                                                    //         data.name,
                                                    //         data.nim,
                                                    //         data.email
                                                    //     );
                                                    // }}
                                                    className="bg-info  scale-75 btn glass"
                                                >
                                                    <IconContext.Provider
                                                        value={{
                                                            color: "#16a34a",
                                                            size: "50px",
                                                        }}
                                                    >
                                                        {/* <LuFileCheck2 /> */}
                                                        <LuFileCheck2 className="max-h-7" />
                                                    </IconContext.Provider>
                                                </button>

                                                {/* Button Tolak */}
                                                <button
                                                    // onClick={() => {
                                                    //     openEditDialog(
                                                    //         data.id,
                                                    //         data.name,
                                                    //         data.nim,
                                                    //         data.email
                                                    //     );
                                                    // }}
                                                    className="bg-info  scale-75 btn glass"
                                                >
                                                    <IconContext.Provider
                                                        value={{
                                                            color: "#FF0000",
                                                            size: "50px",
                                                        }}
                                                    >
                                                        {/* <LuFileCheck2 /> */}
                                                        <AiFillCloseSquare className="max-h-7" />
                                                    </IconContext.Provider>
                                                </button>
                                            </td>
                                        </tr>
                                        {/* row 2 */}
                                        <tr>
                                            <th>2</th>
                                            <td>Hart Hagerty</td>
                                            <td>Ospek</td>
                                            <td>07 Juli 2024</td>
                                            {/* Kalo Berhasil jadi bg-success/hijau */}
                                            <td>
                                                <div className="w-24 text-center rounded-lg p-1 bg-success/60 text-black font-bold">
                                                    Selesai
                                                </div>
                                            </td>
                                            <td></td>
                                        </tr>
                                        {/* row 3 */}
                                        <tr>
                                            <th>3</th>
                                            <td>Brice Swyre</td>
                                            <td>Upacara 17an</td>
                                            <td>9 Juli 2024</td>
                                            <td>
                                                <div className=" w-24 text-center rounded-lg p-1 bg-warning/60 text-black font-bold">
                                                    ditolak
                                                </div>
                                            </td>
                                            <td></td>
                                            {/* Kalo Berhasil jadi bg-success/hijau */}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* end of content */}
                    </div>
                </div>
                <AdminDrawer
                    active={route().current("ppk.show-berkas-kt")} divisi={auth.user.name}
                ></AdminDrawer>
            </div>
        </div>
    );
}
