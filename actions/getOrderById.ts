import prisma from '@/libs/prismadb';


export default async function getOrderById(orderId: string) {
    try {
        const order = await prisma.order.findUnique({
            where: { id: orderId }
        });

        if (!order) { return null }
        else { return order }
    } catch (error: any) {
        throw new Error(error);
    }
}