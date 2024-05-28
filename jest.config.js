module.exports = {
  roots: ["<rootDir>/src"],
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript",
  ],
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "js"],
  testMatch: ["**/*.spec.ts", "**/*.test.ts"],
  // transform: {
  //   ".+\\.ts$": "ts-jest",
  // },
  ".+\\.ts$": ["ts-jest"],
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
  },
  globals: {
    "ts-jest": {
      useESM: true,
    },
  },
  extensionsToTreatAsEsm: [".ts"],
};
