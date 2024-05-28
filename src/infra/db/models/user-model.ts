import { User } from "@/domain/entities";
import mongoose, { Schema } from "mongoose";
import { ModelNames } from "./model-names";

const UserSchema = new Schema<User.Model>({
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

export const UserModel = mongoose.model(ModelNames.Users, UserSchema);
