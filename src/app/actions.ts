'use server'

import { prisma } from "@/db";
// import { withValidate } from "@/lib/form-validation";

export async function addUser(data: any) {
    const { nom, prenom, email, mot_de_passe, telephone } = Object.fromEntries(data);
    const client = await prisma.client.create({
        data: {
            nom: nom,
            prenom: prenom,
            email: email,
            mot_de_passe: 'sdf',
            numero_telephone: '07...',
        },
    })
}

export async function getUser(data: unknown) {

}