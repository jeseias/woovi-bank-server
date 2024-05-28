import type { CryptoRepository } from "domain/services";
import { vi } from "vitest";

export const mockCryptoRepository = () =>
  ({
    hash: vi.fn().mockResolvedValue("any_hash"),
    compare: vi.fn().mockResolvedValue(true),
    decrypt: vi.fn().mockResolvedValue({}),
    encrypt: vi.fn().mockResolvedValue("any_encrypt"),
  } as CryptoRepository);
