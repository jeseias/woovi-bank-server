import { Transaction } from "@/domain/entities";

export namespace CreateTransactionRepository {
  export type Params = Omit<Transaction.IModel, Transaction.Fields.Id>;
  export type Response = Promise<Transaction.Entity>;

  export interface Contract {
    create(params: Params): Response;
  }
}
