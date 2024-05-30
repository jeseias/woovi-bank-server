import { CreateTransactionRepository } from "@/domain/repositories/transactions/create-transaction-repository";
import {
  mockAccountModel,
  mockAccountRepository,
} from "../../__mocks__/account.mocks";
import {
  mockTransactionModel,
  mockTransactionRepository,
} from "../../__mocks__/transaction.mocks";
import { SendMoneyUseCase } from "./send-money-use-case";

const makeSut = () => {
  const accountRepository = mockAccountRepository();
  const transactionRepository = mockTransactionRepository();
  const sut = new SendMoneyUseCase(accountRepository, transactionRepository);

  return {
    sut,
    accountRepository,
    transactionRepository,
  };
};

const mockParams = (params?: Partial<CreateTransactionRepository.Params>) => ({
  receiver: "any_id",
  sender: "any_id",
  transaction_id: "any_id",
  value: 123,
  ...params,
});

describe("SendMoneyUseCase", () => {
  it("Should only call transactionRepository.find() and return transaction", async () => {
    const { sut, transactionRepository } = makeSut();
    const params = mockParams();

    const result = await sut.execute(params);

    expect(transactionRepository.find).toHaveReturnedTimes(1);
    expect(transactionRepository.find).toHaveBeenCalledWith({
      transaction_id: "any_id",
    });
    expect(result).toEqual(mockTransactionModel());
  });

  it("Should call accountRepository.findAccount 2 times with the correct params", async () => {
    const { sut, accountRepository, transactionRepository } = makeSut();
    transactionRepository.find.mockResolvedValue(null);

    await sut.execute(
      mockParams({ receiver: "any_receiver", sender: "any_sender" })
    );

    expect(accountRepository.findAccount).toHaveBeenCalledTimes(2);
    expect(accountRepository.findAccount).toHaveBeenCalledWith({
      user_id: "any_receiver",
    });
    expect(accountRepository.findAccount).toHaveBeenCalledWith({
      user_id: "any_sender",
    });
  });

  it('Should return Error("Sender or receiver account not found") if the sender is not found', async () => {
    const { sut, accountRepository, transactionRepository } = makeSut();
    transactionRepository.find.mockResolvedValue(null);
    accountRepository.findAccount.mockResolvedValue(null);

    const result = await sut.execute(mockParams());

    expect(result).toEqual(new Error("Sender or receiver account not found"));
  });

  it('Should return Error("Sender or receiver account not found") if the receiver is not found', async () => {
    const { sut, accountRepository, transactionRepository } = makeSut();
    transactionRepository.find.mockResolvedValue(null);
    accountRepository.findAccount
      .mockResolvedValue(mockAccountModel())
      .mockResolvedValue(null);

    const result = await sut.execute(mockParams());

    expect(result).toEqual(new Error("Sender or receiver account not found"));
  });

  it('Should return Error("Insufficient funds") if the sender has insufficient funds', async () => {
    const { sut, accountRepository, transactionRepository } = makeSut();
    accountRepository.findAccount.mockResolvedValue(
      mockAccountModel({ balance: 0 })
    );
    transactionRepository.find.mockResolvedValue(null);

    const result = await sut.execute(mockParams({ value: 2000 }));

    expect(result).toEqual(new Error("Insufficient funds"));
  });

  it("Should call accountRepository.update() 2 times and with the correct params", async () => {
    const { sut, accountRepository, transactionRepository } = makeSut();
    transactionRepository.find.mockResolvedValue(null);
    accountRepository.findAccount
      .mockResolvedValueOnce(
        mockAccountModel({
          balance: 1000,
          user_id: "any_sender_id",
        })
      )
      .mockResolvedValueOnce(
        mockAccountModel({
          balance: 500,
          user_id: "any_receiver_id",
        })
      );

    await sut.execute(
      mockParams({
        sender: "any_sender_id",
        receiver: "any_receiver_id",
        value: 250,
      })
    );

    expect(accountRepository.update).toHaveBeenCalledTimes(2);
    expect(accountRepository.update).toHaveBeenCalledWith({
      user_id: "any_sender_id",
      balance: 750,
    });
    expect(accountRepository.update).toHaveBeenCalledWith({
      user_id: "any_receiver_id",
      balance: 750,
    });
  });

  it("Should call transactionRepository.create() and return the transaction on success", async () => {
    const { sut, transactionRepository } = makeSut();
    transactionRepository.find.mockResolvedValue(null);

    const result = await sut.execute(mockParams());

    expect(result).toEqual(mockTransactionModel());
  });

  it("Should return a transaction model if the transaction_id already exists", async () => {
    const { sut } = makeSut();

    const result = await sut.execute(mockParams());

    expect(result).toEqual(mockTransactionModel());
  });
});
