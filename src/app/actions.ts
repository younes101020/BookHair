'use server'

import { prisma } from "@/db";
var bcrypt = require('bcryptjs');
// import { withValidate } from "@/lib/form-validation";

export async function addUser(user: any) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(user.mot_de_passe, salt);

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