import { AccountRepository } from "@/domain/repositories/accounts";

export class CalculateAccountAvailableBalance {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute({ user_id }: { user_id: string }) {
    const account = await this.accountRepository.findAccount({
      user_id,
    });

    return { balance: account?.balance };
  }
}
