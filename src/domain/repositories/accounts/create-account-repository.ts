import type { Account } from "domain/entities";

export namespace CreateAccountRepository {
  export type Params = Pick<
    Account.Model,
    Account.Fields.User_Id | Account.Fields.Account_Number
  >;
  export type Response = Promise<Account.Model>;

  export interface Contract {
    createAccount(params: Params): Response;
  }
}
