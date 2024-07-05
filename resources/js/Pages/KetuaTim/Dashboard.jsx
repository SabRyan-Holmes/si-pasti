import React, { useState } from 'react';
import Navbar from '@/Components/Navbar';
import { useForm, Link, Head } from '@inertiajs/react';
import AdminDrawer from '@/Components/AdminDrawer';
import { FaCheck } from "react-icons/fa";
import { IconContext } from "react-icons";
import { FaXmark } from "react-icons/fa6";

export default function AdminPage({ title, auth }) {
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
                        <div class="grid bg-white grid-cols-1 gap-4 px-4 mt-8 sm:grid-cols-3 sm:px-8">
                            <div class="flex items-center bg-white border rounded-sm overflow-hidden shadow">

                                <div class="p-4 bg-green-400"><svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-white" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z">
                                    </path>
                                </svg></div>
                                <div class="px-4 text-gray-700">
                                    <h3 class="text-sm tracking-wider">Total Pengajuan</h3>
                                    <p class="text-3xl">2</p>
                                </div>
                            </div>
                            <div class="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                                <div class="p-4 bg-blue-400"><svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-white" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2">
                                    </path>
                                </svg></div>
                                <div class="px-4 text-gray-700">
                                    <h3 class="text-sm tracking-wider">Total Terverifikasi</h3>
                                    <p class="text-3xl">5</p>
                                </div>
                            </div>
                            <div class="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                                <div class="p-4 bg-indigo-400 h-full">
                                    <IconContext.Provider
                                        value={{ color: 'white', size: '50px' }}
                                    >
                                        <FaCheck className='h-full w-12' />
                                    </IconContext.Provider>


                                </div>
                                <div class="px-4 text-gray-700">
                                    <h3 class="text-sm tracking-wider">Jumlah User</h3>
                                    <p class="text-3xl">5</p>
                                </div>
                            </div>
                            <div class="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                                <div class="p-4 bg-red-400">
                                    <IconContext.Provider
                                        value={{ color: 'white', size: '50px' }}
                                    >
                                        <FaXmark className='h-full w-12' />
                                    </IconContext.Provider>
                                </div>
                                <div class="px-4 text-gray-700">
                                    <h3 class="text-sm tracking-wider">Total Pengajuan Tertolak</h3>
                                    <p class="text-3xl">3</p>
                                </div>
                            </div>
                        </div>
                        {/* end of content               */}
                    </div>

                </div>
                <AdminDrawer divisi={auth.user.name} active={route().current('dashboard')} ></AdminDrawer>


            </div>
        </div>
    )
}
