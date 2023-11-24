const PORTS = {
  //db
  PrismaClient: Symbol.for("PrismaClient"),
  //domain
  ClientRepository: Symbol.for("ClientRepository"),
  ReservationRepository: Symbol.for("ReservationRepository"),
  CoiffeurRepository: Symbol.for("CoiffeurRepository"),
};

export { PORTS };
