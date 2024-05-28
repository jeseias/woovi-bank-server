import type { Cryptography } from "domain/services";
import { vi } from "vitest";

export const mockHashRepository = () =>
  ({
    hash: vi.fn().mockResolvedValue("any_hash"),
  } as Cryptography.Hasher.Contract);
