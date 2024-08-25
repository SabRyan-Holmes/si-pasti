import React, { useEffect } from "react";
import { Checkbox, InputLabel } from "@/Components";
// import { initFlowbite } from "flowbite";
import { Link } from "@inertiajs/react";

export default function Graph({ data }) {
    useEffect(() => {
        // Panggil fungsi yang diimpor
        // initializeChart();
        if (document.getElementById("donut-chart")) {
            const seriesData = [data.diproses, data.ditolak, data.selesai];

            const chart = new ApexCharts(
                document.getElementById("donut-chart"),
                getChartOptions(seriesData)
            );
            chart.render();
        }
    }, [data]);

    const getChartOptions = (seriesData) => {
        return {
            series: seriesData,
            colors: [
                "#1C64F2",
                "#FF0000",
                "#78dcca",
                "#FDBA8C",
                "#E74694",
                "#fb923c",
                "#78dcca",
            ],
            chart: {
                height: 320,
                width: "100%",
                type: "donut",
            },
            stroke: {
                colors: ["transparent"],
                lineCap: "",
            },
            plotOptions: {
                pie: {
                    donut: {
                        labels: {
                            show: true,
                            name: {
                                show: true,
                                fontFamily: "Inter, sans-serif",
                                offsetY: 20,
                            },
                            total: {
                                showAlways: true,
                                show: true,
                                label: "Data Pengajuan",
                                fontFamily: "Inter, sans-serif",
                                formatter: function (w) {
                                    const sum = w.globals.seriesTotals.reduce(
                                        (a, b) => {
                                            return a + b;
                                        },
                                        0
                                    );
                                    return sum;
                                },
                            },
                            value: {
                                show: true,
                                fontFamily: "Inter, sans-serif",
                                offsetY: -20,
                                formatter: function (value) {
                                    return value + " Pegawai";
                                },
                            },
                        },
                        size: "80%",
                    },
                },
            },
            grid: {
                padding: {
                    top: -2,
                },
            },
            labels: ["Diproses", "Ditolak", "Selesai"],
            dataLabels: {
                enabled: false,
            },
            legend: {
                position: "bottom",
                fontFamily: "Inter, sans-serif",
            },
            yaxis: {
                labels: {
                    formatter: function (value) {
                        return value + " Pegawai";
                    },
                },
            },
            xaxis: {
                labels: {
                    formatter: function (value) {
                        return value + " Pegawai";
                    },
                },
                axisTicks: {
                    show: false,
                },
                axisBorder: {
                    show: false,
                },
            },
        };
    };
    return (
        <div className="w-full max-w-md p-2 mx-auto mt-5 bg-white border rounded-lg shadow dark:bg-gray-800 md:p-6 border-gradient">
            <div className="flex items-center justify-around mb-3">
                <div className="flex items-center justify-center">
                    <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white pe-1">
                        Semua Pengajuan
                    </h5>
                    <svg
                        data-popover-target="chart-info"
                        data-popover-placement="bottom"
                        className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer ms-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm0 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm1-5.034V12a1 1 0 0 1-2 0v-1.418a1 1 0 0 1 1.038-.999 1.436 1.436 0 0 0 1.488-1.441 1.501 1.501 0 1 0-3-.116.986.986 0 0 1-1.037.961 1 1 0 0 1-.96-1.037A3.5 3.5 0 1 1 11 11.466Z" />
                    </svg>
                    <div
                        data-popover
                        id="chart-info"
                        role="tooltip"
                        className="absolute z-10 invisible inline-block text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400"
                    >
                        <div className="p-3 space-y-2">
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                                Data Pengajuan
                            </h3>
                            <p className="text-[12px]">
                                Lorem ipsum dolor sit, amet consectetur
                                adipisicing elit. Qui ratione deserunt eius,
                                voluptatem vel pariatur? Atque ducimus cumque
                                dolores quae asperiores a eaque vero odit.
                                Facere eligendi vero quasi consequuntur?
                            </p>
                            <ul>
                                {/* <li>
                            <strong>
                                AMDYA (Administrasi Umum)
                            </strong>
                            <span className="text-[12px] block">

                            : Jabatan ini merupakan tingkatan
                            awal bagi pegawai fungsional, yang
                            bertugas dalam kegiatan
                            administratif umum.
                            </span>
                        </li> */}
                                <li className="text-[12px]">
                                    <strong>Selesai</strong>: Bertanggung jawab
                                    atas pengawasan dan koordinasi pekerjaan tim
                                    dalam proyek atau tugas-tugas statistik.
                                </li>
                                <li className="text-[12px]">
                                    <strong>Ditolak</strong>: Melibatkan
                                    kemampuan statistik yang mendalam dan
                                    aplikasi metode analisis tingkat lanjut
                                    dalam berbagai proyek.
                                </li>
                                <li className="text-[12px]">
                                    <strong>Diproses</strong>: Level yang
                                    menunjukkan kemampuan dalam menggunakan
                                    teknik statistik standar dan alat analisis
                                    untuk melakukan pekerjaan.
                                </li>

                            </ul>
                            {/* <p className="text-xs">
                                Setiap tingkatan jabatan memiliki peran dan
                                kontribusi yang penting dalam mendukung kegiatan
                                dan program di BPS Provinsi Jambi, serta
                                berperan dalam mencapai tujuan organisasi secara
                                keseluruhan.
                            </p> */}
                            <a
                                href="#"
                                className="flex items-center font-medium text-blue-600 dark:text-blue-500 dark:hover:text-blue-600 hover:text-blue-700 hover:underline"
                            >
                                Read more
                                <svg
                                    className="w-2 h-2 ms-1.5 rtl:rotate-180"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 6 10"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 9 4-4-4-4"
                                    />
                                </svg>
                            </a>
                        </div>
                        <div data-popper-arrow></div>
                    </div>
                </div>

                <a href="#">
                    <button
                        type="button"
                        data-tooltip-target="data-tooltip"
                        data-tooltip-placement="bottom"
                        className="items-center justify-center hidden w-8 h-8 text-sm text-gray-500 rounded-lg sm:inline-flex dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700"
                    >
                        <svg
                            className="w-3.5 h-3.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 16 18"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3"
                            />
                        </svg>
                        <span className="sr-only">Download data</span>
                    </button>
                </a>

                <div
                    id="data-tooltip"
                    role="tooltip"
                    className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
                >
                    Unduh CSV
                    <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
            </div>

            <div className="visible hidden">
                <div
                    className="grid items-center grid-cols-4 gap-4 place-content-center"
                    id="devices"
                >
                    <div className="flex items-center me-4">
                        <Checkbox id="diproses" value="diproses" />
                        <InputLabel
                            value="Diproses"
                            htmlFor="diproses"
                            className="ml-2 font-normal"
                        />
                    </div>
                    <div className="flex items-center me-4">
                        <Checkbox id="ditolak" value="ditolak" />
                        <InputLabel
                            value="Ditolak"
                            htmlFor="ditolak"
                            className="ml-2 font-normal"
                        />
                    </div>

                    <div className="flex items-center me-4">
                        <Checkbox id="selesai" value="selesai" />
                        <InputLabel
                            value="Selesai"
                            htmlFor="selesai"
                            className="ml-2 font-normal"
                        />
                    </div>

                </div>
            </div>

            {/* <!-- Donut Chart --> */}
            <div className="py-6" id="donut-chart"></div>

            <div className="grid items-center justify-between grid-cols-1 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between pt-5">
                    {/* <!-- Button --> */}
                    {/* <button
                        id="dropdownDefaultButton"
                        data-dropdown-toggle="lastDaysdropdown"
                        data-dropdown-placement="bottom"
                        className="inline-flex items-center text-sm font-medium text-center text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                        type="button"
                    >
                        Semua Waktu
                        <svg
                            className="w-2.5 m-2.5 ms-1.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 6"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 4 4 4-4"
                            />
                        </svg>
                    </button> */}
                    <div
                        id="lastDaysdropdown"
                        className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                    >
                        {/* Todo? */}
                        {/* <ul
                            className="py-2 text-sm text-gray-700 dark:text-gray-200"
                            aria-labelledby="dropdownDefaultButton"
                        >
                            <li>
                                <a
                                    href="#"
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    7 Hari Terakhir
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    30 Hari Terakhir
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    90 Hari Terakhir
                                </a>
                            </li>
                        </ul> */}
                    </div>
                    {/* <a
                        href="#"
                        className="inline-flex items-center px-3 py-2 text-sm font-semibold text-blue-600 uppercase rounded-lg hover:text-blue-700 dark:hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                    >
                        Analisis
                        <svg
                            className="w-2.5 h-2.5 ms-1.5 rtl:rotate-180"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 6 10"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 9 4-4-4-4"
                            />
                        </svg>
                    </a> */}
                </div>
            </div>
        </div>
    );
}
