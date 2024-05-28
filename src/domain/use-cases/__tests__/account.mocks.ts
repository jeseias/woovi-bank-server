import type { Account } from "domain/entities";
import { jest } from "@jest/globals";
import { CreateAccountRepository } from "domain/repositories/accounts/create-account-repository";

export const mockAccountModel = (): Account.Model => ({
  account_number: "any_account_number",
  balance: 123,
  id: "any_id",
  user_id: "any_user_id",
});

export const mockAccountRepository = () => ({
  createAccount: jest
    .fn<CreateAccountRepository.Contract["createAccount"]>()
    .mockResolvedValue(mockAccountModel()),
});
