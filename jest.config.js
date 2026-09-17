/** @type {import('jest').Config} */
module.exports = {
  preset: "jest-preset-angular",
  globalSetup: "jest-preset-angular/global-setup",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  testEnvironment: "jsdom",
  testMatch: ["<rootDir>/src/**/*.spec.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.(ts|mjs|js|html)$": [
      "jest-preset-angular",
      {
        tsconfig: "<rootDir>/tsconfig.spec.json",
        stringifyContentPathRegex: "\\.(html|svg)$",
      },
    ],
  },
};
