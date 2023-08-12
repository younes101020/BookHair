import { prisma } from '@/db';

export async function getUser( email: string ) {
    try {
        const user = await prisma.user.findUnique({
            where: {
              email: email,
            },
        })
        return user;
    } catch (error: any) {
        return error;
    }
}