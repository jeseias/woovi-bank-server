import {
  mockAccountModel,
  mockAccountRepository,
} from "../../__mocks__/account.mocks";
import {
  mockTransactionModel,
  mockTransactionRepository,
} from "../../__mocks__/transaction.mocks";
import { CalculateAccountAvailableBalance } from "./calculate-account-available-balance-use-case";

const makeSut = () => {
  const accountRepository = mockAccountRepository();
  const sut = new CalculateAccountAvailableBalance(accountRepository);

  return {
    sut,
    accountRepository,
  };
};

describe("CalculateAccountAvailableBalance", () => {
  it("Should call accountRepository.findAccount() with the correct values", async () => {
    const { sut, accountRepository } = makeSut();

    await sut.execute({ user_id: "any_id" });

    expect(accountRepository.findAccount).toHaveBeenCalledTimes(1);
    expect(accountRepository.findAccount).toHaveBeenCalledWith({
      user_id: "any_id",
    });
  });

  it("Should return balance of 0 if the account has a balance of 0", async () => {
    const { sut, accountRepository } = makeSut();
    accountRepository.findAccount.mockResolvedValue(
      mockAccountModel({ balance: 0 })
    );

    const result = await sut.execute({ user_id: "any_id" });

    expect(result).toEqual({ balance: 0 });
  });

  it("Should return balance of 750 if the account has a balance of 750", async () => {
    const { sut, accountRepository } = makeSut();
    accountRepository.findAccount.mockResolvedValue(
      mockAccountModel({ balance: 750 })
    );

    const result = await sut.execute({ user_id: "any_id" });

    expect(result).toEqual({ balance: 750 });
  });
});
