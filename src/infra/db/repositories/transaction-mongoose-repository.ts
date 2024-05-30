import { TransactionRepository } from "@/domain/repositories/transactions";
import { CreateTransactionRepository } from "@/domain/repositories/transactions/create-transaction-repository";
import {
  TransactionDocument,
  TransactionModel,
} from "../models/transaction-model";
import { Transaction } from "@/domain/entities";
import { FindTransactionRepository } from "@/domain/repositories/transactions/find-transaction-repository";

export class TransactionMongooseRepository implements TransactionRepository {
  async create(
    params: CreateTransactionRepository.Params
  ): CreateTransactionRepository.Response {
    const transaction = await TransactionModel.create(params);
    return this.toDomain(transaction);
  }

  async find(
    params: Partial<
      Record<Transaction.Fields.Id | Transaction.Fields.Transaction_Id, string>
    >
  ): FindTransactionRepository.Response {
    const transaction = await TransactionModel.findOne(params);
    return transaction && this.toDomain(transaction);
  }

  private toDomain(transaction: TransactionDocument) {
    return new Transaction.Entity(
      transaction._id as string,
      transaction.sender,
      transaction.receiver,
      transaction.transaction_id,
      transaction.value
    );
  }
}

export const transactionMongooseRepository =
  new TransactionMongooseRepository();
