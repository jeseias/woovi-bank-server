import type { User } from "domain/entities";
import type { UserRepository } from "domain/repositories/users";
import type { CryptoRepository } from "domain/services";
import { AuthHelpers } from "../auth.helpers";

export interface ILoginUserParams {
  [User.Fields.Tax_Id]: string;
  [User.Fields.Password]: string;
}

type Response = Promise<
  | {
      user: User.Model;
      token: string;
    }
  | Error
>;

export class LoginUserUseCase extends AuthHelpers {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cryptoRepository: CryptoRepository
  ) {
    super();
  }

  async execute(params: ILoginUserParams): Response {
    const user = await this.userRepository.findUser({
      tax_id: params["tax_id"],
    });

    if (!user) {
      return new Error("Wrong credentials");
    }

    const isValidPassword = await this.cryptoRepository.compare({
      value: params["password"],
      hash: user["password"],
    });

    if (!isValidPassword) {
      return new Error("Wrong credentials");
    }

    const token = await this.cryptoRepository.encrypt(
      { id: user["id"] },
      this.generationTokenExpirationDate()
    );

    return {
      user,
      token,
    };
  }
}
