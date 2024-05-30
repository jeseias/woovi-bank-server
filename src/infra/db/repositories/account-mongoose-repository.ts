import { AccountRepository } from "@/domain/repositories/accounts";
import { CreateAccountRepository } from "@/domain/repositories/accounts/create-account-repository";
import { AccountDocument, AccountModel } from "../models/account-model";
import { Account } from "@/domain/entities";

export class AccountMongooseRepository implements AccountRepository {
  async createAccount(
    params: CreateAccountRepository.Params
  ): CreateAccountRepository.Response {
    const account = await AccountModel.create(params);
    return this.toDomain(account);
  }

  private toDomain(account: AccountDocument) {
    return new Account.Entity(
      account._id as string,
      account.account_number,
      account.user_id,
      account.balance
    );
  }
}

export const accountMongooseRepository = new AccountMongooseRepository();
