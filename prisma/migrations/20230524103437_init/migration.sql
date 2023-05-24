-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mot_de_passe" TEXT NOT NULL,
    "numero_telephone" TEXT NOT NULL,
    "adresse" TEXT NOT NULL,
    "date_creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_modification" TIMESTAMP(3),

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coiffeur" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mot_de_passe" TEXT NOT NULL,
    "numero_telephone" TEXT NOT NULL,
    "adresse" TEXT NOT NULL,
    "date_creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_modification" TIMESTAMP(3),

    CONSTRAINT "Coiffeur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "duree" INTEGER NOT NULL,
    "date_creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_modification" TIMESTAMP(3),

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceDetails" (
    "id" TEXT NOT NULL,
    "prix" DOUBLE PRECISION NOT NULL,
    "coiffeur_id" TEXT NOT NULL,
    "service_id" TEXT NOT NULL,
    "date_creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_modification" TIMESTAMP(3),

    CONSTRAINT "ServiceDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "id" TEXT NOT NULL,
    "date_reserv" TIMESTAMP(3) NOT NULL,
    "client_id" TEXT NOT NULL,
    "service_details_id" TEXT NOT NULL,
    "date_creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_modification" TIMESTAMP(3),

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Commentaire" (
    "id" TEXT NOT NULL,
    "commentaire" TEXT NOT NULL,
    "note" INTEGER NOT NULL,
    "date_com" TIMESTAMP(3) NOT NULL,
    "client_id" TEXT NOT NULL,
    "coiffeur_id" TEXT NOT NULL,
    "date_creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_modification" TIMESTAMP(3),

    CONSTRAINT "Commentaire_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Client_numero_telephone_key" ON "Client"("numero_telephone");

-- CreateIndex
CREATE UNIQUE INDEX "Coiffeur_email_key" ON "Coiffeur"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Coiffeur_numero_telephone_key" ON "Coiffeur"("numero_telephone");

-- AddForeignKey
ALTER TABLE "ServiceDetails" ADD CONSTRAINT "ServiceDetails_coiffeur_id_fkey" FOREIGN KEY ("coiffeur_id") REFERENCES "Coiffeur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceDetails" ADD CONSTRAINT "ServiceDetails_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_service_details_id_fkey" FOREIGN KEY ("service_details_id") REFERENCES "ServiceDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commentaire" ADD CONSTRAINT "Commentaire_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commentaire" ADD CONSTRAINT "Commentaire_coiffeur_id_fkey" FOREIGN KEY ("coiffeur_id") REFERENCES "Coiffeur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
