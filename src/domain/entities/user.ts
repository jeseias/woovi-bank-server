export namespace User {
  export enum Fields {
    Id = 'id',
    Name = 'name',
    Tax_Id = 'tax_id',
    Password = 'password'
  }

  export interface IModel {
    [Fields.Id]: string;
    [Fields.Name]: string;
    [Fields.Tax_Id]: string;
    [Fields.Password]: string;
  }

  export class Model implements IModel {
    constructor(
      public readonly id: string,
      public name: string,
      public tax_id: string,
      public password: string
    ) {}
  }
}