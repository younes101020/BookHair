"use server";

import { prisma } from "@/db";
import hashPass from "@/shared/lib/bcrypt/hash";
import { RegisterType } from "@/shared/lib/zod/user.schema";
// import { withValidate } from "@/lib/form-validation";

export async function addUser(user: RegisterType) {
  var hash = await hashPass(user.mot_de_passe);
  try {
    const status = await prisma.user.create({
      data: {
        name: user.nom,
        lastname: user.prenom,
        email: user.email,
        password: hash,
        phone: user.telephone,
      },
    });
    return status;
  } catch ({ code }: any) {
    if (code === "P2002") return { error: "L'utilisateur existe déjà" };
  }
}
