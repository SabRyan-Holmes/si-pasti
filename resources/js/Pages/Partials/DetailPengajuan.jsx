import moment from "moment/min/moment-with-locales";
import React from "react";

export default function DetailPengajuan({ pengajuan }) {
    moment.locale("id");
    const ketuaTim = pengajuan.created_by;
    let nama = ketuaTim.name.split(" / ")[0];
    let gelar = ketuaTim.name.split(" / ")[1];


    return (
        <section class="my-10 w-full ">
            <table className="table overflow-hidden text-xs table-bordered rounded-xl ">
                <thead className="text-center border bg-primary rounded-xl border-secondary/15">
                    <th colSpan={2}>
                        <strong className="text-lg font-semibold text-white ">
                            DESKRIPSI KEGIATAN
                        </strong>
                    </th>
                </thead>
                <tbody className="text-sm border-primary/15">
                    <th
                        colSpan={2}
                        className="w-full text-center border border-primary/15 "
                    >
                        <strong className="text-lg font-medium capitalize">
                            {pengajuan.nama_kegiatan}
                        </strong>
                    </th>
                    <tr className="border-primary/15">
                        <td width="50%">
                            <div class="grid grid-cols-2 gap-0">
                                <span class="mr-1 font-semibold">
                                    Ketua TIM :
                                </span>
                                <span className="text-end">
                                    {nama} {gelar}
                                </span>
                            </div>
                        </td>
                        <td width="50%">
                            <div class="grid grid-cols-2 gap-0">
                                <span class="mr-1 font-semibold">
                                    Nama Tim :
                                </span>
                                <span className="text-end">
                                    {" "}
                                    {pengajuan.nama_tim}
                                </span>
                            </div>
                        </td>
                    </tr>
                    <tr className="border-primary/15">
                        <td width="50%">
                            <div class="grid grid-cols-2 gap-0">
                                <span class="mr-1 font-semibold">
                                    Tangal Pengajuan :
                                </span>
                                <span className="text-end">
                                    {moment(pengajuan.start_date).format("LL")}
                                </span>
                            </div>
                        </td>
                        <td width="50%">
                            <div class="grid grid-cols-2 gap-0">
                                <span class="mr-1 font-semibold">
                                    Tanggal Selesai :
                                </span>

                                {pengajuan.status == "selesai" ? (
                                    <span className="text-end">
                                        {moment(pengajuan.end_date).format(
                                            "LL"
                                        )}
                                    </span>
                                ) : (
                                    <span className="text-end">_</span>
                                )}
                            </div>
                        </td>
                    </tr>
                    <tr className="border-primary/15">
                        <td width="50%">
                            <div class="grid grid-cols-2 gap-0 ">
                                <span class="mr-1 font-semibold">Status :</span>
                                <div className="w-fit justify-self-end">

                                {pengajuan.status == "diproses" && (
                                    <div className="text-center border bg-orange-50 label-base border-secondary/50 text-secondary ">
                                        {pengajuan.status}
                                    </div>
                                )}

                                {pengajuan.status == "selesai" && (
                                    <div className="text-center border bg-orange-50 label-success border-success/50 text-success ">
                                        {pengajuan.status}
                                    </div>
                                )}

                                {pengajuan.status == "ditolak" && (
                                    <div className="text-center bg-orange-50 label-warning ">
                                        {pengajuan.status}
                                    </div>
                                )}
                                </div>

                            </div>
                        </td>
                        <td width="50%">
                            <div class="grid grid-cols-2 gap-0 ">
                                <span class="mr-1 font-semibold">Stage :</span>
                                <div className="w-fit justify-self-end">

                                    {/* <div className="text-center border label-base border-secondary/50 text-secondary ">
                                        {pengajuan.stage}
                                    </div> */}
                                    {/* Kalo sudah divalidasi */}
                                    <div className="label-primary ">
                                        {pengajuan.stage}
                                    </div>


                                </div>

                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            {/* <div class="grid grid-cols-2 gap-0">
                <span class="mr-1 font-semibold">Nama Kegiatan</span>
                <span>: {pengajuan.nama_kegiatan}</span>
            </div>
            <div class="grid grid-cols-2 gap-0">
                <span class="mr-1 font-bold">Ketua TIM /NIP</span>
                <span>
                    : {nama} {gelar}
                </span>
            </div>
            <div class="grid grid-cols-2 gap-0">
                <span class="mr-1 font-bold">Nama Tim</span>
                <span>: {pengajuan.nama_tim}</span>
            </div> */}
        </section>
    );
}
