import { CreateUserRepository } from "@/domain/repositories/users/create-user-repository";
import { ILoginUserParams } from "@/domain/use-cases/authentication/login-user";
import {
  makeLogin,
  makeRegisterUser,
} from "@/main/factories/use-case-factories";

const registerUser = makeRegisterUser();
const loginUser = makeLogin();

export const authResolvers = {
  Mutation: {
    registerUser: async (_, arg: CreateUserRepository.Params) => {
      const result = await registerUser.execute({
        ...arg,
      });

      return result;
    },
    login: async (_, args: ILoginUserParams) => {
      const result = await loginUser.execute(args);
      return result;
    },
  },
};
