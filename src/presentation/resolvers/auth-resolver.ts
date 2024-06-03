import { CreateUserRepository } from "@/domain/repositories/users/create-user-repository";
import { ILoginUserParams } from "@/domain/use-cases/authentication";
import {
  makeLogin,
  makeRegisterUser,
} from "@/main/factories/use-case-factories";

const registerUser = makeRegisterUser();
const loginUser = makeLogin();

export const authResolvers = {
  Mutation: {
    registerUser: async (
      _: any,
      args: { input: CreateUserRepository.Params }
    ) => {
      const result = await registerUser.execute(args.input);
      return result;
    },
    login: async (_: any, args: { input: ILoginUserParams }) => {
      const result = await loginUser.execute(args.input);
      return result;
    },
  },
};
