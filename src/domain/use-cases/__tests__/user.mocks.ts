import type { User } from "domain/entities";
import type { UserRepository } from "domain/repositories/users";
import { vi } from "vitest";

export const mockUserModel = (): User.Model => ({
  id: "any_id",
  name: "any_name",
  password: "any_password",
  tax_id: "any_tax_id",
});

export const mockUserRepository = () =>
  ({
    findUser: vi.fn().mockResolvedValue(mockUserModel()),
    createUser: vi.fn().mockResolvedValue(mockUserModel()),
  } as UserRepository);
