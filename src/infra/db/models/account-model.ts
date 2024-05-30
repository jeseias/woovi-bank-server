import mongoose, { Document, Schema, Types } from "mongoose";
import { ModelNames } from "./model-names";
import { Account } from "@/domain/entities";

export interface AccountDocument extends Document, Account.Entity {}

const AccountSchema = new Schema<AccountDocument>({
  [Account.Fields.Account_Number]: {
    type: String,
    required: true,
  },
  [Account.Fields.User_Id]: {
    type: Types.ObjectId,
    required: true,
  } as any as string,
  [Account.Fields.Balance]: {
    type: Number,
    required: true,
  },
});

export const AccountModel = mongoose.model<AccountDocument>(
  ModelNames.Accounts,
  AccountSchema
);
