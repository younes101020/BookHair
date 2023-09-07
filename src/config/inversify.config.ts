import { prisma } from '@/db';
import { PrismaClient } from '@prisma/client';
import { Container } from 'inversify'; 
import { ClientRepository } from './contract';
import PrismaClientRepository from '@/modules/client/adapter/repository/PrismaClientRepository';
import { PORTS } from './ports';

const container = new Container()
container.bind<ClientRepository>(PORTS.ClientRepository).to(PrismaClientRepository)
container.bind<PrismaClient>("PrismaClient").toConstantValue(prisma);
const test = container.get<ClientRepository>(PORTS.ClientRepository);
console.log(test.getClientByEmail('younes@gmail.com'))