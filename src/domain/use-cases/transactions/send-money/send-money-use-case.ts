import { AccountRepository } from "@/domain/repositories/accounts";
import { TransactionRepository } from "@/domain/repositories/transactions";
import { CreateTransactionRepository } from "@/domain/repositories/transactions/create-transaction-repository";

export class SendMoneyUseCase {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly transactionRepository: TransactionRepository
  ) {}

  async execute(params: CreateTransactionRepository.Params) {
    const alreadyExists = await this.transactionRepository.find({
      transaction_id: params["transaction_id"],
    });

    if (alreadyExists) {
      return alreadyExists;
    }

    const value = params.value;

    const sender = await this.accountRepository.findAccount({
      user_id: params["sender"],
    });
    const receiver = await this.accountRepository.findAccount({
      user_id: params["receiver"],
    });

    if (!sender || !receiver) {
      return new Error("Sender or receiver account not found");
    }

    if (sender.balance < value) {
      return new Error("Insufficient funds");
    }

    await this.accountRepository.update({
      user_id: sender.user_id,
      balance: (sender.balance -= params.value),
    });
    await this.accountRepository.update({
      user_id: receiver.user_id,
      balance: (sender.balance += params.value),
    });

    const transaction = await this.transactionRepository.create(params);

    return transaction;
  }
}
