import getCurrentUser from '@/actions/getCurrentUser';
import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';

export async function PUT(request: Request) {
    const CurrentUser = await getCurrentUser();

    if(!CurrentUser) { return NextResponse.error(); }
    //@ts-ignore
    if (CurrentUser.Role !== 'ADMIN') { return NextResponse.error(); }

    const body = await request.json();

    const { id, deliveryStatus } = body;
    const order = await prisma.order.update({
        where: { id: id },
        data: { deliveryStatus }
    });

    return NextResponse.json(order);
};