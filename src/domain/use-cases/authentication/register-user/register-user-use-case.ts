import type { AccountRepository } from "domain/repositories/accounts";
import type { UserRepository } from "domain/repositories/users";
import type { CreateUserRepository } from "domain/repositories/users/create-user-repository";
import type { CryptoRepository, Cryptography } from "domain/services";

export class RegisterUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly accountRepository: AccountRepository,
    private readonly cryptoRepository: CryptoRepository
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

  generationTokenExpirationDate() {
    const tokenNow = new Date();
    const tokenMinutes = 60 * (24 * 7); // 1 week

    return new Date(
      tokenNow.setMinutes(tokenNow.getMinutes() + tokenMinutes)
    ).getTime();
  }

  async execute(params: CreateUserRepository.Params) {
    const userAlreadyExists = await this.userRepository.findUser({
      tax_id: params["tax_id"],
    });

    if (userAlreadyExists) {
      return new Error("User already exists");
    }

    const hashedPassword = await this.cryptoRepository.hash(params["password"]);
    const user = await this.userRepository.createUser({
      ...params,
      password: hashedPassword,
    });

    const account_number = this.generateAccountNumber();
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
  }
}
