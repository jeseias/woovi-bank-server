import { User } from "@/domain/entities";
import mongoose, { Document, Schema } from "mongoose";
import { ModelNames } from "./model-names";

export interface UserDocument extends Document, User.Entity {}

const UserSchema = new Schema<UserDocument>({
  [User.Fields.Name]: {
    type: String,
    required: true,
  },
  [User.Fields.Password]: {
    type: String,
    required: true,
  },
  [User.Fields.Tax_Id]: {
    type: String,
    required: true,
    unique: true,
  },
});

export const UserModel = mongoose.model<UserDocument>(
  ModelNames.Users,
  UserSchema
);
