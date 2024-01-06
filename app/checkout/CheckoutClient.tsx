'use client';
import { useCallback, useEffect, useState } from 'react';
import { useCart } from '@/hooks/useCart'
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { StripeElementsOptions, loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { FiCheckCircle } from 'react-icons/fi';
import ButtonDesign from '../components/ButtonDesign';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

const CheckoutClient = () => {
    const { cartProducts, paymentIntent, handleSetPaymentIntent } = useCart();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [clientSecret, setClientSecret] = useState('');
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const router = useRouter();

    useEffect(() => {
        //create a payment as soon as the page loads
        if (cartProducts) {
            setLoading(true);
            setError(false);

            //calling the api
            fetch('/api/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({
                    items: cartProducts,
                    payment_intent_id: paymentIntent
                })
            }).then((res) => {
                setLoading(false);
                if (res.status === 401) {
                    return router.push('/login');
                }
                return res.json();
            }).then((data) => {
                setClientSecret(data.paymentIntent.client_secret);
                handleSetPaymentIntent(data.paymentIntent.id);
            }).catch((err) => {
                setError(true);
                toast.error("Something went wrong, please try again");
            })
        }
    }, [cartProducts, paymentIntent]);

    const options: StripeElementsOptions = {
        clientSecret,
        appearance: {
            theme: 'stripe',
            labels: 'floating'
        }
    };

    const handleSetPaymentSuccess = useCallback((value: boolean) => {
        setPaymentSuccess(value);
    }, []);

    return (
        <div className='w-full'>            
            {loading && (
                <div className='text-center'>Loading Checkout...</div>
            )}
            {clientSecret && cartProducts && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm clientSecret={clientSecret} handleSetPaymentSuccess={handleSetPaymentSuccess} />
                </Elements>
            )}
            {error && (
                <div className='text-center text-rose-500'>Something went wrong</div>
            )}
            {paymentSuccess && (
                <div className='flex items-center flex-col gap-4'>
                        <div className='text-teal-500 text-center'><FiCheckCircle /> Payment Success</div>
                    <div className='max-w-[220px] w-full'>
                        <ButtonDesign label='View Your Orders' onClick={()=> router.push('/orders')} />                    
                    </div>
                </div>
            )}
        </div>
    )
}

export default CheckoutClient