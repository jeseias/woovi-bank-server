import { Account } from "@/domain/entities";

export namespace UpdateAccountRepository {
  export type Params = {
    [Account.Fields.User_Id]: string;
    [Account.Fields.Balance]: number;
  };
  export type Response = Promise<Account.Entity>;

  export interface Contract {
    update(params: Params): Response;
  }
}
