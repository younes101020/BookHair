import isSamePass from "@/lib/bcrypt/compare";
import UserRepository from "@/repositories/userRepository";

export default class UserService {

    async Login(email: string, mot_de_passe: string) {
        try {
            const userRepository = new UserRepository();
            const [user, coiffeur] = await Promise.all([userRepository.getUserByEmail(email), userRepository.getCoiffeurByEmail(email)]);
            if (!user && !coiffeur) {
                throw new Error("No consumer found with this email");
            }
            const consumer = user ?? coiffeur;
            // @ts-ignore
            const checkPass = await isSamePass(mot_de_passe, consumer?.password as string);

            if (!checkPass) {
                throw new Error("Password don't match");
            }

            return consumer;

        } catch (error: any) {
            throw new Error(error.message)
        }
    }

}