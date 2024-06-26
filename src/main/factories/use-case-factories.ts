import {
  CalculateAccountAvailableBalance,
  LoadAccountBalanceUseCase,
} from "@/domain/use-cases/accounts";
import {
  LoginUserUseCase,
  RegisterUserUseCase,
} from "@/domain/use-cases/authentication";
import { SendMoneyUseCase } from "@/domain/use-cases/transactions";
import { LoadUserByTaxIdUseCase } from "@/domain/use-cases/users";
import { cryptoAdapter } from "@/infra/cryptography";
import {
  accountMongooseRepository,
  transactionMongooseRepository,
  userMongooseRepository,
} from "@/infra/db/repositories";

export const makeRegisterUser = () =>
  new RegisterUserUseCase(
    userMongooseRepository,
    accountMongooseRepository,
    cryptoAdapter
  );

export const makeLoadUserByTaxId = () =>
  new LoadUserByTaxIdUseCase(userMongooseRepository);

export const makeLogin = () =>
  new LoginUserUseCase(userMongooseRepository, cryptoAdapter);

export const makeSendMoney = () =>
  new SendMoneyUseCase(
    accountMongooseRepository,
    transactionMongooseRepository
  );

export const makeCalculateAvailableAccountBalance = () =>
  new CalculateAccountAvailableBalance(
    transactionMongooseRepository,
    accountMongooseRepository
  );

export const makeLoadAccount = () =>
  new LoadAccountBalanceUseCase(accountMongooseRepository);
