import { makeCalculateAvailableAccountBalance } from "@/main/factories/use-case-factories";

const calculateBalance = makeCalculateAvailableAccountBalance();

export const accountResolvers = {
  Mutation: {
    calculateAvailableBalance: async (_: any, args: { user_id: string }) => {
      const result = await calculateBalance.execute({ user_id: args.user_id });
      return result;
    },
  },
};
