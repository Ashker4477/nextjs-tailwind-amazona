import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import Layout from '../../components/Layout';
import data from '../../utils/data';
import { AddToCart } from '../../actions/CartActions';

export default function ProductScreen() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { query } = useRouter();
    const { slug } = query;
    const product = data.products.find((x) => x.slug === slug);

    const { cartItems } = useSelector((state) => state.cart);

    const AddToCartHandler = () => {
        let existItem = cartItems.find((item) => item.slug == product.slug);
        let qty = existItem ? existItem.qty + 1 : 1;
        if (product.countInStock < 1) {
            alert('Product is Out of stock');
            return;
        }
        dispatch(AddToCart(product, qty));
        router.push('/cart');
    };

    if (!product) {
        return <div>Produt Not Found</div>;
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
