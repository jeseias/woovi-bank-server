import type { CreateUserRepository } from "./create-user-repository";
import type { FindUserRepository } from "./find-user-repository";

export type UserRepository = CreateUserRepository.Contract &
  FindUserRepository.Contract;
