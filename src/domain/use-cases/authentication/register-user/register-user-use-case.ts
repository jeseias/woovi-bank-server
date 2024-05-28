import type { AccountRepository } from "domain/repositories/accounts";
import type { UserRepository } from "domain/repositories/users";
import type { CreateUserRepository } from "domain/repositories/users/create-user-repository";
import type { Cryptography } from "domain/services";

export class RegisterUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly accountRepository: AccountRepository,
    private readonly hashRepository: Cryptography.Hasher.Contract
  ) {}

  generateAccountNumber(): string {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomString = "";
    for (let i = 0; i < 6; i++) {
      randomString += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;

    return `${randomString}${formattedDate}`;
  }

  async execute(params: CreateUserRepository.Params) {
    const userAlreadyExists = await this.userRepository.findUser({
      tax_id: params["tax_id"],
    });

    if (userAlreadyExists) {
      return new Error("User already exists");
    }

    const user = await this.userRepository.createUser(params);

    const account_number = this.generateAccountNumber();
    await this.accountRepository.createAccount({
      user_id: user["id"],
      account_number,
    });

    const token = await this.hashRepository.hash(user["id"]);

    return {
      user,
      token,
    };
  }
}
