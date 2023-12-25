import getCurrentUser from '@/actions/getCurrentUser';
import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {

    const CurrentUser = await getCurrentUser();

    if (!CurrentUser || CurrentUser.Role !== 'ADMIN') {
        return NextResponse.error();
    };

    const body = await request.json();
    const { name, description, price, brand, category, inStock, images } = body;

    const product = await prisma.product.create({
        data: {
            name, description, brand, category, inStock, images, price: parseFloat(price)
        }
    });

    return NextResponse.json(product);
}