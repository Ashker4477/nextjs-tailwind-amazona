import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import Layout from '../../components/Layout';
import { AddToCart } from '../../actions/CartActions';
import Product from '../../models/Product';
import db from '../../utils/db';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function ProductScreen(props) {
    const { product } = props;
    const dispatch = useDispatch();
    const router = useRouter();
    const { cartItems } = useSelector((state) => state.cart);

    const AddToCartHandler = async () => {
        let existItem = cartItems.find((item) => item.slug == product.slug);
        let qty = existItem ? existItem.qty + 1 : 1;
        const { data } = await axios.get(`/api/products/${product._id}`);
        if (data.countInStock < 1) {
            return toast.error('Product is Out of stock');
        }
        dispatch(AddToCart(data, qty));
        router.push('/cart');
    };

    if (!product) {
        return <Layout title={'Produt Not Found'}>Produt Not Found</Layout>;
    }
    return (
        <Layout title={product.name}>
            <div className="py-2">
                <Link href="/">back to products</Link>
            </div>
            <div className="grid md:grid-cols-4 md:gap-3">
                <div className="md:col-span-2">
                    <Image src={product.image} alt={product.name} width={640} height={640} layout="responsive"></Image>
                </div>
                <div>
                    <ul>
                        <li>
                            <h1 className="text-lg">{product.name}</h1>
                        </li>
                        <li>Category: {product.category}</li>
                        <li>Brand: {product.brand}</li>
                        <li>
                            {product.rating} of {product.numReviews} reviews
                        </li>
                        <li>Description: {product.description}</li>
                    </ul>
                </div>
                <div>
                    <div className="card p-5">
                        <div className="mb-2 flex justify-between">
                            <div>Price</div>
                            <div>${product.price}</div>
                        </div>
                        <div className="mb-2 flex justify-between">
                            <div>Status</div>
                            <div>{product.countInStock > 0 ? 'In stock' : 'Unavailable'}</div>
                        </div>
                        <button className="primary-button w-full" onClick={AddToCartHandler}>
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export async function getServerSideProps(context) {
    const { params } = context;
    const { slug } = params;
    await db.connect();
    const product = await Product.findOne({ slug }, { __v: 0 }).lean();
    await db.disconnect();
    return {
        props: {
            product: product ? db.convertDocToObj(product) : '',
        },
    };
}
