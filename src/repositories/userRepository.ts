import { prisma } from '@/db';
import { incidentNotification } from '@/lib/utils'
// 'P2025' code erro is fromù

export default class UserRepository {

    async getCoiffeurByEmail( email: string ) {
        try {
            const coiffeur = await prisma.coiffeur.findUnique({
                where: {
                    email: email,
                },
            })
            return coiffeur;
        } catch (error: any) {
            incidentNotification(error);
        }
    }

    async getUserByEmail( email: string ) {
        try {
            const user = await prisma.user.findUnique({
                where: {
                  email: email,
                },
            })
            return user;
        } catch (error: any) {
            incidentNotification(error);
        }
    }

    async getAllUsers() {
        try {
            const user = await prisma.user.findMany();
            return user;
        } catch (error: any) {
            incidentNotification(error);
        }
    }
}