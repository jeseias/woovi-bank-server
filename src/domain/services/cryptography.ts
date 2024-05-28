export namespace Cryptography {
  export namespace Hasher {
    export interface Contract {
      hash(value: string): Promise<string>;
    }
  }

  export namespace HashCompare {
    export interface Contract {
      compare(params: { value: string; hash: string }): Promise<boolean>;
    }
  }

  export namespace Encrypter {
    export interface Contract {
      encrypt(value: any, expiresIn: string | number): Promise<string>;
    }
  }

  export namespace Decrypter {
    export interface Contract<R> {
      decrypt(value: any): Promise<R>;
    }
  }
}

export type CryptoRepository = Cryptography.Hasher.Contract &
  Cryptography.HashCompare.Contract &
  Cryptography.Encrypter.Contract &
  Cryptography.Decrypter.Contract<any>;
