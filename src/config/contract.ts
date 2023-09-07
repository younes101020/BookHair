import { ClientDto, CoiffeurDto } from "./dto";

export interface ClientRepository {
    getClientByEmail(email: string): Promise<ClientDto>;
}

export interface CoiffeurRepository {
    get(id: string): Promise<CoiffeurDto>;
}