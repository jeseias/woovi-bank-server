import type { User } from "domain/entities";
import type { UserRepository } from "domain/repositories/users";
import { jest } from "@jest/globals";

export const mockUserModel = (): User.Model => ({
  id: "any_id",
  name: "any_name",
  password: "any_password",
  tax_id: "any_tax_id",
});

export const mockUserRepository = () => ({
  findUser: jest
    .fn<UserRepository["findUser"]>()
    .mockResolvedValue(mockUserModel()),
  createUser: jest
    .fn<UserRepository["createUser"]>()
    .mockResolvedValue(mockUserModel()),
});
