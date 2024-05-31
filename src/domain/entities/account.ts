export namespace Account {
  export enum Fields {
    Id = "id",
    Account_Number = "account_number",
    User_Id = "user_id",
    Balance = "balance",
  }

  export interface IModel {
    [Fields.Id]: string;
    [Fields.Account_Number]: number;
    [Fields.User_Id]: string;
    [Fields.Balance]: number;
  }

  export class Entity implements IModel {
    constructor(
      public readonly id: string,
      public account_number: number,
      public user_id: string,
      public balance: number
    ) {}
  }

  export function generateAccountNumber() {
    let digits = [];
    for (let i = 0; i < length; i++) {
      digits.push(Math.floor(Math.random() * 10));
    }
    return Number(digits.join(""));
  }
}
