import { describe, expect, it, vi, type Mock } from "vitest";
import { RegisterUserUseCase } from "./register-user-use-case";
import type { AccountRepository } from "domain/repositories/accounts";
import type { Cryptography } from "domain/services";
import type { UserRepository } from "domain/repositories/users";
import type { Account, User } from "domain/entities";

const mockUserModel = (): User.Model => ({
  id: "any_id",
  name: "any_name",
  password: "any_password",
  tax_id: "any_tax_id",
});

const mockAccountModel = (): Account.Model => ({
  account_number: "any_account_number",
  balance: 123,
  id: "any_id",
  user_id: "any_user_id",
});

const mockParams = () => ({
  name: "any_name",
  password: "any_password",
  tax_id: "any_tax_id",
});

const makeSut = () => {
  const userRepository = {
    findUser: vi.fn().mockResolvedValue(mockUserModel()),
    createUser: vi.fn().mockResolvedValue(mockUserModel()),
  } as UserRepository;
  const accountRepository = {
    createAccount: vi.fn().mockResolvedValue(mockAccountModel()),
  } as AccountRepository;
  const hashRepository = {
    hash: vi.fn().mockResolvedValue("any_hash"),
  } as Cryptography.Hasher.Contract;

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
