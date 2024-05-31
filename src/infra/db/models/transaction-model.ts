import { Transaction } from "@/domain/entities";
import mongoose, { Schema, Document, Types } from "mongoose";
import { ModelNames } from "./model-names";

export interface TransactionDocument extends Document, Transaction.Entity {}

const TransactionSchema = new Schema<TransactionDocument>({
  [Transaction.Fields.Receiver_Id]: {
    type: String,
    required: true,
  },
  [Transaction.Fields.Sender_Id]: {
    type: String,
    required: true,
  },
  [Transaction.Fields.Transaction_Id]: {
    type: String,
    required: true,
  },
  [Transaction.Fields.Value]: {
    type: Types.Decimal128,
    required: true,
  } as any as number,
});

export const TransactionModel = mongoose.model<TransactionDocument>(
  ModelNames.Transactions,
  TransactionSchema
);
