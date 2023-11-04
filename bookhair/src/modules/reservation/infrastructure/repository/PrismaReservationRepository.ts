import { ReservationRepository } from "@/config/contract";
import { ClientDto, ReservationDto, CoiffeurDto } from "@/config/dto";
import { PORTS } from "@/config/ports";
import { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";
import "reflect-metadata";

@injectable()
export default class PrismaReservationRepository implements ReservationRepository {

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

    async getReservationByUserId( id: string ): Promise<ReservationDto> {
        try {
            const reservations = await this._db.reservation.findMany({
                where: {
                    user_id: id,
                },
                include: {
                    serviceDetails: {
                        include: {
                            service: true,
                            coiffeur: true,
                        },
                    },
                },
            })
            return reservations as any;
        } catch (error: any) {
            //incidentNotification(error);
            throw new Error(error)
        }
    }
}