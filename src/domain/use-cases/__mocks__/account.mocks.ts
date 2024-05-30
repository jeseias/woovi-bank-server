import type { Account } from "domain/entities";
import { jest } from "@jest/globals";
import { CreateAccountRepository } from "domain/repositories/accounts/create-account-repository";
import { FindAccountRepository } from "@/domain/repositories/accounts/find-account-repository";
import { UpdateAccountRepository } from "@/domain/repositories/accounts/update-account-repository";

export const mockAccountModel = (
  params?: Partial<Account.Entity>
): Account.Entity => ({
  id: "any_id",
  user_id: "any_user_id",
  account_number: "any_account_number",
  balance: 123,
  ...params,
});

export const mockAccountRepository = () => ({
  createAccount: jest
    .fn<CreateAccountRepository.Contract["createAccount"]>()
    .mockResolvedValue(mockAccountModel()),
  findAccount: jest
    .fn<FindAccountRepository.Contract["findAccount"]>()
    .mockResolvedValue(mockAccountModel()),
  update: jest
    .fn<UpdateAccountRepository.Contract["update"]>()
    .mockResolvedValue(mockAccountModel()),
});
