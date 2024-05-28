import type { Config } from "jest";

export default {
  verbose: true,
  roots: ["<rootDir>/src"],
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.ts?$": ["ts-jest", {}],
  },
} as Config;
