import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/CartActions';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../Components/Layout';

export default function PaymentScreen() {
    const router = useRouter();
    const dispatch = useDispatch();
    const { paymentMethod, shippingAddress } = useSelector((state) => state.cart);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        if (!selectedPaymentMethod) {
            return;
        }
        dispatch(savePaymentMethod(selectedPaymentMethod));
    };
    useEffect(() => {
        if (!shippingAddress) {
            router.push('/shipping');
        }
    }, []);

    useEffect(() => {
        if (paymentMethod) {
            setSelectedPaymentMethod(paymentMethod);
        }
    }, [paymentMethod]);

    return (
        <Layout title={'Payment Method'}>
            <CheckoutWizard activeStep={2} />
            <form className="mx-auto max-w-screen-md" onSubmit={submitHandler}>
                <h1 className="mb-4 text-xl">Payment Method</h1>
                {['Paypal', 'Stripe', 'CashOnDelivery'].map((payment) => {
                    return (
                        <div key={payment} className="mb-4">
                            <input
                                type={'radio'}
                                name={'paymentMethod'}
                                className="p-2 outline-none focus:ring-0"
                                id={payment}
                                checked={payment === selectedPaymentMethod}
                                onChange={() => setSelectedPaymentMethod(payment)}
                            />
                            <label htmlFor={payment} className="p-2">
                                {payment}
                            </label>
                        </div>
                    );
                })}
                <div className="flex justify-between">
                    <button type="button" className="default-button" onClick={() => router.back()}>
                        Back
                    </button>
                    <button className="primary-button">Next</button>
                </div>
            </form>
        </Layout>
    );
}
PaymentScreen.auth = true;
