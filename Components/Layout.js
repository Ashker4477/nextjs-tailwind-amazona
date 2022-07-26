import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Menu } from '@headlessui/react';
import DropdownLink from './DropdownLink';
import Cookies from 'js-cookie';
import { CART_RESET } from '../Constants/CartConstants';

export default function Layout({ title, children }) {
    const { status, data: session } = useSession();
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart);
    const [cartItemsCount, setCartItemsCount] = useState(0);
    useEffect(() => {
        setCartItemsCount(cartItems.reduce((a, b) => a + b.qty, 0));
    }, [cartItems]);

    const logoutClickHandler = () => {
        dispatch({
            type: CART_RESET,
        });
        Cookies.remove('cart');
        signOut({ callbackUrl: '/login' });
    };

    return (
        <>
            <Head>
                <title>{title ? title + ' - Amazona' : 'Amazona'}</title>
                <meta name="description" content="Ecommerce Website" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ToastContainer position={'top-center'} limit={1} />
            <div className="flex min-h-screen flex-col justify-center">
                <header>
                    <nav className="flex h-12 items-center px-4 justify-between shadow-md">
                        <Link href="/">
                            <a className="text-lg font-bold">Amazona</a>
                        </Link>
                        <div>
                            <Link href="/cart">
                                <a className="p-2">
                                    Cart
                                    {cartItems.length > 0 && (
                                        <span className="ml-1 rounded-full px-2 py-1 text-xs font-bold text-white bg-red-500">{cartItemsCount}</span>
                                    )}
                                </a>
                            </Link>
                            <Link href="/login">
                                {status === 'loading' ? (
                                    'Loading'
                                ) : session?.user ? (
                                    <Menu as={'div'} className="relative inline-block">
                                        <Menu.Button className={'text-blue-600'}>{session.user.name}</Menu.Button>
                                        <Menu.Items className={'absolute right-0 w-56 origin-top-right bg-white shadow-lg'}>
                                            <Menu.Item>
                                                <DropdownLink className="dropdown-link" href="/profile">
                                                    Profile
                                                </DropdownLink>
                                            </Menu.Item>
                                            <Menu.Item>
                                                <DropdownLink className="dropdown-link" href="/order-history">
                                                    Order History
                                                </DropdownLink>
                                            </Menu.Item>
                                            <Menu.Item>
                                                <a className="dropdown-link" href="#" onClick={logoutClickHandler}>
                                                    Logout
                                                </a>
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Menu>
                                ) : (
                                    <Link href="/login">
                                        <a className="p-2">Login</a>
                                    </Link>
                                )}
                            </Link>
                        </div>
                    </nav>
                </header>
                <main className="container m-auto mt-4 px-4">{children}</main>
                <footer className="flex h-10 justify-center items-center shadow-inner">
                    <p>Copyright © 2022 Amazona</p>
                </footer>
            </div>
        </>
    );
}
