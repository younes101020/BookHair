import { CoiffeurRepository } from "@/config/contract";
import { CoiffeurDto } from "@/config/dto";
import { PORTS } from "@/config/ports";
import { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";
import "reflect-metadata";

@injectable()
export default class PrismaCoiffeurRepository implements CoiffeurRepository {

    constructor(@inject(PORTS.PrismaClient) private readonly _db: PrismaClient) {}

    async getCoiffeurById( id: string ): Promise<CoiffeurDto> {
        try {
            const coiffeur = await this._db.coiffeur.findUnique({
                where: {
                  id: id,
                },
            })
            return coiffeur as CoiffeurDto;
        } catch (error: any) {
            //incidentNotification(error);
            throw new Error(error)
        }
    }
}