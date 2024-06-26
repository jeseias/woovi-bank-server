export namespace Transaction {
  export enum Fields {
    Id = "id",
    Sender_Id = "sender",
    Receiver_Id = "receiver",
    Value = "value",
    Transaction_Id = "transaction_id",
  }

  export interface IModel {
    [Fields.Id]: string;
    [Fields.Sender_Id]: string;
    [Fields.Receiver_Id]: string;
    [Fields.Value]: number;
    [Fields.Transaction_Id]: string;
  }

  export class Entity implements IModel {
    constructor(
      public readonly id: string,
      public sender: string,
      public receiver: string,
      public transaction_id: string,
      public value: number
    ) {}
  }
}
