import { AccountRepository } from "@/domain/repositories/accounts";
import { CreateAccountRepository } from "@/domain/repositories/accounts/create-account-repository";
import { AccountDocument, AccountModel } from "../models/account-model";
import { Account } from "@/domain/entities";
import { FindAccountRepository } from "@/domain/repositories/accounts/find-account-repository";
import { UpdateAccountRepository } from "@/domain/repositories/accounts/update-account-repository";

export class AccountMongooseRepository implements AccountRepository {
  async createAccount(
    params: CreateAccountRepository.Params
  ): CreateAccountRepository.Response {
    const account = await AccountModel.create(params);
    return this.toDomain(account);
  }

  async findAccount(
    params: FindAccountRepository.Params
  ): FindAccountRepository.Response {
    const account = await AccountModel.findOne(params).lean();
    return account && this.toDomain(account);
  }

  async update(
    params: UpdateAccountRepository.Params
  ): UpdateAccountRepository.Response {
    const account = await AccountModel.findByIdAndUpdate(params.user_id, {
      balance: params.balance,
    }).lean();

    return account! && this.toDomain(account);
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
