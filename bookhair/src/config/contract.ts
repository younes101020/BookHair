import { ClientDto, CoiffeurDto, ReservationDto } from "./dto";

export interface ClientRepository {
    getClientByEmail(email: string): Promise<ClientDto>;
}

export interface CoiffeurRepository {
    getCoiffeurById(id: string): Promise<CoiffeurDto>;
}

export interface ReservationRepository {
    getReservationByUserId(id: string): Promise<ReservationDto>; 
}