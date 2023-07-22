'use server'

import { prisma } from "@/db";
// import { withValidate } from "@/lib/form-validation";

export async function addUser(user: any) {
    const client = await prisma.client.create({
        data: {
            nom: user.nom,
            prenom: user.prenom,
            email: user.email,
            mot_de_passe: user.mot_de_passe,
            numero_telephone: user.telephone,
        },
    })
}

export async function getUser(data: unknown) {

}