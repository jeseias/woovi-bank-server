import { CreateTransactionRepository } from "@/domain/repositories/transactions/create-transaction-repository";
import { makeSendMoney } from "@/main/factories/use-case-factories";

const sendMoney = makeSendMoney();

export const transactionResolvers = {
  Mutation: {
    sendMoney: async (_: any, args: CreateTransactionRepository.Params) => {
      const result = await sendMoney.execute(args);
      return result;
    },
  },
};
