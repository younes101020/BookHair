import { prisma } from '@/db';

export default class UserRepository {

    async getUserByEmail( email: string ) {
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

    async getAllUsers() {
        try {
            const user = await prisma.user.findMany();
            return user;
        } catch (error: any) {
            return error;
        }
    }
}