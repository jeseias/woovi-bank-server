import type { Account } from "domain/entities";

export namespace CreateAccountRepository {
  export type Params = Pick<Account.Model, Account.Fields.User_Id>;
  export type Response = Promise<Account.Model>;

  export interface Contract {
    createAccount(params: Params): Response;
  }
}
