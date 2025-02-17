import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import moment from "moment/min/moment-with-locales";
import {
    MdOutlineKeyboardDoubleArrowLeft,
    MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";
import ReactPaginate from "react-paginate";
import { TiArrowRight } from "react-icons/ti";
import { Link, router } from "@inertiajs/react";
import { InputLabel } from "@/Components";
import { HiDocumentSearch } from "react-icons/hi";
import { IoDocumentTextOutline } from "react-icons/io5";
import noData from "@/../../resources/assets/image/no-data.jpg";

export default function RiwayatPengajuan({
    title,
    auth,
    pengajuans,
    searchReq: initialSearch,
    byStatusReq: initialStatus,
    byStageReq: initialStage,
}) {
    moment.locale("id");

    const [byStatus, setByStatus] = useState(initialStatus || "");
    const [byStage, setByStage] = useState(initialStage || "");
    const [search, setSearch] = useState(initialSearch || "");

    const handlePageClick = (event) => {
        const selectedPage = event.selected + 1;
        const newOffset = (selectedPage - 1) * pengajuans.per_page;

        router.get(
            route("riwayat-pengajuan"),
            { page: selectedPage, byStatus, byStage, search },
            {
                replace: true,
                preserveState: true,
                onSuccess: () => {
                    setItemOffset(newOffset);
                },
            }
        );
    };

    useEffect(() => {
        if (
            (byStatus && byStatus != initialStatus) ||
            (byStage && byStage != initialStage)
        ) {
            router.get(
                route("riwayat-pengajuan"),
                {
                    byStatus: byStatus,
                    byStage: byStage,
                },
                { replace: true, preserveState: true }
            );
        } else if (
            (byStatus &&
                byStatus != initialStatus &&
                search != initialSearch) ||
            (byStage && byStage != initialStage && search != initialSearch)
        ) {
            router.get(
                route("riwayat-pengajuan"),
                {
                    byStatus,
                    byStage,
                    search,
                },
                { replace: true, preserveState: true }
            );
        }
    }, [byStatus, byStage]);

    useEffect(() => {
        // Kalo semua
        if (byStatus == "Semua Kategori" && byStage == "Semua Kategori") {
            router.get(
                route("riwayat-pengajuan"),
                {
                    search,
                },
                { replace: true, preserveState: true }
            );
        } else if (byStatus == "Semua Kategori") {
            router.get(
                route("riwayat-pengajuan"),
                {
                    byStage,
                    search,
                },
                { replace: true, preserveState: true }
            );
        } else if (byStage == "Semua Kategori") {
            router.get(
                route("riwayat-pengajuan"),
                {
                    byStatus,
                    search,
                },
                { replace: true, preserveState: true }
            );
        } else if (search && search != initialSearch) {
            router.get(
                route("riwayat-pengajuan"),
                {
                    search,
                },
                { replace: true, preserveState: true }
            );
        }
    }, [byStatus, byStage]);

    let linkShowPengajuan;

    switch (auth.user.divisi) {
        case "Ketua Tim":
            linkShowPengajuan = "ketua-tim.show-pengajuan";
            break;
        case "PPK":
            linkShowPengajuan = "ppk.show-pengajuan";
            break;
        case "PBJ":
            linkShowPengajuan = "pbj.show-pengajuan";
            break;
        case "Keuangan":
            linkShowPengajuan = "keuangan.show-pengajuan";
            break;
    }

    return (
        <AuthenticatedLayout user={auth.user} title={title}>
            {/* content */}

            <section className="mx-auto phone:h-screen laptop:h-full max-w-screen-laptop">
                <div className="flex items-center justify-between ">
                    {/* Breadcumbs */}
                    <div className="my-3 text-sm capitalize breadcrumbs">
                        <ul>
                            <li>
                                <a href={route("riwayat-pengajuan")}>
                                    <IoDocumentTextOutline className="w-4 h-4 mr-2" />
                                    Riwayat Pengajuan
                                </a>
                            </li>
                            <li>
                                <a></a>
                            </li>
                        </ul>
                    </div>
                </div>

                {pengajuans.data.length || search || byStatus || byStage ? (
                    <>
                        <form className="flex items-center justify-between w-full ">
                            <div className="flex items-center justify-start gap-3 my-3 w-fit">
                                <div className="w-48">
                                    <InputLabel
                                        value="Status"
                                        Htmlfor="byStatus"
                                        className="max-w-sm ml-1 text-lg"
                                    />
                                    <select
                                        className="w-full max-w-xs text-sm capitalize border select border-gradient selection:text-accent disabled:text-accent"
                                        name="byStatus"
                                        defaultValue={byStatus}
                                        onChange={(e) =>
                                            setByStatus(e.target.value)
                                        }
                                    >
                                        <option>Semua Kategori</option>
                                        <option>Diproses</option>
                                        <option>Selesai</option>
                                        <option>Ditolak</option>
                                    </select>
                                </div>

                                <div className="w-48">
                                    <InputLabel
                                        value="Stage"
                                        Htmlfor="byStage"
                                        className="max-w-sm ml-1 text-lg"
                                    />
                                    <select
                                        className="w-full max-w-xs text-sm capitalize border select border-gradient selection:text-accent disabled:text-accent"
                                        name="byStage"
                                        defaultValue={byStage}
                                        onChange={(e) =>
                                            setByStage(e.target.value)
                                        }
                                    >
                                        <option>Semua Kategori</option>
                                        <option>diajukan ketua tim </option>
                                        <option>diproses ppk</option>
                                        <option>dipesan pbj</option>
                                        <option>pesanan selesai</option>
                                        <option>pembayaran</option>
                                        <option>selesai</option>
                                    </select>
                                </div>
                            </div>

                            <div className="w-[21rem]">
                                <InputLabel
                                    value="Nama Kegiatan/Ketua/Tim"
                                    Htmlfor="search"
                                    className="max-w-sm ml-1 text-lg"
                                />

                                <label
                                    htmlFor="search"
                                    className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                                >
                                    Search
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3">
                                        <HiDocumentSearch className="w-6 h-6 fill-primary" />
                                    </div>
                                    <input
                                        type="search"
                                        id="search"
                                        defaultValue={search}
                                        onSubmit={(e) =>
                                            setSearch(e.target.value)
                                        }
                                        name="search"
                                        className="w-full p-4 py-[13px] pl-10 text-sm placeholder:text-accent text-gray-900 border border-gradient rounded-md placeholder:text-xs"
                                        placeholder="Cari nama kegiatan/ketua/tim.."
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
                        <div className="pt-3 overflow-auto rounded-xl ">
                            <table className="table overflow-hidden text-xs table-bordered rounded-xl ">
                                <thead className="bg-primary">
                                    <tr>
                                        <th width="3%"></th>
                                        <th width="20%">Nama Ketua Tim</th>
                                        <th width="25%">Name Kegiatan</th>
                                        <th width="10%" className="text-center">
                                            Tanggal Pengajuan
                                        </th>
                                        <th width="10%" className="text-center">
                                            Tanggal Selesai
                                        </th>
                                        <th className="text-center">Status</th>
                                        <th className="text-center">Stage</th>
                                    </tr>
                                </thead>
                                <tbody className="border-secondary/15 text-slate-600">
                                    {pengajuans.data?.map((data, i) => {
                                        const ketua_tim = data.created_by;
                                        let name =
                                            ketua_tim.name.split(" / ")[0];
                                        let gelar =
                                            ketua_tim.name.split(" / ")[1];

                                        return (
                                            <Link
                                                as="tr"
                                                href={route(
                                                    // Berdasarkan Link Divisi
                                                    linkShowPengajuan,
                                                    data.nama_kegiatan
                                                )}
                                                key={i}
                                                className="group/item hover:bg-secondary/40 hover:cursor-pointer"
                                            >
                                                <th className="text-base">
                                                    {i + 1}
                                                </th>
                                                <td className="p-1 px-3">
                                                    <div className="flex-row items-center gap-3">
                                                        <span className="text-sm font-bold">
                                                            {name} {gelar}
                                                        </span>
                                                        <span className="block text-xs opacity-50 ">
                                                            {data.nama_tim}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="p-1 px-3 text-sm font-medium capitalize">
                                                    {data.nama_kegiatan}
                                                </td>
                                                <td className="p-1 text-sm text-center">
                                                    {moment(
                                                        data.start_date
                                                    ).format("LL")}
                                                </td>
                                                <td className="p-1 font-medium text-center">
                                                    {data.status ==
                                                    "selesai" ? (
                                                        <span>
                                                            {moment(
                                                                data.end_date
                                                            ).format("LL")}
                                                        </span>
                                                    ) : (
                                                        <span>_</span>
                                                    )}
                                                </td>
                                                <td className="p-1">
                                                    {data.status ==
                                                        "diproses" && (
                                                        <div className="label-secondary group-hover/item:bg-secondary group-hover/item:text-white">
                                                            {data.status}
                                                        </div>
                                                    )}

                                                    {data.status ==
                                                        "selesai" && (
                                                        <div className="label-success group-hover/item:bg-success group-hover/item:text-white">
                                                            {data.status}
                                                        </div>
                                                    )}

                                                    {data.status ==
                                                        "ditolak" && (
                                                        <div className="label-warning group-hover/item:bg-warning group-hover/item:text-white">
                                                            {data.status}
                                                        </div>
                                                    )}
                                                </td>
                                                <td>
                                                    <div className="label-primary group-hover/item:bg-primary/80 group-hover/item:text-white">
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
                        <div className="mb-8 text-sm box-footer">
                            <div className="items-center justify-between sm:flex">
                                <div className="flex items-center text-xs">
                                    showing {pengajuans.data.length} Entries{" "}
                                    <TiArrowRight className="w-5 h-5" />
                                </div>
                                <ReactPaginate
                                    breakLabel={<span>...</span>}
                                    nextLabel={
                                        pengajuans.next_page_url && (
                                            <a
                                                className="inline-flex items-center gap-2 px-2 py-1 font-semibold leading-none border rounded-md group/next dark:text-white/70 text-primary hover:text-white hover:border hover:bg-primary/75 border-primary"
                                                href={pengajuans.next_page_url}
                                                onClick={() => setNum(num + 1)}
                                            >
                                                <span className="sr-only">
                                                    Next
                                                </span>
                                                <span aria-hidden="true">
                                                    Next
                                                </span>
                                                <MdOutlineKeyboardDoubleArrowRight className="w-4 h-4 -ml-1 fill-primary group-hover/next:fill-white" />
                                            </a>
                                        )
                                    }
                                    onPageChange={handlePageClick}
                                    pageRangeDisplayed={1}
                                    pageCount={pengajuans.last_page}
                                    previousLabel={
                                        pengajuans.prev_page_url && (
                                            <a
                                                className="inline-flex items-center gap-2 px-2 py-1 font-semibold leading-none border rounded-md group/next dark:text-white/70 text-primary hover:text-white hover:border hover:bg-primary/75 border-primary"
                                                href={pengajuans.next_page_url}
                                                onClick={() => setNum(num + 1)}
                                            >
                                                <MdOutlineKeyboardDoubleArrowLeft className="w-4 h-4 -mr-1 fill-primary group-hover/next:fill-white" />
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
                                    className="flex justify-end gap-2"
                                />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-row items-center justify-center w-full text-center h-96 ">
                        <div className="m-40 space-y-7">
                            <strong className="my-auto text-3xl">
                                Belum Ada Pengajuan Terbaru!!
                            </strong>
                            <img
                                src={noData}
                                className="m-auto my-auto h-52 w-72"
                                alt=""
                                srcset=""
                            />
                        </div>
                    </div>
                )}
            </section>

            {/* end of content */}
        </AuthenticatedLayout>
    );
}
