import React, { useState } from "react";
import Navbar from "@/Components/Navbar";
import { useForm, Link, Head, router } from "@inertiajs/react";
import moment from "moment/min/moment-with-locales";
import { FiEye } from "react-icons/fi";
import { RiFolderUploadFill } from "react-icons/ri";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ReactPaginate from "react-paginate";
import { TiArrowRight, TiArrowLeft } from "react-icons/ti";
import { HiDocumentDuplicate } from "react-icons/hi2";
import { FaEye } from "react-icons/fa6";
import { FaRegFolder } from "react-icons/fa";

export default function DaftarBerkas({ title, auth, pengajuans }) {
    moment.locale("id");

    const handlePageClick = (event) => {
        const selectedPage = event.selected + 1;
        const newOffset = (selectedPage - 1) * pengajuans.per_page;

        router.get(
            route("ketua-tim.riwayat-pengajuan"),
            { page: selectedPage },
            {
                replace: true,
                preserveState: true,
                onSuccess: () => {
                    setItemOffset(newOffset);
                },
            }
        );
    };
    return (
        <AuthenticatedLayout user={auth.user} title={title}>
            <Head title={title} />
            {/* content */}
            <section className="max-w-screen-laptop mx-auto px-7 ">
                {/* Breadcumbs */}
                <div className="breadcrumbs my-3 text-sm">
                    <ul>
                        <li>
                            <a>
                                <FaRegFolder className="mr-2 w-4 h-4" />
                                Daftar Berkas
                            </a>
                        </li>
                        <li>
                            <a></a>
                        </li>
                    </ul>
                </div>

                {
                    pengajuans.data.length ?
                    <>
                       <div className="overflow-auto pt-3 rounded-xl ">
                    <table className="table-bordered text-xs table overflow-auto rounded-xl ">
                        <thead className="text-white font-medium text-sm bg-primary  rounded-xl border border-secondary/15">
                            <tr>
                                <th></th>
                                <th>Nama Ketua Tim</th>
                                <th>Name Kegiatan</th>
                                <th className="text-center">
                                    Tanggal Pengajuan
                                </th>
                                <th className="text-center">
                                    Tanggal Disetujui
                                </th>
                                <th className="text-center">Status</th>
                                <th className="text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="border-secondary/15">
                            {pengajuans.data?.map((data, i) => {
                                const ketua_tim = data.created_by;
                                return (
                                    <tr
                                        key={i}
                                        className="group/item hover:bg-secondary/50 hover:cursor-pointer"
                                    >
                                        <th>{i + 1}</th>
                                        <td className="capitalize">
                                            {ketua_tim.name}
                                        </td>
                                        <td className="capitalize">
                                            {data.nama_kegiatan}
                                        </td>
                                        <td className="text-center">
                                            {moment(data.created_at).format(
                                                "LL"
                                            )}
                                        </td>
                                        <td className="text-center">
                                            {data.status == "selesai" ? (
                                                <span>
                                                    {moment(
                                                        data.updated_at
                                                    ).format("LL")}
                                                </span>
                                            ) : (
                                                <span>_</span>
                                            )}
                                        </td>
                                        <td>
                                            <div className="label-base bg-base-200/70 text-center text-slate-500 ">
                                                {data.status}
                                            </div>
                                        </td>
                                        <td className="text-center whitespace-nowrap text-nowrap">
                                            <Link
                                                as="a"
                                                href={route(
                                                    "pbj.show-berkas",
                                                    data.id
                                                )}
                                                className="group/button inline-block  text-center font-medium group-hover/item:bg-hijau group-hover/item:text-white text-hijau/75  items-center justify-center gap-2 mx-auto action-btn border-hijau/20 hover:bg-hijau hover:text-white "
                                            >
                                                <span>Lihat</span>
                                                <FaEye className="fill-hijau/75 group-hover/item:fill-white" />
                                            </Link>
                                            <span className="inline-block mx-1"></span>
                                            <Link
                                                as="a"
                                                href={route(
                                                    "pbj.unggah-berkas",
                                                    data.id
                                                )}
                                                className="group/button inline-block text-center font-medium group-hover/item:bg-secondary group-hover/item:text-white text-secondary  items-center justify-center gap-2 mx-auto action-btn border-hijau/20 hover:bg-hijau hover:text-white"
                                            >
                                                <span>Unggah</span>
                                                <RiFolderUploadFill className="fill-secondary group-hover/item:fill-white" />
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="box-footer mb-8 text-sm">
                    <div className="sm:flex items-center justify-between">
                        <div className="flex items-center text-xs">
                            showing {pengajuans.data.length} Entries
                            <TiArrowRight className="5 h-5" />
                        </div>
                        <ReactPaginate
                            breakLabel={<span>...</span>}
                            nextLabel={
                                pengajuans.next_page_url && (
                                    <a
                                        className="group/next dark:text-white/70 border text-primary hover:text-white  py-1 px-2 leading-none inline-flex items-center gap-2 rounded-md hover:border hover:bg-primary/75 font-semibold border-primary"
                                        href={pengajuans.next_page_url}
                                        onClick={() => setNum(num + 1)}
                                    >
                                        <span className="sr-only">Next</span>
                                        <span aria-hidden="true">Next</span>
                                        <MdOutlineKeyboardDoubleArrowRight className="-ml-1 w-4 h-4 fill-primary group-hover/next:fill-white" />
                                    </a>
                                )
                            }
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={1}
                            pageCount={pengajuans.last_page}
                            previousLabel={
                                pengajuans.prev_page_url && (
                                    <a
                                        className="group/next dark:text-white/70 border text-primary hover:text-white  py-1 px-2 leading-none inline-flex items-center gap-2 rounded-md hover:border hover:bg-primary/75 font-semibold border-primary"
                                        href={pengajuans.next_page_url}
                                        onClick={() => setNum(num + 1)}
                                    >
                                        <MdOutlineKeyboardDoubleArrowLeft className="-mr-1 w-4 h-4 fill-primary group-hover/next:fill-white" />
                                        <span className="sr-only">Prev</span>
                                        <span aria-hidden="true">Prev</span>
                                    </a>
                                )
                            }
                            renderOnZeroPageCount={null}
                            containerClassName={
                                "flex items-center text-center justify-center mt-8 mb-4 gap-4 "
                            }
                            pageClassName="border border-solid border-primary text-center hover:bg-primary hover:text-base-100 w-6 h-6 flex items-center text-primary justify-center rounded-md"
                            activeClassName="bg-primary text-white"
                            className="justify-end flex gap-2"
                        />
                    </div>
                </div>
                    </>

                    :
                    <div className="flex justify-center items-center h-96 ">
                        <strong className="text-2xl my-auto"> Belum Ada Pengajuan Terbaru!!</strong>
                    </div>

                }

            </section>

            {/* end of content */}

            {/* <AdminDrawer
                    active={route().current("ppk.show-berkas")}
                    divisi={auth.user.name}
                ></AdminDrawer> */}
        </AuthenticatedLayout>
    );
}
