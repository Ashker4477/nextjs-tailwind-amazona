import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../components/Layout';
import { XCircleIcon } from '@heroicons/react/outline';
import { AddToCart, RemoveFromCart } from '../actions/CartActions';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast } from 'react-toastify';

function CartScreen() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { cartItems } = useSelector((state) => state.cart);

    const removeItemHandler = (item) => {
        dispatch(RemoveFromCart(item));
    };
    const updateCartHandler = async (e, item) => {
        let qty = Number(e.target.value);
        const { data } = await axios.get(`/api/products/${item._id}`);
        if (data.countInStock < 1) {
            return toast.error('Product is Out of stock');
        }
        dispatch(AddToCart(item, qty));
        return toast.success('Product Updated in Cart');
    };
    return (
        <Layout title={'Shopping Cart'}>
            <h1 className="mb-4 text-xl">Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <div>
                    Cart is Empty. <Link href={'/'}>Go Shopping</Link>
                </div>
            ) : (
                <div className="grid md:grid-cols-4 md:gap-5">
                    <div className="overflow-x-auto md:col-span-3">
                        <table className="min-w-full">
                            <thead className="border-b">
                                <tr>
                                    <th className="p-5 text-left">Item</th>
                                    <th className="p-5 text-right">Quantity</th>
                                    <th className="p-5 text-right">Price</th>
                                    <th className="p-5">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item, index) => {
                                    return (
                                        <tr key={index} className="border-b">
                                            <td>
                                                <Link href={`/product/${item.slug}`}>
                                                    <a className="flex items-center">
                                                        <Image src={item.image} alt={item.name} width={50} height={50}></Image>
                                                        &nbsp;
                                                        {item.name}
                                                    </a>
                                                </Link>
                                            </td>
                                            <td className="p-5 text-right">
                                                <select value={item.qty} onChange={(e) => updateCartHandler(e, item)}>
                                                    {[...Array(item.countInStock).keys()].map((x) => {
                                                        return (
                                                            <option key={x + 1} value={x + 1}>
                                                                {x + 1}
                                                            </option>
                                                        );
                                                    })}
                                                </select>
                                            </td>
                                            <td className="p-5 text-right">{item.price}</td>
                                            <td className="p-5 text-center">
                                                <button type="button" onClick={() => removeItemHandler(item)}>
                                                    <XCircleIcon className="h-5 w-5"></XCircleIcon>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="">
                        <ul className="card p-5">
                            <li>
                                <div className="pb-3 text-xl">
                                    Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)}) : ${cartItems.reduce((a, c) => a + c.qty * c.price, 0)}
                                </div>
                            </li>
                            <li>
                                <button onClick={() => router.push('login?redirect=/shipping')} className="primary-button w-full">
                                    Check Out
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </Layout>
    );
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
