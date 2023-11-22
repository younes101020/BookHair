import { injectable, inject } from "inversify";
import isSamePass from "@/shared/lib/bcrypt/compare";
import { PORTS } from "@/config/ports";
import "reflect-metadata";
import type { ClientRepository } from "@/config/contract";

@injectable()
export default class userUseCase {
  private _userRepo: ClientRepository;

  public constructor(
    @inject(PORTS.ClientRepository) userRepo: ClientRepository,
  ) {
    this._userRepo = userRepo;
  }

  public async login(email: string, mot_de_passe: string) {
    const user = await this._userRepo.getClientByEmail(email);

    if (!user) {
      throw new Error("No user found");
    }

    const isLogin = await isSamePass(mot_de_passe, user.password);

    if (!isLogin) {
      throw new Error("Wrong password");
    }

    return user;
  }
}
