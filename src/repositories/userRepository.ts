import { prisma } from '@/db';
// 'P2025' code erro is fromù

export default class UserRepository {

    async getUserByEmail( email: string ) {
        try {
            const user = await prisma.user.findUnique({
                where: {
                  email: email,
                },
            })
            if(!user) {
                const coiffeur = await prisma.coiffeur.findUniqueOrThrow({
                    where: {
                      email: email,
                    },
                })
                return coiffeur
            }
            return user;
        } catch (error: any) {
            throw new Error('No consumer found')
        }
    }

    async getAllUsers() {
        try {
            const user = await prisma.user.findMany();
            return user;
        } catch (error: any) {
            return error;
        }
    }
}