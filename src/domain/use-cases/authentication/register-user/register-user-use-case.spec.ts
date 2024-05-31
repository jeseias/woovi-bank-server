import { RegisterUserUseCase } from "./register-user-use-case";
import {
  mockUserModel,
  mockUserRepository,
} from "@/domain/use-cases/__mocks__/user.mocks";
import { mockAccountRepository } from "@/domain/use-cases/__mocks__/account.mocks";
import { mockCryptoRepository } from "@/domain/use-cases/__mocks__/crypto.mocks";
import type { CreateUserRepository } from "@/domain/repositories/users/create-user-repository";
import { User } from "@/domain/entities";

const mockParams = (params?: Partial<CreateUserRepository.Params>) => ({
  name: "any_name",
  password: "any_password",
  tax_id: "487.501.680-88",
  ...params,
});

const makeSut = () => {
  const userRepository = mockUserRepository();
  const accountRepository = mockAccountRepository();
  const cryptoRepository = mockCryptoRepository();

  const sut = new RegisterUserUseCase(
    userRepository,
    accountRepository,
    cryptoRepository
  );

  return {
    sut,
    userRepository,
    accountRepository,
    cryptoRepository,
  };
};

describe("RegisterUserUseCase", () => {
  describe("Execute()", () => {
    describe("Validation", () => {
      it("Should call isValidTaxId with the correct value", async () => {
        const { sut } = makeSut();
        const validateSpy = jest.spyOn(User, "isValidTaxId");

        await sut.execute(mockParams({ tax_id: "any_taxId" }));

        expect(validateSpy).toHaveBeenCalledTimes(1);
        expect(validateSpy).toHaveBeenCalledWith("any_taxId");
      });

      it("isValidTaxId() should return false if the provided value is not valid", async () => {
        const { sut } = makeSut();
        const validateSpy = jest.spyOn(User, "isValidTaxId");

        await sut.execute(mockParams({ tax_id: "any_id" }));

        expect(validateSpy).toHaveReturnedWith(false);
      });
      it("isValidTaxId() should return true if the provided value is valid", async () => {
        const { sut } = makeSut();
        const validateSpy = jest.spyOn(User, "isValidTaxId");

        await sut.execute(mockParams({ tax_id: "824.166.110-03" }));

        expect(validateSpy).toHaveReturnedWith(true);
      });

      it("Should return Error('Invalid tax id') if provided value is not valid", async () => {
        const { sut } = makeSut();

        const result = await sut.execute(mockParams({ tax_id: "any_id" }));

        expect(result).toEqual(new Error("Invalid tax id"));
      });
    });

    describe("UserRepository", () => {
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
        userRepository.findUser.mockResolvedValue(null);

        await sut.execute(mockParams());

        expect(userRepository.createUser).toHaveBeenCalledTimes(1);
        expect(userRepository.createUser).toHaveBeenCalledWith(
          mockParams({ password: "any_hash" })
        );
      });
    });

    describe("AccountRepository", () => {
      it("Should call createAccount() 1 time and with the correct params", async () => {
        const { sut, userRepository, accountRepository } = makeSut();
        userRepository.findUser.mockResolvedValue(null);

        await sut.execute(mockParams());

        expect(accountRepository.createAccount).toHaveBeenCalledTimes(1);
        expect(accountRepository.createAccount).toHaveBeenCalledWith({
          user_id: "any_id",
          account_number: expect.any(Number),
        });
      });
    });

    describe("Cryptography", () => {
      it("Should call encrypt() 1 time and with the correct params", async () => {
        const { sut, userRepository, cryptoRepository } = makeSut();
        userRepository.findUser.mockResolvedValue(null);

        await sut.execute(mockParams());

        expect(cryptoRepository.encrypt).toHaveBeenCalledTimes(1);
        expect(cryptoRepository.encrypt).toHaveBeenCalledWith(
          { id: "any_id" },
          expect.any(Number)
        );
      });

      it("Should call hash with the correct value", async () => {
        const { sut, userRepository, cryptoRepository } = makeSut();
        userRepository.findUser.mockResolvedValue(null);

        await sut.execute(mockParams());

        expect(cryptoRepository.hash).toHaveBeenCalledTimes(1);
        expect(cryptoRepository.hash).toHaveBeenCalledWith("any_password");
      });
    });

    it("Should return user data and token on success", async () => {
      const { sut, userRepository } = makeSut();
      userRepository.findUser.mockResolvedValue(null);

      const result = await sut.execute(mockParams());

      expect(result).toEqual({
        user: mockUserModel(),
        token: "any_encrypt",
      });
    });
  });
});
