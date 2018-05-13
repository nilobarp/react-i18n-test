module.exports = {
  verbose: true,
  globals: {
    "ts-jest": {
      useBabelrc: true
    }
  },
  moduleNameMapper: {
    "^modules/(.*)": "<rootDir>/src/modules/$1",
    "^components/(.*)": "<rootDir>/src/components/$1",
    "^locales/(.*)": "<rootDir>/src/locales/$1",
    "^services/(.*)": "<rootDir>/src/services/$1",
    "^utils/(.*)": "<rootDir>/src/utils/$1"
  },
  modulePathIgnorePatterns: ["/node_modules/"],
  transformIgnorePatterns: ["/node_modules/"],
  setupTestFrameworkScriptFile: "./jest.setup.js",
  transform: {
    "^.+\\.jsx?$": "./node_modules/babel-jest",
    "^.+\\.tsx?$": "ts-jest"
  },
  testRegex: "\\.(test|spec)\\.tsx?$",
  roots: ["src"],
  collectCoverage: false,
  coverageDirectory: "./coverage",
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!**/node_modules/**"],
  coverageReporters: ["lcov", "text-summary", "html"],
  mapCoverage: true,
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"]
};
