import { mockUserModel, mockUserRepository } from "../../__mocks__/user.mocks";
import { LoadUserByTaxIdUseCase } from "./load-user-by-tax-id-use-case";

const makeSut = () => {
  const userRepository = mockUserRepository();
  const sut = new LoadUserByTaxIdUseCase(userRepository);

  return {
    sut,
    userRepository,
  };
};

describe("LoadUserByTaxIdUseCase", () => {
  it("Should call userRepository.findUser() with the correct values", async () => {
    const { sut, userRepository } = makeSut();

    await sut.execute({ tax_id: "any_tax_id" });

    expect(userRepository.findUser).toHaveBeenCalledTimes(1);
    expect(userRepository.findUser).toHaveBeenCalledWith({
      tax_id: "any_tax_id",
    });
  });

  it("Should return user on success", async () => {
    const { sut } = makeSut();

    const result = await sut.execute({ tax_id: "any_tax_id" });

    expect(result).toEqual(mockUserModel());
  });

  it('Should return Error("Not found") if user is not found', async () => {
    const { sut, userRepository } = makeSut();
    jest.spyOn(userRepository, "findUser").mockResolvedValue(null);

    const result = await sut.execute({ tax_id: "any_id" });

    expect(result).toEqual(new Error("User not found"));
  });
});
