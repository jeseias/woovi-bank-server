import { CreateUserRepository } from "@/domain/repositories/users/create-user-repository";
import { makeRegisterUser } from "@/main/factories/use-case-factories";

const registerUser = makeRegisterUser();

export const authResolvers = {
  Mutation: {
    registerUser: async (_, arg: CreateUserRepository.Params) => {
      const user = await registerUser.execute({
        ...arg,
      });

      return user;
    },
  },
};
