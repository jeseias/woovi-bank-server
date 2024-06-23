import {
  mockAccountModel,
  mockAccountRepository,
} from "../../__mocks__/account.mocks";
import {
  mockTransactionModel,
  mockTransactionRepository,
} from "../../__mocks__/transaction.mocks";
import { mockUserRepository } from "../../__mocks__/user.mocks";
import { CalculateAccountAvailableBalance } from "./calculate-account-available-balance-use-case";

const makeSut = () => {
  const transactionRepository = mockTransactionRepository();
  const accountRepository = mockAccountRepository();
  const sut = new CalculateAccountAvailableBalance(
    transactionRepository,
    accountRepository
  );

  return {
    sut,
    transactionRepository,
    accountRepository,
  };
};

describe("CalculateAccountAvailableBalance", () => {
  it("Should call findAccount with the correct values", async () => {
    const { sut, accountRepository } = makeSut();

    await sut.execute({ user_id: "any_id" });

    expect(accountRepository.findAccount).toHaveBeenCalledTimes(1);
    expect(accountRepository.findAccount).toHaveBeenCalledWith({
      user_id: "any_id",
    });
  });

  it("Should call findAllByUser() with the correct values", async () => {
    const { sut, transactionRepository } = makeSut();

    await sut.execute({ user_id: "any_id" });

    expect(transactionRepository.findAllByUser).toHaveBeenCalledTimes(1);
    expect(transactionRepository.findAllByUser).toHaveBeenCalledWith({
      user_id: "any_id",
    });
  });

  it("Should return balance of 0 if the user has 0 transactions", async () => {
    const { sut, transactionRepository, accountRepository } = makeSut();
    jest.spyOn(accountRepository, "findAccount").mockResolvedValue(
      mockAccountModel({
        balance: 0,
      })
    );
    transactionRepository.findAllByUser.mockResolvedValue([]);

    const result = await sut.execute({ user_id: "any_id" });

    expect(result).toEqual({ balance: 0 });
  });

  it("Should return balance of 750", async () => {
    const { sut, transactionRepository, accountRepository } = makeSut();
    jest.spyOn(accountRepository, "findAccount").mockResolvedValue(
      mockAccountModel({
        balance: 0,
      })
    );
    transactionRepository.findAllByUser.mockResolvedValue([
      mockTransactionModel({
        receiver: "any_id",
        sender: "another_id",
        value: 250,
      }),
      mockTransactionModel({
        receiver: "any_id",
        sender: "third_id",
        value: 500,
      }),
    ]);

    const result = await sut.execute({ user_id: "any_id" });

    expect(result).toEqual({ balance: 750 });
  });
});
