import { Transaction } from "@/domain/entities";
import mongoose, { Schema } from "mongoose";
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
    type: Number,
    required: true,
  },
});

export const TransactionModel = mongoose.model<TransactionDocument>(
  ModelNames.Transactions,
  TransactionSchema
);
