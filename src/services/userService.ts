import isSamePass from "@/lib/bcrypt/compare";
import UserRepository from "@/repositories/userRepository";

export default class UserService {

    async Login(email: string, mot_de_passe: string) {
        try {
            const userRepository = new UserRepository();
            const user = await userRepository.getUserByEmail(email);
            console.log(user)
            if (!user) {
                throw new Error("No user found with this email");
            }
            
            // @ts-ignore
            const checkPass = await isSamePass(mot_de_passe, user?.password as string);

            if (!checkPass) {
                throw new Error("Password don't match");
            }

            return user;

        } catch (error) {
            throw new Error('No consumer found')
        }
    }

}