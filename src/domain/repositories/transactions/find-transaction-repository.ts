import { Transaction } from "@/domain/entities";

export namespace FindTransactionRepository {
  export type Params = Partial<
    Record<Transaction.Fields.Id | Transaction.Fields.Transaction_Id, string>
  >;
  export type Response = Promise<Transaction.Entity>;

  export interface Contract {
    find(params: Params): Response;
  }
}
