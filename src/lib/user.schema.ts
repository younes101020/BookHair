import { z } from "zod";

export const registerUserSchema = z.object({
    nom: z.string({
        required_error: "Le nom est obligatoire"
    }).min(3, {
        message: "Le nom est trop court"
    }),
    prenom: z.string({
        required_error: "Le prenom est obligatoire"
    }).min(3, {
        message: "Le nom est trop court"
    }),
    email: z.string({
        required_error: "L'adresse de messagerie est obligatoire",
        invalid_type_error: "L'adresse de messagerie doit être une chaîne de caractère"
    }).email(),
    mot_de_passe: z.string({
        required_error: "Le mot de passe est obligatoire"
    }).regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, {
        message: "Le mot de passe doit contenir au minimum 8 caractères dont au moins une lettre majuscule et minuscule et un chiffre."
    }),
    confirm: z.string()
}).refine((data) => data.mot_de_passe === data.confirm, {
        message: "Les deux mots de passe ne correspondent pas",
        path: ["confirm"],
});