import { injectable, inject } from "inversify";
import { PORTS } from "@/config/ports";
import "reflect-metadata";
import type { ReservationRepository } from "@/config/contract";
import moment from "moment";
import "moment/locale/fr";

@injectable()
export default class reservationUseCase {
  private _reservationRepo: ReservationRepository;

  public constructor(
    @inject(PORTS.ReservationRepository) reservationRepo: ReservationRepository,
  ) {
    this._reservationRepo = reservationRepo;
  }

  public async getReservations(id: string) {
    const reservations = await this._reservationRepo.getReservationByUserId(id);
    //const servicedetails = await reservations.serviceDetails();

    if (!reservations) {
      throw new Error("No reservations found");
    }

    const formated = reservations.map((elem: any) => {
      const date_reserv = moment(elem.date_reserv)
        .locale("fr")
        .format("dddd D MMM. HH:mm");
      const date_creation = moment(elem.date_creation)
        .locale("fr")
        .format("dddd D MMM. HH:mm");
      //const date_creation = moment(elem.date_creation).locale('fr').format('dddd D MMM. HH:mm');
      return {
        ...elem,
        date_reserv,
        date_creation,
      };
    });

    return formated;
  }
}
