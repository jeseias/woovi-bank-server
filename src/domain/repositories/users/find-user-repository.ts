import type { User } from "domain/entities";

export namespace FindUserRepository {
  export type Params = Pick<User.IModel, User.Fields.Tax_Id>;
  export type Response = Promise<User.Entity | null>;

  export interface Contract {
    findUser(params: Params): Response;
  }
}
