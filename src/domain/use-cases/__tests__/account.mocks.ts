import type { Account } from "domain/entities";
import type { AccountRepository } from "domain/repositories/accounts";
import { jest } from "@jest/globals";

export const mockAccountModel = (): Account.Model => ({
  account_number: "any_account_number",
  balance: 123,
  id: "any_id",
  user_id: "any_user_id",
});

export const mockAccountRepository = () =>
  ({
    createAccount: jest.fn().mockResolvedValue(mockAccountModel()),
  } as AccountRepository);
