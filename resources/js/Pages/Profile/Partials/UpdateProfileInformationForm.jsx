import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { ProfileImage, SuccessButton, TextInputSecondary } from "@/Components";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
            nip: user.nip,
        });

    const submit = (e) => {
        e.preventDefault();

        patch(route("profile.update"));
    };

    return (
        <section className={`${className} w-full  flex justify-between`}>
            <div className="w-full">
                <header>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        Informasi Akun
                    </h2>

                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Update informasi profil akun dan alamat email
                    </p>
                </header>

                <form onSubmit={submit} className="w-full mt-6 ">
                    <div className="flex justify-start gap-10 ">
                        <div className="w-1/2 space-y-4">
                            <div>
                                <InputLabel htmlFor="name" value="Nama/Gelar" />

                                <TextInputSecondary
                                    id="name"
                                    className="block w-full mt-1"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    required
                                    isFocused
                                    autoComplete="name"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.name}
                                />
                            </div>

                            <div>
                                <InputLabel htmlFor="nip" value="NIP" />

                                <TextInputSecondary
                                    id="nip"
                                    type="text"
                                    className="block w-full mt-1"
                                    value={data.nip}
                                    onChange={(e) =>
                                        setData("nip", e.target.value)
                                    }
                                    autoComplete="username"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.nip}
                                />
                            </div>

                            <div>
                                <InputLabel htmlFor="email" value="Email" />

                                <TextInputSecondary
                                    id="email"
                                    type="email"
                                    className="block w-full mt-1"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    autoComplete="username"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.email}
                                />
                            </div>
                        </div>

                        <div className="w-1/3">
                        {/* Jaga2 kalo disuruh bisa update Divisi juga nanti */}
                            {/* <div className="">
                                <InputLabel
                                    htmlFor="nama_kegiatan"
                                    value="Divisi"
                                />
                                <select
                                    className="block w-full h-12 px-2 mt-1 text-sm rounded-md "
                                    onChange={(e) =>
                                        setData("divisi", e.target.value)
                                    }
                                    defaultValue={user.divisi}
                                >
                                    <option disabled value={""}>
                                        Pilih Nama Tim
                                    </option>
                                    <option>Ketua Tim</option>
                                    <option>PPK</option>
                                    <option>PBJ</option>
                                    <option>Keuangan</option>
                                </select>
                                <InputError
                                    message={errors.nama_tim}
                                    className="mt-2"
                                />
                            </div> */}
                        </div>
                    </div>

                    {/*
                    <div>
                        <InputLabel htmlFor="email" value="NIP" />
                        <TextInputSecondary
                            id="nip"
                            type="text"
                            className="block w-full mt-1"
                            defaultValue={data.nip}
                            onChange={(e) => setData("nip", e.target.value)}
                            required
                            autoComplete="nip"
                        />
                        <InputError className="mt-2" message={errors.nip} />
                    </div> */}

                    {mustVerifyEmail && user.email_verified_at === null && (
                        <div>
                            <p className="mt-2 text-sm text-gray-800 dark:text-gray-200">
                                Your email address is unverified.
                                <Link
                                    href={route("verification.send")}
                                    method="post"
                                    as="button"
                                    className="text-sm text-gray-600 underline rounded-md dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                                >
                                    Click here to re-send the verification
                                    email.
                                </Link>
                            </p>

                            {status === "verification-link-sent" && (
                                <div className="mt-2 text-sm font-medium text-green-600 dark:text-green-400">
                                    A new verification link has been sent to
                                    your email address.
                                </div>
                            )}
                        </div>
                    )}

                    <div className="flex items-center gap-4 mt-4">
                        <SuccessButton type="submit" disabled={processing}>
                            Simpan
                        </SuccessButton>
                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Saved.
                            </p>
                        </Transition>
                    </div>
                </form>
            </div>
            {/* Todo?: Logika Ubah Profile Picture Nanti */}

            {/* <div className="flex items-center justify-center w-1/2">
                {user.profile ? (
                    <img
                        src={user.profile}
                        alt="pp"
                        className="w-6 h-6 rounded-full avatar"
                    />
                ) : (
                    <>
                        <ProfileImage
                            name={user.name}
                            className="w-40 h-40 text-5xl ring-2"
                        />
                    </>
                )}
            </div> */}
        </section>
    );
}
