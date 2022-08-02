import Layout from '../components/Layout';
import ProductItem from '../components/ProductItem';
import db from '../utils/db';
import Product from '../models/Product';
import { useDispatch, useSelector } from 'react-redux';
import { AddToCart } from '../actions/CartActions';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Home({ products }) {
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart);
    const AddToCartHandler = async (product) => {
        let existItem = cartItems.find((item) => item.slug == product.slug);
        let qty = existItem ? existItem.qty + 1 : 1;
        const { data } = await axios.get(`/api/products/${product._id}`);
        if (data.countInStock < 1) {
            return toast.error('Product is Out of stock');
        }
        dispatch(AddToCart(product, qty));
        return toast.success('Product Added to Cart');
    };

    return (
        <>
            <Layout title="Home Page">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {products.map((product) => (
                        <ProductItem product={product} key={product.slug} AddToCartHandler={AddToCartHandler}></ProductItem>
                    ))}
                </div>
            </Layout>
        </>
    );
}

export async function getServerSideProps() {
    await db.connect();
    const products = await Product.find({}, { __v: 0 }).lean();
    await db.disconnect();
    return {
        props: {
            products: products.map(db.convertDocToObj),
        },
    };
}
