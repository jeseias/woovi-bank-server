declare namespace NodeJS {
  export interface ProcessEnv {
    JWT_SECRET: string;
    MONGO_URL: string
  }
}