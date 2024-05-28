import type { User } from "domain/entities";

export namespace FindUserRepository {
  export type Params = Pick<User.Model, User.Fields.Tax_Id>;
  export type Response = Promise<User.Model | null>;

  export interface Contract {
    findUser(params: Params): Response;
  }
}
