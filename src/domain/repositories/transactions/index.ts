import { CreateTransactionRepository } from "./create-transaction-repository";
import { FindTransactionRepository } from "./find-transaction-repository";
import { FindTransactionsByUserRepository } from "./find-transactions-by-user-repository";

export type TransactionRepository = CreateTransactionRepository.Contract &
  FindTransactionRepository.Contract &
  FindTransactionsByUserRepository.Contract;
