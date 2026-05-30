const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
    testEnvironment: "node",
    transform: {
        ...tsJestTransformCfg,
    },
    transformIgnorePatterns: [
        "/node_modules/(?!@faker-js/faker)"
    ],
    moduleNameMapper: {
        "^@test/(.*)$": "<rootDir>/test/$1",
        "^@exception/(.*)$": "<rootDir>/src/exceptions/$1",
        "^@infra/(.*)$": "<rootDir>/src/infra/$1",
        "@graphql-pkg/(.*)$": "<rootDir>/src/graphql/$1",
        "@services/(.*)$": "<rootDir>/src/services/$1",
        "@repositories/(.*)$": "<rootDir>/src/repositories/$1",
        "@middleware/(.*)$": "<rootDir>/src/middlewares/$1",
    }
};