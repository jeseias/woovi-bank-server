export namespace Account {
  export enum Fields {
    Id = "id",
    Account_Number = "account_number",
    User_Id = "user_id",
    Balance = "balance",
  }

  export interface IModel {
    [Fields.Id]: string;
    [Fields.Account_Number]: string;
    [Fields.User_Id]: string;
    [Fields.Balance]: number;
  }

  export class Entity implements IModel {
    constructor(
      public readonly id: string,
      public account_number: string,
      public user_id: string,
      public balance: number
    ) {}
  }
}
