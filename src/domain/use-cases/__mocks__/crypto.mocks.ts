import type { CryptoRepository } from "domain/services";
import { jest } from "@jest/globals";

export const mockCryptoRepository = () =>
  ({
    hash: jest.fn<CryptoRepository["hash"]>().mockResolvedValue("any_hash"),
    compare: jest.fn<CryptoRepository["compare"]>().mockResolvedValue(true),
    decrypt: jest.fn<CryptoRepository["decrypt"]>().mockResolvedValue({}),
    encrypt: jest
      .fn<CryptoRepository["encrypt"]>()
      .mockResolvedValue("any_encrypt"),
  });
