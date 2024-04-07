"use server";

import { prisma } from "@/db";
import hashPass from "@/shared/lib/bcrypt/hash";
import { redirect } from "next/navigation";
// import { withValidate } from "@/lib/form-validation";

export async function addUser(user: any) {
  var hash = await hashPass(user.mot_de_passe);
  const isUserExist = await prisma.user.findUnique({
    where: {
      email: user.email,
    },
  });
  if (isUserExist) throw new Error("User already exist");
  await prisma.user.create({
    data: {
      name: user.nom,
      lastname: user.prenom,
      email: user.email,
      password: hash,
      phone: user.telephone,
    },
  });
  redirect('/login?success=true');
}
