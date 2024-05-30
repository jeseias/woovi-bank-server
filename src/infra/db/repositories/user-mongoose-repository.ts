import { UserRepository } from "@/domain/repositories/users";
import { CreateUserRepository } from "@/domain/repositories/users/create-user-repository";
import { UserDocument, UserModel } from "../models/user-model";
import { User } from "@/domain/entities";
import { FindUserRepository } from "@/domain/repositories/users/find-user-repository";

export class UserMongooseRepository implements UserRepository {
  async createUser(
    params: CreateUserRepository.Params
  ): CreateUserRepository.Response {
    const user = await UserModel.create(params);
    return this.toDomain(user);
  }

  async findUser(
    params: FindUserRepository.Params
  ): FindUserRepository.Response {
    const user = await UserModel.findOne(params);
    return user && this.toDomain(user);
  }

  private toDomain(user: UserDocument) {
    return new User.Entity(
      user._id as string,
      user.name,
      user.tax_id,
      user.password
    );
  }
}

export const userMongooseRepository = new UserMongooseRepository();