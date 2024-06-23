import { makeLoadUserByTaxId } from "@/main/factories/use-case-factories";

const loadMe = makeLoadUserByTaxId();

export const usersResolvers = {
  Query: {
    user: async (_: any, args: { input: { tax_id: string } }) => {
      const result = loadMe.execute({ tax_id: args.input.tax_id });
      return result;
    },
  },
};
