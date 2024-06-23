import {
  makeCalculateAvailableAccountBalance,
  makeLoadAccount,
} from "@/main/factories/use-case-factories";

const calculateBalance = makeCalculateAvailableAccountBalance();
const loadAccount = makeLoadAccount();

export const accountResolvers = {
  Query: {
    calculateAvailableBalance: async (_: any, args: { user_id: string }) => {
      const result = await calculateBalance.execute({ user_id: args.user_id });
      return result;
    },
    account: async (_: any, args: { input: { user_id: string } }) => {
      const result = await loadAccount.execute(args.input);
      return result;
    },
  },
};
