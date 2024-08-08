import React, { useState } from "react";
import Navbar from "@/Components/Navbar";
import { useForm, Link, Head } from "@inertiajs/react";
import AdminDrawer from "@/Components/AdminDrawer";

export default function CekBerkas({ title, auth }) {
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
                        <div className="text-xl font-bold">Cek Berkas</div>
                        <div className="flex mt-7">
                            <div className="font-bold mr-5">
                                <p className="mb-2">Nama kegiatan</p>
                                <p className="mb-2">Ketua TIM</p>
                                <p>Pengajuan Berkas</p>
                            </div>
                            <div className="">
                                <p className="mb-2">
                                    Sosialisasi keamanan data pad era
                                    meningkatnya kecerdasan buatan AI
                                </p>
                                <p className="mb-2">Sabrian Maulana</p>
                                <p>01 Maret 2024</p>
                            </div>
                        </div>

                        <div className="font-bold mt-7 mb-2">Berkas Pengajuan PBJ</div>
                        <div className="w-11/12 rounded-md border ">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Nama Berkas</th>
                                        <th>Berkas</th>
                                        <th>Aksi</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row 1 */}
                                    <tr className="hover">
                                        <th>1</th>
                                        <td>Rancangan Kontrak</td>
                                        <td>dokumen.pdf</td>
                                        <td>
                                            <div className="flex">
                                                <div className="bg-[#B3B3B3] text-center rounded-md font-bold cursor-pointer px-2 py-1 mr-2">Lihat</div>
                                                <div className="bg-[#B3B3B3] text-center rounded-md font-bold cursor-pointer px-2 py-1">Unduh</div>

                                            </div>
                                        </td>
                                        <td><div className="bg-[#B3B3B3] text-center rounded-md font-bold cursor-pointer">Pilih status</div></td>
                                    </tr>
                                    {/* row 2 */}
                                    <tr className="hover">
                                        <th>2</th>
                                        <td>Spekteknis</td>
                                        <td>dokumen.pdf</td>
                                        <td>                                            <div className="flex">
                                                <div className="bg-[#B3B3B3] text-center rounded-md font-bold cursor-pointer px-2 py-1 mr-2">Lihat</div>
                                                <div className="bg-[#B3B3B3] text-center rounded-md font-bold cursor-pointer px-2 py-1">Unduh</div>

                                            </div></td>
                                        <td><div className="bg-[#ADE1A8] text-center rounded-md font-bold">Valid</div></td>
                                    </tr>

                                    <tr className="hover">
                                        <th>3</th>
                                        <td>RAB/HPS</td>
                                        <td>dokumen.pdf</td>
                                        <td>                                            <div className="flex">
                                                <div className="bg-[#B3B3B3] text-center rounded-md font-bold cursor-pointer px-2 py-1 mr-2">Lihat</div>
                                                <div className="bg-[#B3B3B3] text-center rounded-md font-bold cursor-pointer px-2 py-1">Unduh</div>

                                            </div></td>
                                        <td><div className="bg-warning/60 text-center rounded-md font-bold">Tidak Valid</div></td>
                                    </tr>

                                    <tr className="hover">
                                        <th>4</th>
                                        <td>Surat Penunjukan Penjabat 
                                        Pengadaan </td>
                                        <td>dokumen.pdf</td>
                                        <td>                                            <div className="flex">
                                                <div className="bg-[#B3B3B3] text-center rounded-md font-bold cursor-pointer px-2 py-1 mr-2">Lihat</div>
                                                <div className="bg-[#B3B3B3] text-center rounded-md font-bold cursor-pointer px-2 py-1">Unduh</div>

                                            </div></td>
                                        <td><div className="bg-[#ADE1A8] text-center rounded-md font-bold">Valid</div></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="font-bold mt-7 mb-2">Berkas Pemesanan</div>
                        <div className="w-11/12 rounded-md border ">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Nama Berkas</th>
                                        <th>Berkas</th>
                                        <th>Aksi</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row 1 */}
                                    <tr className="hover">
                                        <th>1</th>
                                        <td>Surat Penetapan Pemenang 
                                        Barang dan Jasa (SPPBJ)</td>
                                        <td>dokumen.pdf</td>
                                        <td>
                                            <div className="flex">
                                                <div className="bg-[#B3B3B3] text-center rounded-md font-bold cursor-pointer px-2 py-1 mr-2">Lihat</div>
                                                <div className="bg-[#B3B3B3] text-center rounded-md font-bold cursor-pointer px-2 py-1">Unduh</div>

                                            </div>
                                        </td>
                                        <td><div className="bg-[#B3B3B3] text-center rounded-md font-bold cursor-pointer">Pilih status</div></td>
                                    </tr>
                                    {/* row 2 */}
                                    <tr className="hover">
                                        <th>2</th>
                                        <td>Surat Kontrak / Surat Pesanan</td>
                                        <td>dokumen.pdf</td>
                                        <td>                                            <div className="flex">
                                                <div className="bg-[#B3B3B3] text-center rounded-md font-bold cursor-pointer px-2 py-1 mr-2">Lihat</div>
                                                <div className="bg-[#B3B3B3] text-center rounded-md font-bold cursor-pointer px-2 py-1">Unduh</div>

                                            </div></td>
                                        <td><div className="bg-[#ADE1A8] text-center rounded-md font-bold">Valid</div></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="font-bold mt-7 mb-2">Berkas Berita Acara</div>
                        <div className="w-11/12 rounded-md border ">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Nama Berkas</th>
                                        <th>Berkas</th>
                                        <th>Aksi</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row 1 */}
                                    <tr className="hover">
                                        <th>1</th>
                                        <td>Berita Acara Serah Terima (BAST)</td>
                                        <td>dokumen.pdf</td>
                                        <td>
                                            <div className="flex">
                                                <div className="bg-[#B3B3B3] text-center rounded-md font-bold cursor-pointer px-2 py-1 mr-2">Lihat</div>
                                                <div className="bg-[#B3B3B3] text-center rounded-md font-bold cursor-pointer px-2 py-1">Unduh</div>

                                            </div>
                                        </td>
                                        <td><div className="bg-[#B3B3B3] text-center rounded-md font-bold cursor-pointer">Pilih status</div></td>
                                    </tr>
                                    {/* row 2 */}
                                    <tr className="hover">
                                        <th>2</th>
                                        <td>Berita Acara Pembayaran (BAP)</td>
                                        <td>dokumen.pdf</td>
                                        <td>                                            <div className="flex">
                                                <div className="bg-[#B3B3B3] text-center rounded-md font-bold cursor-pointer px-2 py-1 mr-2">Lihat</div>
                                                <div className="bg-[#B3B3B3] text-center rounded-md font-bold cursor-pointer px-2 py-1">Unduh</div>

                                            </div></td>
                                        <td><div className="bg-[#ADE1A8] text-center rounded-md font-bold">Valid</div></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="font-bold mt-7 mb-2">Berkas Kuintansi</div>
                        <div className="w-11/12 rounded-md border ">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Nama Berkas</th>
                                        <th>Berkas</th>
                                        <th>Aksi</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row 1 */}
                                    <tr className="hover">
                                        <th>1</th>
                                        <td>Kuintasnsi</td>
                                        <td>dokumen.pdf</td>
                                        <td>
                                            <div className="flex">
                                                <div className="bg-[#B3B3B3] text-center rounded-md font-bold cursor-pointer px-2 py-1 mr-2">Lihat</div>
                                                <div className="bg-[#B3B3B3] text-center rounded-md font-bold cursor-pointer px-2 py-1">Unduh</div>

                                            </div>
                                        </td>
                                        <td><div className="bg-[#B3B3B3] text-center rounded-md font-bold cursor-pointer">Pilih status</div></td>
                                    </tr>
                                    {/* row 2 */}
                                    <tr className="hover">
                                        <th>2</th>
                                        <td>Surat Pesanan</td>
                                        <td>dokumen.pdf</td>
                                        <td>                                            <div className="flex">
                                                <div className="bg-[#B3B3B3] text-center rounded-md font-bold cursor-pointer px-2 py-1 mr-2">Lihat</div>
                                                <div className="bg-[#B3B3B3] text-center rounded-md font-bold cursor-pointer px-2 py-1">Unduh</div>

                                            </div></td>
                                        <td><div className="bg-[#ADE1A8] text-center rounded-md font-bold">Valid</div></td>
                                    </tr>


                                </tbody>
                            </table>
                        </div>

                        <div className="font-bold mt-7 mb-2">Berkas Pembayaran</div>
                        <div className="w-11/12 rounded-md border ">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Nama Berkas</th>
                                        <th>Berkas</th>
                                        <th>Aksi</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row 1 */}
                                    <tr className="hover">
                                        <th>1</th>
                                        <td>SPM</td>
                                        <td>dokumen.pdf</td>
                                        <td>
                                            <div className="flex">
                                                <div className="bg-[#B3B3B3] text-center rounded-md font-bold cursor-pointer px-2 py-1 mr-2">Lihat</div>
                                                <div className="bg-[#B3B3B3] text-center rounded-md font-bold cursor-pointer px-2 py-1">Unduh</div>

                                            </div>
                                        </td>
                                        <td><div className="bg-[#B3B3B3] text-center rounded-md font-bold cursor-pointer">Pilih status</div></td>
                                    </tr>
                                </tbody>
                            </table>
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
