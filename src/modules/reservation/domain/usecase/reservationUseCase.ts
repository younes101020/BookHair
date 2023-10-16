import { injectable, inject } from "inversify";
import { PORTS } from "@/config/ports";
import "reflect-metadata";
import type { ReservationRepository } from "@/config/contract";
import moment from "moment";

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

        const formated = reservations.map((elem: any) => {
            const dateMoment = moment(elem.date_reserv);
            dateMoment.locale('fr');
            const dateFormatee = dateMoment.format('dddd D MMM. HH:mm');
            return {
                ...elem,
                date_reserv: dateFormatee
            }})
        
        return formated;
    }
}