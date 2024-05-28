export namespace User {
  export enum Fields {
    Id = 'id',
    Name = 'name',
    Tax_Id = 'tax_id',
    Password = 'password'
  }
  export interface Model {
    [Fields.Id]: string;
    [Fields.Name]: string;
    [Fields.Tax_Id]: string;
    [Fields.Password]: string;
  }
}