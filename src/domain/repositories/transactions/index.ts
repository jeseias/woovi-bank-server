import { CreateTransactionRepository } from "./create-transaction-repository";
import { FindTransactionRepository } from "./find-transaction-repository";

export type TransactionRepository = CreateTransactionRepository.Contract &
  FindTransactionRepository.Contract;
