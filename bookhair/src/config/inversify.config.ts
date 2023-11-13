import { prisma } from '@/db';
//import { PrismaClient } from '@prisma/client';
import { Container } from 'inversify'; 
import { ClientRepository, ReservationRepository, CoiffeurRepository } from './contract';
import PrismaClientRepository from '@/modules/client/infrastructure/repository/PrismaClientRepository';
import { PORTS } from './ports';
import userUseCase from '@/modules/client/domain/usecase/userUseCase';
import reservationUseCase from '@/modules/reservation/domain/usecase/reservationUseCase';
import coiffeurUseCase from '@/modules/coiffeur/domain/usecase/coiffeurUseCase';
import PrismaReservationRepository from '@/modules/reservation/infrastructure/repository/PrismaReservationRepository';
import PrismaCoiffeurRepository from '@/modules/coiffeur/infrastructure/repository/PrismaCoiffeurRepository';

const container = new Container()
container.bind(PORTS.PrismaClient).toConstantValue(prisma);
container.bind<ClientRepository>(PORTS.ClientRepository).to(PrismaClientRepository)
container.bind<ReservationRepository>(PORTS.ReservationRepository).to(PrismaReservationRepository)
container.bind<CoiffeurRepository>(PORTS.CoiffeurRepository).to(PrismaCoiffeurRepository)
container.bind<userUseCase>(userUseCase).toSelf();
container.bind<reservationUseCase>(reservationUseCase).toSelf();
container.bind<coiffeurUseCase>(coiffeurUseCase).toSelf();


export { container }