import { signIn, useSession } from 'next-auth/react';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Layout from '../components/Layout';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getError } from '../utils/error';

function ProfileScreen() {
    const { data: session } = useSession();

    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if (session) {
            setValue('name', session.user.name);
            setValue('email', session.user.email);
        }
    }, [session, setValue]);

    const submitHandler = async ({ name, email, password }) => {
        try {
            await axios.put('/api/auth/update_user', { name, email, password });
            const result = await signIn('credentials', {
                redirect: false,
                name,
                email,
                password,
            });
            if (result.error) {
                toast.error(result.error);
            }
            toast.success('Profile Updates Successfully');
        } catch (err) {
            toast.error(getError(err));
        }
    };

    return (
        <Layout title={'Profile'}>
            <form className="mx-auto max-w-screen-md" onSubmit={handleSubmit(submitHandler)}>
                <h1 className="text-xl mb-4">Update Profile</h1>
                <div className="mb-4">
                    <label htmlFor="name">Name</label>
                    <input
                        autoFocus
                        className="w-full"
                        {...register('name', {
                            required: 'Name is required',
                        })}
                    />
                    {errors.name && <small className="text-red-500">{errors.name.message}</small>}
                </div>
                <div className="mb-4">
                    <label htmlFor="email">Email</label>
                    <input
                        className="w-full"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                                message: 'Please enter valid email',
                            },
                        })}
                    />
                    {errors.email && <small className="text-red-500">{errors.email.message}</small>}
                </div>
                <div className="mb-4">
                    <label htmlFor="password">Password</label>
                    <input
                        className="w-full"
                        {...register('password', {
                            minLength: { value: 6, message: 'password is more than 5 chars' },
                        })}
                    />
                    {errors.password && <small className="text-red-500">{errors.password.message}</small>}
                </div>
                <div className="mb-4">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        className="w-full"
                        {...register('confirmPassword', {
                            validate: (value) => value === getValues('password'),
                            minLength: { value: 6, message: 'password is more than 5 chars' },
                        })}
                    />
                    {errors.confirmPassword && <small className="text-red-500">{errors.confirmPassword.message}</small>}
                    {errors.confirmPassword && errors.confirmPassword.type === 'validate' && <small className="text-red-500 ">Password do not match</small>}
                </div>
                <div className="mb-4">
                    <button className="primary-button">Update Profile</button>
                </div>
            </form>
        </Layout>
    );
}

ProfileScreen.auth = true;
export default ProfileScreen;
