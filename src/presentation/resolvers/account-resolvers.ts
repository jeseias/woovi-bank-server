import {
  makeCalculateAvailableAccountBalance,
  makeLoadAccount,
} from "@/main/factories/use-case-factories";

interface Params {
  input: { user_id: string };
}

const calculateBalance = makeCalculateAvailableAccountBalance();
const loadAccount = makeLoadAccount();

export const accountResolvers = {
  Query: {
    calculateAvailableBalance: async (_: any, args: Params) => {
      const result = await calculateBalance.execute(args.input);
      return result;
    },
    account: async (_: any, args: Params) => {
      const result = await loadAccount.execute(args.input);
      return result;
    },
  },
};
