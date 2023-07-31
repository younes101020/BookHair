'use server'

import { prisma } from "@/db";
import hashPass from "@/lib/bcrypt/hash";
// import { withValidate } from "@/lib/form-validation";

export async function addUser(user: any) {
    var hash = await hashPass(user.mot_de_passe);

    const client = await prisma.user.create({
        data: {
            name: user.nom,
            lastname: user.prenom,
            email: user.email,
            password: hash,
            phone: user.telephone,
        },
    })
}