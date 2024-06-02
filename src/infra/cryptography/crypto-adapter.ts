import { CryptoRepository } from "@/domain/services";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { _env } from "@/main/config/_envs";

export class CryptoAdapter implements CryptoRepository {
  constructor(private readonly secret: string, private readonly salt: number) {}

  async hash(value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt);
    return hash;
  }

  async compare({
    hash,
    value,
  }: {
    value: string;
    hash: string;
  }): Promise<boolean> {
    const isValid = await bcrypt.compare(value, hash);
    return isValid;
  }

  async encrypt(value: string, expirationInMs: number): Promise<string> {
    return jwt.sign(value, this.secret, {
      expiresIn: expirationInMs,
    });
  }

  async decrypt(value: string): Promise<JwtPayload> {
    return Promise.resolve(jwt.verify(value, this.secret) as JwtPayload);
  }
}

export const cryptoAdapter = new CryptoAdapter(_env.JWT_SECRET, 12);
