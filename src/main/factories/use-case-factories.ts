import { CalculateAccountAvailableBalance } from "@/domain/use-cases/accounts/calculate-account-available-balance/calculate-account-available-balance-use-case";
import { LoginUserUseCase } from "@/domain/use-cases/authentication/login-user";
import { RegisterUserUseCase } from "@/domain/use-cases/authentication/register-user";
import { SendMoneyUseCase } from "@/domain/use-cases/transactions/send-money/send-money-use-case";
import { cryptoAdapter } from "@/infra/cryptography/crypto-adapter";
import { accountMongooseRepository } from "@/infra/db/repositories/account-mongoose-repository";
import { transactionMongooseRepository } from "@/infra/db/repositories/transaction-mongoose-repository";
import { userMongooseRepository } from "@/infra/db/repositories/user-mongoose-repository";

export const makeRegisterUser = () =>
  new RegisterUserUseCase(
    userMongooseRepository,
    accountMongooseRepository,
    cryptoAdapter
  );

export const makeLogin = () =>
  new LoginUserUseCase(userMongooseRepository, cryptoAdapter);

export const makeSendMoney = () =>
  new SendMoneyUseCase(
    accountMongooseRepository,
    transactionMongooseRepository
  );

export const makeCalculateAvailableAccountBalance = () =>
  new CalculateAccountAvailableBalance(transactionMongooseRepository);
