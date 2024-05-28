export namespace Account {
  export enum Fields {
    Id = "id",
    Account_Number = "account_number",
    User_Id = "user_id",
    Balance = "balance",
  }

  export interface Model {
    [Fields.Id]: string;
    [Fields.Account_Number]: string;
    [Fields.User_Id]: string;
    [Fields.Balance]: number;
  }
}
