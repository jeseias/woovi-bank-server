import { Transaction } from "@/domain/entities";
import { CreateTransactionRepository } from "@/domain/repositories/transactions/create-transaction-repository";
import { FindTransactionRepository } from "@/domain/repositories/transactions/find-transaction-repository";
import { FindTransactionsByUserRepository } from "@/domain/repositories/transactions/find-transactions-by-user-repository";
import { jest } from "@jest/globals";

export const mockTransactionModel = (
  params?: Partial<Transaction.Entity>
): Transaction.Entity => ({
  id: "any_id",
  receiver: "any_id",
  sender: "any_id",
  transaction_id: "any_id",
  value: 123,
  ...params,
});

export const mockTransactionRepository = () => ({
  create: jest
    .fn<CreateTransactionRepository.Contract["create"]>()
    .mockResolvedValue(mockTransactionModel()),
  find: jest
    .fn<FindTransactionRepository.Contract["find"]>()
    .mockResolvedValue(mockTransactionModel()),
  findAllByUser: jest
    .fn<FindTransactionsByUserRepository.Contract["findAllByUser"]>()
    .mockResolvedValue([mockTransactionModel()]),
});
