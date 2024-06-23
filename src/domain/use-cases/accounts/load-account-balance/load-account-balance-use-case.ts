import { AccountRepository } from "@/domain/repositories/accounts";

export class LoadAccountBalanceUseCase {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute({ user_id }: { user_id: string }) {
    const account = await this.accountRepository.findAccount({ user_id });

    if (!account) {
      return new Error("Account not found");
    }

    return account;
  }
}
