import { RegisterUserUseCase } from "@/domain/use-cases/authentication/register-user";
import { cryptoAdapter } from "@/infra/cryptography/crypto-adapter";
import { accountMongooseRepository } from "@/infra/db/repositories/account-mongoose-repository";
import { userMongooseRepository } from "@/infra/db/repositories/user-mongoose-repository";

export const makeRegisterUser = () =>
  new RegisterUserUseCase(
    userMongooseRepository,
    accountMongooseRepository,
    cryptoAdapter
  );
