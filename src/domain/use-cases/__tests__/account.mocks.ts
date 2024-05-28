import type { Account } from "domain/entities";
import type { AccountRepository } from "domain/repositories/accounts";
import { vi } from "vitest";

export const mockAccountModel = (): Account.Model => ({
  account_number: "any_account_number",
  balance: 123,
  id: "any_id",
  user_id: "any_user_id",
});

export const mockAccountRepository = () =>
  ({
    createAccount: vi.fn().mockResolvedValue(mockAccountModel()),
  } as AccountRepository);
