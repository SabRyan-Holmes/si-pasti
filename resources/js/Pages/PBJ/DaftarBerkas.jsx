import React, { useEffect, useState } from "react";
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
import { InputLabel } from "@/Components";
import { HiDocumentSearch } from "react-icons/hi";

export default function DaftarBerkas({
    title,
    auth,
    pengajuans,
    flash,
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
            route("pbj.daftar-berkas"),
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

    useEffect(() => {
        if (byStatus) {
            router.get(
                route("pbj.daftar-berkas"),
                { byStatus, search },
                { replace: true, preserveState: true }
            );
        }
    }, [byStatus, byStage, search]);

    const handleSearch = (e) => {
        e.preventDefault();
        const searchValue = e.target.search.value;

        router.get(
            route("pbj.daftar-berkas"),
            { byStatus, search: searchValue },
            { replace: true, preserveState: true }
        );
    };

    useEffect(() => {
        if (byStatus || byStage) {
            router.get(
                route("pbj.daftar-berkas"),
                { byStatus, byStage, search },
                { replace: true, preserveState: true }
            );
        } else if (byStatus == "" && byStage == "") {
            router.get(
                route("pbj.daftar-berkas"),
                {},
                { replace: true, preserveState: true }
            );
        }
    }, [byStatus, byStage]);

    return (
        <AuthenticatedLayout user={auth.user} title={title}>
            <Head title={title} />
            {/* content */}
            <section className="mx-auto phone:h-screen laptop:h-full max-w-screen-laptop px-7 ">
                {/* Breadcumbs */}
                <div className="my-3 text-sm breadcrumbs">
                    <ul>
                        <li>
                            <a>
                                <FaRegFolder className="w-4 h-4 mr-2" />
                                Daftar Berkas
                            </a>
                        </li>
                        <li>
                            <a></a>
                        </li>
                    </ul>
                </div>

                {pengajuans.data.length ? (
                    <>
                        <form
                            className="flex items-center justify-between w-full "
                            onSubmit={handleSearch}
                        >
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

                            <div className="w-[21rem]">
                                <InputLabel
                                    value="Nama Kegiatan"
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
                        <div className="pt-3 overflow-auto rounded-xl ">
                            <table className="table overflow-hidden text-xs table-bordered rounded-xl ">
                                <thead className="text-sm font-medium text-white border bg-primary rounded-xl border-secondary/15">
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
                                        let name =
                                            ketua_tim.name.split(" / ")[0];
                                        let gelar =
                                            ketua_tim.name.split(" / ")[1];

                                        return (
                                            <tr
                                                key={i}
                                                className="group/item hover:bg-secondary/50 "
                                            >
                                                <th>{i + 1}</th>
                                                <td>
                                                    <div className="flex-row items-center gap-3">
                                                        <span className="font-bold">
                                                            {name} {gelar}
                                                        </span>
                                                        <span className="block text-xs opacity-50 text-nowrap ">
                                                            {data.nama_tim}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="font-medium capitalize">
                                                    {data.nama_kegiatan}
                                                </td>
                                                <td className="text-sm text-center">
                                                    {moment(
                                                        data.created_at
                                                    ).format("LL")}
                                                </td>
                                                <td className="font-medium text-center">
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
                                                    <div className="text-center label-base bg-base-200 ">
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
                                                        className="items-center justify-center inline-block gap-2 mx-auto font-medium text-center transition-all group/button hover:scale-105 group-hover/item:bg-hijau group-hover/item:text-white text-hijau/75 action-btn border-hijau/20 hover:bg-hijau hover:text-white "
                                                    >
                                                        <span>Lihat</span>
                                                        <FaEye className="fill-hijau/75 group-hover/item:fill-white" />
                                                    </Link>
                                                    <span className="inline-block mx-1"></span>
                                                    <Link
                                                        as="a"
                                                        href={route(
                                                            "pbj.unggah-berkas",
                                                            data.nama_kegiatan
                                                        )}
                                                        className="items-center justify-center inline-block gap-2 mx-auto font-medium text-center transition-all group/button hover:scale-105 group-hover/item:bg-secondary group-hover/item:text-white text-secondary action-btn border-hijau/20 hover:bg-hijau hover:text-white"
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
                        <div className="mb-8 text-sm box-footer">
                            <div className="items-center justify-between sm:flex">
                                <div className="flex items-center text-xs">
                                    showing {pengajuans.data.length} Entries
                                    <TiArrowRight className="h-5 5" />
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
                    <div className="flex items-center justify-center h-96 ">
                        <strong className="my-auto text-2xl">
                            Belum Ada Pengajuan Terbaru!!
                        </strong>
                    </div>
                )}
            </section>
        </AuthenticatedLayout>
    );
}
