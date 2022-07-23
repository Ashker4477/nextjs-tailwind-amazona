import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';

export default function Layout({ title, children }) {
    const { cartItems } = useSelector((state) => state.cart);
    return (
        <>
            <Head>
                <title>{title ? title + ' - Amazona' : 'Amazona'}</title>
                <meta name="description" content="Ecommerce Website" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

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
                                        <span className="ml-1 rounded-full px-2 py-1 text-xs font-bold text-white bg-red-500">{cartItems.length}</span>
                                    )}
                                </a>
                            </Link>
                            <Link href="/login">
                                <a className="p-2">Login</a>
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
