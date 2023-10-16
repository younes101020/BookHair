import { prisma } from '@/db';
//import { PrismaClient } from '@prisma/client';
import { Container } from 'inversify'; 
import { ClientRepository, ReservationRepository } from './contract';
import PrismaClientRepository from '@/modules/client/infrastructure/repository/PrismaClientRepository';
import { PORTS } from './ports';
import userUseCase from '@/modules/client/domain/usecase/userUseCase';
import reservationUseCase from '@/modules/reservation/domain/usecase/reservationUseCase';
import PrismaReservationRepository from '@/modules/reservation/infrastructure/repository/PrismaReservationRepository';

const container = new Container()
container.bind(PORTS.PrismaClient).toConstantValue(prisma);
container.bind<ClientRepository>(PORTS.ClientRepository).to(PrismaClientRepository)
container.bind<ReservationRepository>(PORTS.ReservationRepository).to(PrismaReservationRepository)
container.bind<userUseCase>(userUseCase).toSelf();
container.bind<reservationUseCase>(reservationUseCase).toSelf();

export { container }