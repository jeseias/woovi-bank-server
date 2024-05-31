import { Transaction } from "@/domain/entities";

export namespace FindTransactionsByUserRepository {
  export type Params = {
    user_id: string;
  };
  export type Response = Promise<Transaction.Entity[]>;

  export interface Contract {
    findAllByUser(params: Params): Response;
  }
}
