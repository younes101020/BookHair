import { ReservationRepository } from "@/config/contract";
import { ReservationDto } from "@/config/dto";
import { PORTS } from "@/config/ports";
import { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";
import "reflect-metadata";

@injectable()
export default class PrismaReservationRepository implements ReservationRepository {

    constructor(@inject(PORTS.PrismaClient) private readonly _db: PrismaClient) {}

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