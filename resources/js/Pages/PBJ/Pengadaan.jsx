import React, { useState } from 'react';
import Navbar from '@/Components/Navbar';
import { useForm, Link, Head } from '@inertiajs/react';
import AdminDrawer from '@/Components/AdminDrawer';

export default function Pengadaan({ title, auth }) {
    console.log(`isi route  : ${route}`)
    return (
        <div className='h-full'>
            <Head title={title} />

            <div className="drawer lg:drawer-open h-full">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col bg-neutral h-full">
                    <Navbar user={auth.user} />
                    <div className='mx-6 mt-6 h-full bg-white'>

                        {/* content */}
                       <div className='text-5xl'>Pengadaan</div>
                        {/* end of content  */}
                    </div>

                </div>
                <AdminDrawer divisi={auth.user.name} active={route().current('dashboard')} ></AdminDrawer>


            </div>
        </div>
    )
}
