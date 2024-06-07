import mongoose, { Document, Schema, Types } from "mongoose";
import { ModelNames } from "./model-names";
import { Account } from "@/domain/entities";

export type AccountDocument = Document & Account.IModel; 

const AccountSchema = new Schema<AccountDocument>({
  [Account.Fields.Account_Number]: {
    type: Number,
    required: true,
    unique: true,
  },
  [Account.Fields.User_Id]: {
    type: Types.ObjectId,
    required: true,
  } as any as string,
  [Account.Fields.Balance]: {
    type: Number,
    required: true,
    default: 0,
  },
});

export const AccountModel = mongoose.model<AccountDocument>(
  ModelNames.Accounts,
  AccountSchema
);
