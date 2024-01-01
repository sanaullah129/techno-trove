import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import prisma from '@/libs/prismadb';
import { NextResponse } from "next/server";

export async function getSession() {
    return await getServerSession(authOptions);
};

export default async function getCurrentUser() {
    try {
        const session = await getSession();
        
        if(!session?.user?.email){
            return null;
        };

        const currentUser = await prisma.user.findUnique({
            where: {email: session.user.email}
        });

        if(!currentUser){
            return null
        };

        return{
            ...currentUser,
            createdAt: currentUser.CreatedAt.toISOString(),
            updatedAt: currentUser.UpdatedAt.toISOString(),
            emailVerified: currentUser.emailVerified?.toString() || null
        }

    } catch (error) {
        return NextResponse.error();
    }
}