import { TransactionRepository } from "@/domain/repositories/transactions";

export class CalculateAccountAvailableBalance {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute({ user_id }: { user_id: string }) {
    const transactions = await this.transactionRepository.findAllByUser({
      user_id,
    });

    const balance = transactions.reduce((acc, transaction) => {
      if (transaction["receiver"] === user_id) {
        return acc + transaction["value"];
      } else if (transaction["sender"] === user_id) {
        return acc - transaction["value"];
      }
      return acc;
    }, 0);

    return { balance };
  }
}
