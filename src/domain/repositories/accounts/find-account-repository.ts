import { Account } from "@/domain/entities";

export namespace FindAccountRepository {
  export type Params = {
    [Account.Fields.User_Id]: string;
  };
  export type Response = Promise<Account.Entity | null>;

  export interface Contract {
    findAccount(params: Params): Response;
  }
}
