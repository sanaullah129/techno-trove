import Stripe from 'stripe';
import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';
import { CartProductType } from '@/app/product/[productId]/ProductDetails';
import getCurrentUser from '@/actions/getCurrentUser';

const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}` as string, {
    apiVersion: '2023-10-16',
});

const calculateOrderAmount = (items: CartProductType[]) => {
    const totalPrice = items.reduce((acc, item) => {
        const itemTotal = item.price * item.quantity;
        return acc + itemTotal;
    }, 0);
    const price: any = Math.floor(totalPrice);
    return price;
};

export async function POST(request: Request) {
    
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    };

    const body = await request.json();
    const { items, payment_intent_id } = body; //destructuring body
    const total: number = calculateOrderAmount(items);

    const orderData = {
        user: { connect: { id: currentUser.id } },
        amount: total,
        currency: 'INR',
        status: 'pending',
        deliveryStatus: 'pending',
        paymentIntentId: payment_intent_id,
        products: items
    };

    if (payment_intent_id) {
        //if intent exists updating it
        const currentIntent = await stripe.paymentIntents.retrieve(payment_intent_id);
        if (currentIntent) {
            const updatedIntent = await stripe.paymentIntents.update(payment_intent_id, { amount: total });
            //if payment intent exists updating the order
            const [exisingOrder, updateOrder] = await Promise.all([
                prisma.order.findFirst({ where: { paymentIntentId: payment_intent_id } }),
                prisma.order.update({
                    where: { paymentIntentId: payment_intent_id },
                    data: { amount: total, products: items }
                })
            ]);
            if (!exisingOrder) {
                return NextResponse.error();
            }
            return NextResponse.json({ paymentIntent: updatedIntent });
        }
    } else {
        //create the payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: total,
            currency: 'INR',
            automatic_payment_methods: { enabled: true },
        });

        //create the order
        orderData.paymentIntentId = paymentIntent.id;

        await prisma.order.create({
            data: orderData,
        });
        return NextResponse.json({ paymentIntent });
    };
    return NextResponse.error();
};