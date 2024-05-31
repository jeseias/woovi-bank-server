import type { AccountRepository } from "domain/repositories/accounts";
import type { UserRepository } from "domain/repositories/users";
import type { CreateUserRepository } from "domain/repositories/users/create-user-repository";
import type { CryptoRepository } from "domain/services";
import { AuthHelpers } from "../auth-helpers/auth-helpers";
import { Account } from "@/domain/entities";

export class RegisterUserUseCase extends AuthHelpers {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly accountRepository: AccountRepository,
    private readonly cryptoRepository: CryptoRepository
  ) {
    super();
  }

  async execute(params: CreateUserRepository.Params) {
    try {
      const userAlreadyExists = await this.userRepository.findUser({
        tax_id: params["tax_id"],
      });

      if (userAlreadyExists) {
        return new Error("User already exists");
      }

      const hashedPassword = await this.cryptoRepository.hash(
        params["password"]
      );
      const user = await this.userRepository.createUser({
        ...params,
        password: hashedPassword,
      });

      const account_number = Account.generateAccountNumber();
      await this.accountRepository.createAccount({
        user_id: user["id"],
        account_number,
      });

      const token = await this.cryptoRepository.encrypt(
        { id: user["id"] },
        this.generationTokenExpirationDate()
      );

      return {
        user,
        token,
      };
    } catch (error) {
      console.log(error);
    }
  }
}
