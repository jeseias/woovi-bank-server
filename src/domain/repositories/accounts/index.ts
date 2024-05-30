import type { CreateAccountRepository } from "./create-account-repository";
import { FindAccountRepository } from "./find-account-repository";

export type AccountRepository = CreateAccountRepository.Contract &
  FindAccountRepository.Contract;
