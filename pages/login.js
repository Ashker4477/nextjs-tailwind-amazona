import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Layout from '../components/Layout';
import { getError } from '../utils/error';

export default function Login() {
    const { data: session } = useSession();
    const router = useRouter();
    const { redirect } = router.query;
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const submitHandler = async ({ email, password }) => {
        try {
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password,
            });
            if (result.error) {
                toast.error(result.error);
            }
        } catch (error) {
            toast.error(getError(error));
        }
    };

    useEffect(() => {
        if (session?.user) {
            router.push(redirect || '/');
        }
    }, [router, session, redirect]);

    return (
        <Layout title={'Login'}>
            <form className="mx-auto max-w-screen-md" onSubmit={handleSubmit(submitHandler)}>
                <h1 className="mb-4 text-xl">Login</h1>
                <div className="mb-4">
                    <label htmlFor="email" className="">
                        Email
                    </label>
                    <input
                        className="w-full"
                        {...register('email', {
                            required: true,
                            pattern: {
                                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                                message: 'Please enter valid email',
                            },
                        })}
                        type={'email'}
                        id={'email'}
                        autoFocus
                    />
                    {errors.email && <div className="text-red-500">{errors.email.message}</div>}
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="">
                        Password
                    </label>
                    <input
                        className="w-full"
                        type={'password'}
                        id={'password'}
                        {...register('password', {
                            required: 'Please enter password',
                            minLength: { value: 6, message: 'Password more than 6 characters' },
                        })}></input>
                    {errors.password && <div className="text-red-500 ">{errors.password.message}</div>}
                </div>
                <div className="mb-4">
                    <button className="primary-button">Login</button>
                </div>
                <div className="">
                    Don&apos;t have an account? &nbsp;
                    <Link href={`/register?redirect=${redirect || '/'}`}>Register.</Link>
                </div>
            </form>
        </Layout>
    );
}
