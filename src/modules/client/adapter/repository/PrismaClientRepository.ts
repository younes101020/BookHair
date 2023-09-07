import { ClientRepository } from "@/config/contract";
import { PrismaClient } from "@prisma/client";
import { injectable } from "inversify";
import "reflect-metadata";

@injectable()
export default class PrismaClientRepository implements ClientRepository {

    constructor(private readonly _db: PrismaClient) {}

    async getClientByEmail( email: string ) {
        try {
            const client = await this._db.user.findUnique({
                where: {
                  email: email,
                },
            })
            return client;
        } catch (error: any) {
            //incidentNotification(error);
        }
    }
}