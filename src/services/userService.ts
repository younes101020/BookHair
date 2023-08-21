import isSamePass from "@/lib/bcrypt/compare";
import UserRepository from "@/repositories/userRepository";

export default class UserService {

    async Login(email: string, mot_de_passe: string) {
        try {
            const userRepository = new UserRepository();
            const user = await userRepository.getUserByEmail(email);

            if (!user) {
                throw new Error("No user found with this email");
            }

            const checkPass = await isSamePass(mot_de_passe, user?.password as string);

            if (!checkPass) {
                throw new Error("Password don't match");
            }

            return { user };

        } catch (error) {
            return error;
        }
    }

}