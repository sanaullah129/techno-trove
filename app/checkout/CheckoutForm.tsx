'use client';

import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/utils/formatElements";
import { AddressElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import HeadingDesign from "../components/HeadingDesign";
import ButtonDesign from "../components/ButtonDesign";

interface CheckoutFormProps {
    clientSecret: string,
    handleSetPaymentSuccess: (value: boolean) => void
};

const CheckoutForm: React.FC<CheckoutFormProps> = ({ clientSecret, handleSetPaymentSuccess }) => {

    const { cartTotalAmount, handleClearCart, handleSetPaymentIntent } = useCart();
    const [isLoading, setIsLoading] = useState(false);

    const stripe = useStripe();
    const elements = useElements();
    const formattedPrice = formatPrice(cartTotalAmount);

    useEffect(() => {
        if (!stripe) { return };
        if (!clientSecret) { return };
        handleSetPaymentSuccess(false);
    }, [stripe]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!stripe || !elements) { return };
        setIsLoading(true);

        stripe.confirmPayment({
            elements, redirect: 'if_required'
        }).then(result =>{
            if(!result.error){
                toast.success("Checkout Successful");
                handleClearCart();
                handleSetPaymentSuccess(true);
                handleSetPaymentIntent(null);
            };
            setIsLoading(false);
        });
    };

    return (
        <form onSubmit={handleSubmit} id="payement-form" >
            <div className="mb-6">
                <HeadingDesign title="Enter your payment details to checkout" />
                
                <h2 className="font-semibold mt-4 mb-2" >Address Information</h2>
                <AddressElement options={{mode: 'shipping', allowedCountries: ['IN', 'US']}} />
                <h2 className="font-semibold mt-4 mb-2" >Payment Information</h2>
                <PaymentElement id="payment-element" options={{layout: 'tabs'}} />
                <div className="py-4 text-center text-xl font-bold text-slate-600">Total: {formattedPrice}</div>
                <ButtonDesign
                    label={isLoading ? 'Processing':'Pay Now'} 
                    disabled={isLoading || !stripe || !elements}
                    onClick={()=>{}}
                 />
            </div>
        </form>
    )
}

export default CheckoutForm