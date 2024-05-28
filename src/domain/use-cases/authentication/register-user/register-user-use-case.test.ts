import { describe, expect, it, type Mock } from "vitest";
import { RegisterUserUseCase } from "./register-user-use-case";
import {
  mockUserModel,
  mockUserRepository,
} from "domain/use-cases/__tests__/user.mocks";
import { mockAccountRepository } from "domain/use-cases/__tests__/account.mocks";
import { mockHashRepository } from "domain/use-cases/__tests__/crypto.mocks";

const mockParams = () => ({
  name: "any_name",
  password: "any_password",
  tax_id: "any_tax_id",
});

const makeSut = () => {
  const userRepository = mockUserRepository();
  const accountRepository = mockAccountRepository();
  const hashRepository = mockHashRepository();

  const sut = new RegisterUserUseCase(
    userRepository,
    accountRepository,
    hashRepository
  );

  return {
    sut,
    userRepository,
    accountRepository,
    hashRepository,
  };
};

describe("RegisterUserUseCase", () => {
  describe("Execute()", () => {
    it("Should call findUser() with the correct params", async () => {
      const { sut, userRepository } = makeSut();
      const params = mockParams();

      await sut.execute(params);

      expect(userRepository.findUser).toHaveBeenCalledTimes(1);
      expect(userRepository.findUser).toHaveBeenCalledWith({
        tax_id: params.tax_id,
      });
    });

    it('Should return Error("User already exists") if a user if found', async () => {
      const { sut } = makeSut();

      const result = await sut.execute(mockParams());

      expect(result).toEqual(new Error("User already exists"));
    });

    it("Should call createUser() 1 time and with the correct params", async () => {
      const { sut, userRepository } = makeSut();
      (userRepository.findUser as Mock).mockResolvedValue(null);

      await sut.execute(mockParams());

      expect(userRepository.createUser).toHaveBeenCalledTimes(1);
      expect(userRepository.createUser).toHaveBeenCalledWith(mockParams());
    });

    it("Should call createAccount() 1 time and with the correct params", async () => {
      const { sut, userRepository, accountRepository } = makeSut();
      (userRepository.findUser as Mock).mockResolvedValue(null);

      await sut.execute(mockParams());

      expect(accountRepository.createAccount).toHaveBeenCalledTimes(1);
      expect(accountRepository.createAccount).toHaveBeenCalledWith({
        user_id: "any_id",
        account_number: expect.any(String),
      });
    });

    it("Should call hash() 1 time and with the correct params", async () => {
      const { sut, userRepository, accountRepository, hashRepository } =
        makeSut();
      (userRepository.findUser as Mock).mockResolvedValue(null);

      await sut.execute(mockParams());

      expect(hashRepository.hash).toHaveBeenCalledTimes(1);
      expect(hashRepository.hash).toHaveBeenCalledWith("any_id");
    });

    it("Should return user data and token on success", async () => {
      const { sut, userRepository } = makeSut();
      (userRepository.findUser as Mock).mockResolvedValue(null);

      const result = await sut.execute(mockParams());

      expect(result).toEqual({
        user: mockUserModel(),
        token: "any_hash",
      });
    });
  });
});
