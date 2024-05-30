import type { CreateAccountRepository } from "./create-account-repository";
import { FindAccountRepository } from "./find-account-repository";
import { UpdateAccountRepository } from "./update-account-repository";

export type AccountRepository = CreateAccountRepository.Contract &
  FindAccountRepository.Contract &
  UpdateAccountRepository.Contract;
