import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, {params}: {params: {id: string}}){

    const CurrentUser = await getCurrentUser();
    if(!CurrentUser) { return NextResponse.error(); }
    //@ts-ignore
    if (CurrentUser.Role !== 'ADMIN') { return NextResponse.error(); }

    const product = await prisma?.product.delete({
        where: {id: params.id}
    });
    
    return NextResponse.json(product);
};