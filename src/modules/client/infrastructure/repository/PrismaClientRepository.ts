import { ClientRepository } from "@/config/contract";
import { ClientDto, ReservationDto, CoiffeurDto } from "@/config/dto";
import { PORTS } from "@/config/ports";
import { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";
import "reflect-metadata";

@injectable()
export default class PrismaClientRepository implements ClientRepository {

    constructor(@inject(PORTS.PrismaClient) private readonly _db: PrismaClient) {}

    async getClientByEmail( email: string ): Promise<ClientDto> {
        try {
            const client = await this._db.user.findUnique({
                where: {
                  email: email,
                },
            })
            return client as ClientDto;
        } catch (error: any) {
            //incidentNotification(error);
            throw new Error(error)
        }
    }
}