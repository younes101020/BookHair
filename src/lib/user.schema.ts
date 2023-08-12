import { z } from "zod";

const userSchema = z.object({
    nom: z.string({
        required_error: "Le nom est obligatoire"
    }).min(3, {
        message: "Le nom est trop court"
    }),
    prenom: z.string({
        required_error: "Le prenom est obligatoire"
    }).min(3, {
        message: "Le prenom est trop court"
    }),
    email: z.string({
        required_error: "L'adresse de messagerie est obligatoire",
        invalid_type_error: "L'adresse de messagerie doit être une chaîne de caractère"
    }).email(),
    telephone: z.string().regex(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/, "Numero invalide"),
    adresse: z.optional(z.string()),
    mot_de_passe: z.string({
        required_error: "Le mot de passe est obligatoire"
    }).regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, {
        message: "Exigence min: Azerty-02."
    }),
    confirm: z.string(),
    profile: z.string(),
});

export const registerSchema = userSchema.refine((data) => data.mot_de_passe === data.confirm, {
        message: "Les deux mots de passe ne correspondent pas",
        path: ["confirm"],
});

export type RegisterType = z.infer<typeof registerSchema>;

export const bodyLoginSchema = userSchema.pick({ 
    email: true,
    mot_de_passe: true
});

// export async function withValidate(action: any) {
//     return async (formData: FormData) => {
//       'use server'
//       const {nom, prenom, email, telephone, mot_de_passe, adresse} = Object.fromEntries(formData.entries())
        
//       const test = registerUserSchema.safeParse({nom, prenom, email, telephone, mot_de_passe, adresse})
//       console.log(test)
//     //   if (ZodError) {
//     //     return { error: ZodError.format() }
//     //   }
   
//     //   const data = process(formData)
//       return action(formData)
//     }
//   }