import { validateCnpj } from "../validations/validate-cnpj";
import { validateCpf } from "../validations/validate-cpf";

export namespace User {
  export enum Fields {
    Id = "id",
    Name = "name",
    Tax_Id = "tax_id",
    Password = "password",
  }

  export interface IModel {
    [Fields.Id]: string;
    [Fields.Name]: string;
    [Fields.Tax_Id]: string;
    [Fields.Password]: string;
  }

  export class Entity implements IModel {
    constructor(
      public readonly id: string,
      public name: string,
      public tax_id: string,
      public password: string
    ) {}
  }

  export function isValidTaxId(value: string) {
    return validateCpf(value) || validateCnpj(value);
  }
}
