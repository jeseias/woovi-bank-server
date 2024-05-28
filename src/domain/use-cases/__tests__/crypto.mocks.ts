import type { CryptoRepository } from "domain/services";
import { jest } from "@jest/globals";

export const mockCryptoRepository = () =>
  ({
    hash: jest.fn().mockResolvedValue("any_hash"),
    compare: jest.fn().mockResolvedValue(true),
    decrypt: jest.fn().mockResolvedValue({}),
    encrypt: jest.fn().mockResolvedValue("any_encrypt"),
  } as CryptoRepository);
