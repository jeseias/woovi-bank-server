import { Transaction } from "@/domain/entities";
import { CreateTransactionRepository } from "@/domain/repositories/transactions/create-transaction-repository";
import { FindTransactionRepository } from "@/domain/repositories/transactions/find-transaction-repository";
import { jest } from "@jest/globals";

export const mockTransactionModel = (): Transaction.Entity => ({
  id: "any_id",
  receiver: "any_id",
  sender: "any_id",
  transaction_id: "any_id",
  value: 123,
});

export const mockTransactionRepository = () => ({
  create: jest
    .fn<CreateTransactionRepository.Contract["create"]>()
    .mockResolvedValue(mockTransactionModel()),
  find: jest
    .fn<FindTransactionRepository.Contract["find"]>()
    .mockResolvedValue(mockTransactionModel()),
});
