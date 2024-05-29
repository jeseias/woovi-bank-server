import type { User } from "domain/entities";

export namespace CreateUserRepository {
  export type Params = Omit<User.IModel, User.Fields.Id>;
  export type Response = Promise<User.Entity>;

  export interface Contract {
    createUser(params: Params): Response;
  }
}
