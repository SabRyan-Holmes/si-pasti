import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import moment from "moment/min/moment-with-locales";
import {
    MdOutlineKeyboardDoubleArrowLeft,
    MdOutlineKeyboardDoubleArrowRight,
    MdPersonSearch,
} from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { TiArrowRight } from "react-icons/ti";
import { Link, router, useForm } from "@inertiajs/react";
import Swal from "sweetalert2";
import { InputLabel, PrimaryButton } from "@/Components";
import { HiDocumentSearch } from "react-icons/hi";

export default function RiwayatPengajuan({
    title,
    auth,
    pengajuans,
    search,
    byStatusReq: initialStatus,
    byStageReq: initialStage,
}) {
    moment.locale("id");

    const [byStatus, setByStatus] = useState(initialStatus || "");
    const [byStage, setByStage] = useState(initialStage || "");

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

    // useEffect(() => {
    //     if (byStatus) {
    //         router.get(
    //             route("ketua-tim.riwayat-pengajuan"),
    //             { byStatus, search },
    //             { replace: true, preserveState: true }
    //         );
    //     } else if (byStatus == "") {
    //         router.get(
    //             route("ketua-tim.riwayat-pengajuan"),
    //             {},
    //             { replace: true, preserveState: true }
    //         );
    //     }
    // }, [byStatus]);

    useEffect(() => {
        if (byStatus) {
            router.get(
                route("ketua-tim.riwayat-pengajuan"),
                { byStatus, search },
                { replace: true, preserveState: true }
            );
        }
    }, [byStatus, byStage, search]);

    const handleSearch = (e) => {
        e.preventDefault();
        const searchValue = e.target.search.value;

        router.get(
            route("ketua-tim.riwayat-pengajuan"),
            { byStatus, search: searchValue },
            { replace: true, preserveState: true }
        );
    };

    useEffect(() => {
        if (byStatus || byStage) {
            router.get(
                route("ketua-tim.riwayat-pengajuan"),
                { byStatus, byStage, search },
                { replace: true, preserveState: true }
            );
        } else if (byStatus == "" && byStage == "") {
            router.get(
                route("ketua-tim.riwayat-pengajuan"),
                {},
                { replace: true, preserveState: true }
            );
        }
    }, [byStatus, byStage]);

    return (
        <AuthenticatedLayout user={auth.user} title={title}>
            {/* content */}

            <section className="phone:h-screen laptop:h-full max-w-screen-laptop mx-auto px-7">

                {pengajuans.data.length || search || byStatus || byStage ? (
                    <>
                        <form
                            className="w-full flex justify-between items-center "
                            onSubmit={handleSearch}
                        >
                            <div className="flex gap-3 my-3 items-center  w-fit justify-start">
                                <div className="w-48">
                                    <InputLabel
                                        value="Status"
                                        Htmlfor="byStatus"
                                        className="max-w-sm text-lg  ml-1"
                                    />
                                    <select
                                        className="select w-full max-w-xs text-sm border capitalize border-gradient selection:text-accent  disabled:text-accent"
                                        name="byStatus"
                                        defaultValue={byStatus}
                                        onChange={(e) =>
                                            setByStatus(e.target.value)
                                        }
                                    >
                                        <option value="">Semua Status</option>
                                        <option>Diproses</option>
                                        <option>Selesai</option>
                                        <option>Ditolak</option>
                                    </select>
                                </div>

                                <div className="w-48">
                                    <InputLabel
                                        value="Stage"
                                        Htmlfor="byStage"
                                        className="max-w-sm text-lg  ml-1"
                                    />
                                    <select
                                        className="select w-full max-w-xs text-sm border capitalize border-gradient selection:text-accent  disabled:text-accent"
                                        name="byStage"
                                        defaultValue={byStage}
                                        onChange={(e) =>
                                            setByStage(e.target.value)
                                        }
                                    >
                                        <option value="">Semua Stage</option>
                                        <option>diajukan ketua tim </option>
                                        <option>diproses ppk</option>
                                        <option>dipesan pbj</option>
                                        <option>pesanan selesai</option>
                                        <option>pembayaran</option>
                                        <option>diproses keuangan</option>
                                        <option>selesai</option>
                                    </select>
                                </div>
                            </div>

                            <div className="w-96 ">
                                <InputLabel
                                    value="Nama Kegiatan"
                                    Htmlfor="search"
                                    className="max-w-sm text-lg ml-1"
                                />

                                <label
                                    htmlFor="search"
                                    className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                                >
                                    Search
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <HiDocumentSearch className="w-6 h-6 fill-primary" />
                                    </div>
                                    <input
                                        type="search"
                                        id="search"
                                        defaultValue={search}
                                        name="search"
                                        className="w-full p-4 py-[13px] pl-10 text-sm placeholder:text-accent text-gray-900 border border-gradient rounded-md placeholder:text-xs"
                                        placeholder="Cari nama ketua tim/nama kegiatan.."
                                    />
                                    <button
                                        type="submit"
                                        className="text-white bg-primary-darker absolute end-2 bottom-[6px] hover:bg-primary/85 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        Search
                                    </button>
                                </div>
                            </div>
                        </form>
                        <div className="overflow-auto pt-3 rounded-xl ">
                            <table className="table-bordered text-xs table overflow-auto rounded-xl ">
                                <thead>
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
                                        <th className="text-center">Stage</th>
                                    </tr>
                                </thead>
                                <tbody className="border-secondary/15">
                                    {pengajuans.data?.map((data, i) => {
                                        const ketua_tim = data.created_by;
                                        return (
                                            <Link
                                                as="tr"
                                                href={route(
                                                    "ketua-tim.show-pengajuan",
                                                    data.id
                                                )}
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
                                                    {moment(
                                                        data.created_at
                                                    ).format("LL")}
                                                </td>
                                                <td className="text-center">
                                                    {data.status ==
                                                    "selesai" ? (
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
                                                    <div className="label-base bg-base-200 text-center ">
                                                        {data.status}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="label-base bg-base-200 text-center text-xs ">
                                                        {data.stage}
                                                    </div>
                                                </td>
                                            </Link>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="box-footer mb-8 text-sm">
                            <div className="sm:flex items-center justify-between">
                                <div className="flex items-center text-xs">
                                    showing {pengajuans.data.length} Entries{" "}
                                    <TiArrowRight className="w-5 h-5" />
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
                                                <span className="sr-only">
                                                    Next
                                                </span>
                                                <span aria-hidden="true">
                                                    Next
                                                </span>
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
                                                <span className="sr-only">
                                                    Prev
                                                </span>
                                                <span aria-hidden="true">
                                                    Prev
                                                </span>
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
                ) : (
                    <div className="flex justify-center items-center h-96 ">
                        <strong className="text-2xl my-auto">
                            Belum Ada Pengajuan Terbaru!!
                        </strong>
                    </div>
                )}
            </section>

            {/* end of content */}
        </AuthenticatedLayout>
    );
}
