//Webhook Endpoint

import { buffer } from "micro";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import prisma from '@/libs/prismadb';

export const config = {
    api: {
        bodyParser: false
    }
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: '2023-10-16' });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const buf: any = await buffer(req);
    const signature = req.headers['stripe-signature']

    if (!signature) { return res.status(400).send('Missing stripe Signature') };
    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(buf, signature, process.env.STRIPE_WEBHOOK_SECRET!);
    } catch (error) {
        return res.status(400).send('Webhook Error' + error);
    }

    switch (event.type) {
        case 'charge.succeeded':
            const charge: any = event.data.object as Stripe.Charge;

            if (typeof charge.payment_intent === 'string') {
                await prisma?.order.update({
                    where: { paymentIntentId: charge.payment_intent },
                    data: { status: 'complete', address: charge.shipping?.address }
                });
            };
            break;
        default:
            'success';            
    };
    res.json({ received: true })
}