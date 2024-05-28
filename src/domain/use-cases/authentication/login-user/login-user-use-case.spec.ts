import { mockCryptoRepository } from "domain/use-cases/__tests__/crypto.mocks";
import {
  mockUserModel,
  mockUserRepository,
} from "domain/use-cases/__tests__/user.mocks";
import { describe, expect, it, type Mock } from "vitest";
import { LoginUserUseCase } from "./login-user-use-case";

const mockParams = () => ({
  tax_id: "any_id",
  password: "any_password",
});

const makeSut = () => {
  const userRepository = mockUserRepository();
  const cryptoRepository = mockCryptoRepository();
  const sut = new LoginUserUseCase(userRepository, cryptoRepository);

  return {
    sut,
    userRepository,
    cryptoRepository,
  };
};

describe("LoginUserUseCase", () => {
  it("Should call findUser() 1 time and with the correct params", async () => {
    const { sut, userRepository } = makeSut();

    await sut.execute({ tax_id: "any_id", password: "any_password" });

    expect(userRepository.findUser).toHaveBeenCalledTimes(1);
    expect(userRepository.findUser).toHaveBeenCalledWith({ tax_id: "any_id" });
  });

  it('Should return Error("Wrong credentials") if no account was found', async () => {
    const { sut, userRepository } = makeSut();
    (userRepository.findUser as Mock).mockResolvedValue(null);

    const result = await sut.execute(mockParams());

    expect(result).toEqual(new Error("Wrong credentials"));
  });

  it('Should return Error("Wrong credentials") if password is wrong', async () => {
    const { sut, cryptoRepository } = makeSut();
    (cryptoRepository.compare as Mock).mockResolvedValue(false);

    const result = await sut.execute(mockParams());

    expect(result).toEqual(new Error("Wrong credentials"));
  });

  it("Should call encrypt() 1 time and with the correct params", async () => {
    const { sut, cryptoRepository } = makeSut();

    await sut.execute({ tax_id: "any_id", password: "any_password" });

    expect(cryptoRepository.encrypt).toHaveBeenCalledTimes(1);
    expect(cryptoRepository.encrypt).toHaveBeenCalledWith(
      {
        id: "any_id",
      },
      expect.any(Number)
    );
  });

  it("Should return user data and token on success", async () => {
    const { sut } = makeSut();

    const result = await sut.execute(mockParams());

    expect(result).toEqual({
      user: mockUserModel(),
      token: "any_encrypt",
    });
  });
});
