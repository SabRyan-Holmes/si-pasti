import React, { useState } from 'react';
import Navbar from '@/Components/Navbar';
import { useForm, Link, Head } from '@inertiajs/react';
import AdminDrawer from '@/Components/AdminDrawer';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';


export default function Pengajuan({ title, auth }) {

    const { data, setData, post, processing, errors } = useForm({
        nama_kegiatan: '',
        kak: null,
        form_permintaan: null,
        surat_permintaan: false,

      })
        return (
        <div className='h-full'>
            <Head title={title} />

            <div className="drawer lg:drawer-open h-full">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col bg-neutral h-full">
                    <Navbar user={auth.user}  />
                    <div className='mx-6 mt-6 h-full bg-white'>

                        {/* content */}
                        <div className='mx-24 '>
                            <strong className='text-2xl'>{title}</strong>

                            <form action="" method='post' encType= 'multipart/form-data' className='w-full max-w-lg my-4 '>
                                {/* Nama Kegiatan */}
                                <div className='my-4'>
                                    <InputLabel htmlFor="nama_kegiatan" value="Kerangka Ajuan Kerja(KAK)" className="my-4" />
                                    <TextInput type="text" name="nama_kegiatan" className="bg-white mb-2 input input-bordered input-primary w-full" value={data.question} onChange={e => setData('nama_kegiatan', e.target.value)}  />
                                    <InputError message={errors.nama_kegiatan} className="mt-2" />
                                </div>

                                {/* KAK */}
                                <div className='my-3'>
                                    <InputLabel htmlFor="kak" value="Kerangka Ajuan Kerja(KAK)" className="my-2" />

                                    <div class="relative inline-block border rounded-md border-primary/25 w-full focus:border-indigo-500 focus:ring-indigo-500  h-12 p-2">
                                    <input type="file"
                                        name='kak'
                                        onChange={e => setData('kak', e.target.files[0])}
                                        class="
                                            file:absolute file:right-0
                                            file:bg-blue-500 file:text-white file:border-0
                                            file:py-1 file:px-3 file:rounded-full
                                            file:shadow-sm file:shadow-blue-500/30
                                            text-gray-600 text-sm
                                    "/>
                                    </div>
                                    <InputError message={errors.kak} className="mt-2" />

                                </div>

                                {/* form_permintaan */}
                                <div className='my-3'>
                                    <InputLabel htmlFor="form_permintaan" value="Form Permintaan" className="my-2" />
                                    <div class="relative inline-block border rounded-md border-primary/25 w-full  focus:border-indigo-500 focus:ring-indigo-500 h-12 p-2">
                                    <input type="file"
                                    name='form_permintaan'
                                    onChange={e => setData('form_permintaan', e.target.files[0])}
                                    class="
                                        file:absolute file:right-0
                                        file:bg-blue-500 file:text-white file:border-0
                                        file:py-1 file:px-3 file:rounded-full
                                        file:shadow-sm file:shadow-blue-500/30
                                        text-gray-600 text-sm
                                    "/>
                                    </div>
                                    <InputError message={errors.form_permintaan} className="mt-2" />
                                </div>

                                {/* surat_permintaan */}
                                <div className='my-3'>
                                    <InputLabel htmlFor="surat_permintaan" value="Surat Permintaan" className="my-2" />
                                    <div class="relative inline-block border rounded-md border-primary/25 w-full focus:border-indigo-500 focus:ring-indigo-500 h-12 p-2">
                                    <input type="file"
                                    name='surat_permintaan'
                                    onChange={e => setData('surat_permintaan', e.target.files[0])}
                                    class="
                                        file:absolute file:right-0
                                        file:bg-blue-500 file:text-white file:border-0
                                        file:py-1 file:px-3 file:rounded-full
                                        file:shadow-sm file:shadow-blue-500/30
                                        text-gray-600 text-sm
                                    "/>
                                    </div>
                                    <InputError message={errors.surat_permintaan} className="mt-2" />
                                </div>

                                {/* Button */}
                                <div className='w-full  justify-end flex'>
                                <PrimaryButton type="submit" className=''>
                                    Ajukan
                                </PrimaryButton>
                                </div>

                            </form>
                        </div>

                        {/* end of content */}
                    </div>

                </div>
                <AdminDrawer active={route().current('pengajuan.create')}></AdminDrawer>
            </div>
        </div>
    )
}
