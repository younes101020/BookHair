import { injectable, inject } from "inversify";
import isSamePass from "@/shared/lib/bcrypt/compare";
import { PORTS } from "@/config/ports";
import "reflect-metadata";
import type { ReservationRepository } from "@/config/contract";

@injectable()
export default class reservationUseCase {

    private _reservationRepo:  ReservationRepository

    public constructor(
        @inject(PORTS.ReservationRepository) reservationRepo: ReservationRepository
    ) {
        this._reservationRepo = reservationRepo
    }

    public async getReservations(id: string) {
        const reservations = await this._reservationRepo.getReservationByUserId(id)
        //const servicedetails = await reservations.serviceDetails();

        if(!reservations) {
            throw new Error("No reservations found")
        }

        //const date_reserv = new Date(reservations.date_reserv)
        //const date = date_reserv.toLocaleDateString()
        
        return reservations
    }
}