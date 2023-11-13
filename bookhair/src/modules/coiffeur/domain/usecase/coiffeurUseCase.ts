import { injectable, inject } from "inversify";
import { PORTS } from "@/config/ports";
import "reflect-metadata";
import type { CoiffeurRepository } from "@/config/contract";
import 'moment/locale/fr';

@injectable()
export default class coiffeurUseCase {

    private _coiffeurRepo:  CoiffeurRepository

    public constructor(
        @inject(PORTS.CoiffeurRepository) coiffeurRepo: CoiffeurRepository
    ) {
        this._coiffeurRepo = coiffeurRepo
    }

    public async getCoiffeur(id: string) {
        const reservations = await this._coiffeurRepo.getCoiffeurById(id)
        
    }
}