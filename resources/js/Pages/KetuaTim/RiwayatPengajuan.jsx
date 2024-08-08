import React, { useState } from "react";
import { useForm, Link, Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import moment from "moment/min/moment-with-locales";

export default function RiwayatPengajuan({ title, auth, pengajuan }) {
    moment.locale("id");
    const { data, setData, post, processing, errors } = useForm({
        nama_kegiatan: "",
        kak: null,
        form_permintaan: null,
        surat_permintaan: false,
    });
    return (
        <AuthenticatedLayout user={auth.user} title={title}>
            {/* content */}
            <div className="mx-24 ">
                <div className="overflow-x-auto">
                    <table className="table  ">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name Kegiatan</th>
                                <th>Tanggal Pengajuan</th>
                                <th>Tanggal Disetujui</th>
                                <th className="text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {pengajuan.map((data, i) => (
                                <Link
                                    as="tr"
                                    className="group/item hover:bg-primary/50"
                                    href={route(
                                        "ketua_tim.show_pengajuan",
                                        data.id
                                    )}
                                >
                                    <th>{i + 1}</th>
                                    <td className="capitalize">
                                        {data.kegiatan.nama_kegiatan}
                                    </td>
                                    <td>
                                        {moment(data.created_at).format("LL")}
                                    </td>
                                    <td>
                                        {moment(data.updated_at).format("LL")}
                                    </td>
                                    <td >

                                        <div className=" label-base bg-base-200 text-center ">
                                            {data.status}
                                        </div>
                                    </td>
                                </Link>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* end of content */}
        </AuthenticatedLayout>
    );
}
