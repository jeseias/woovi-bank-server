import {
  mockAccountModel,
  mockAccountRepository,
} from "../../__mocks__/account.mocks";
import { LoadAccountBalanceUseCase } from "./load-account-balance-use-case";

const makeSut = () => {
  const accountRepository = mockAccountRepository();
  const sut = new LoadAccountBalanceUseCase(accountRepository);

  return {
    sut,
    accountRepository,
  };
};

describe("LoadAccountBalanceUseCase", () => {
  it("Should call findAccount() with the correct values", async () => {
    const { accountRepository, sut } = makeSut();

    sut.execute({ user_id: "any_id" });

    expect(accountRepository.findAccount).toHaveBeenNthCalledWith(1, {
      user_id: "any_id",
    });
  });

  it('Should return Error("Account not found") if no account was found', async () => {
    const { sut, accountRepository } = makeSut();
    jest.spyOn(accountRepository, "findAccount").mockResolvedValue(null);

    const result = await sut.execute({ user_id: "any_id" });

    expect(result).toEqual(new Error("Account not found"));
  });

  it("Should return an account on success", async () => {
    const { sut } = makeSut();

    const result = await sut.execute({ user_id: "any_id" });

    expect(result).toEqual(mockAccountModel());
  });
});
