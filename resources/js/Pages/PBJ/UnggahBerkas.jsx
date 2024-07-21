import React, { useState } from "react";
import Navbar from "@/Components/Navbar";
import { useForm, Link, Head } from "@inertiajs/react";
import AdminDrawer from "@/Components/AdminDrawer";

export default function UnggahBerkas({ title, auth }) {
    console.log(`isi route  : ${route}`);
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
                        <div className="text-xl font-bold">Unggah Berkas</div>
                        <div className="flex mt-3">
                            <div className="font-bold mr-5">
                                <p className="mb-2">Nama kegiatan</p>
                                <p>Ketua TIM</p>
                            </div>
                            <div className="">
                                <p className="mb-2">
                                    Sosialisasi keamanan data pad era
                                    meningkatnya kecerdasan buatan AI
                                </p>
                                <p>Sabrian Maulana</p>
                            </div>
                        </div>
                        <label className="form-control w-1/2 mt-5">
                            <div className="label">
                                <span className="label-text font-bold">
                                    Pilih Berkas yang ingin di unggah
                                </span>
                            </div>
                            <select className="select select-bordered">
                                <option disabled selected></option>
                                <option>Pengajuan PBJ</option>
                                <option>Kontrak</option>
                                <option>Berita Acara</option>
                                <option>Kuintansi</option>
                            </select>
                        </label>

                        <label className="form-control w-1/2 mt-8">
                            <div className="label">
                                <span className="label-text font-bold">SPPBJ (surat penetapan pemenang barang dan jasa)</span>
                            </div>
                            <input
                                type="file"
                                className="file-input file-input-bordered w-full"
                            />
                        </label>

                        <label className="form-control w-1/2">
                            <div className="label">
                                <span className="label-text font-bold">Surat Kontrak/surat pesanan</span>
                            </div>
                            <input
                                type="file"
                                className="file-input file-input-bordered w-full"
                            />
                        </label>
                        <div className="flex w-1/2 mt-5">
                            <button className="btn btn-success ml-auto">Kirim Berkas</button>
                        </div>
                        {/* end of content  */}
                    </div>
                </div>
                <AdminDrawer
                    divisi={auth.user.name}
                    active={route().current("dashboard")}
                ></AdminDrawer>
            </div>
        </div>
    );
}
