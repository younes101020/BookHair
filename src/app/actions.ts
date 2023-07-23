'use server'

import { prisma } from "@/db";
// import { withValidate } from "@/lib/form-validation";

export async function addUser(user: any) {
    const client = await prisma.client.create({
        data: {
            name: user.nom,
            lastname: user.prenom,
            email: user.email,
            password: user.mot_de_passe,
            phone: user.telephone,
        },
    })
}

export async function getUser(data: unknown) {

}