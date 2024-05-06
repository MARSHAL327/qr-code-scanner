/** @type {import('ts-jest').JestConfigWithTsJest} */
// module.exports = {
//   preset: 'ts-jest',
//   testEnvironment: 'node',
// };

export default {
  rootDir: 'src',
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    // "^.+\\.svg$": "jest-transformer-svg",
    // "^.+\\.svg": "jest-svg-transformer",
    // "^.+\\.svg": "svg-jest-transformer"
    "^.+\\.svg$": '<rootDir>/config/jest/svgTransform.ts',
    // "^.+\\.svg$": '<rootDir>/config/jest/svgTransform.ts',
    // process `*.tsx` files with `ts-jest`
  },
  moduleNameMapper: {
    '\\.(gif|ttf|eot|png)$': '<rootDir>/config/jest/fileMock.ts',
    '^.+\\.(css|less|scss|sass)$': '<rootDir>/config/jest/styleMock.ts',
    // '\\.svg$': '<rootDir>/config/jest/__mocks__/svg.ts',
  },
  setupFilesAfterEnv: ['./config/jest/setupTests.ts'],
  moduleFileExtensions: [
    // Place tsx and ts to beginning as suggestion from Jest team
    // https://jestjs.io/docs/configuration#modulefileextensions-arraystring
    'tsx',
    'ts',
    'web.js',
    'js',
    'web.ts',
    'web.tsx',
    'json',
    'web.jsx',
    'jsx',
    'node',
  ],
  modulePaths: ['<rootDir>/src'],
};


// /** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
// module.exports = {
//   preset: 'ts-jest',
//   moduleNameMapper: {
//
//     // if your using tsconfig.paths thers is no harm in telling jest
//     '@components/(.*)$': '<rootDir>/src/components/$1',
//     '@/(.*)$': '<rootDir>/src/$1',
//
//     // mocking assests and styling
//     '^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
//         '<rootDir>/tests/mocks/fileMock.ts',
//     '^.+\\.(css|less|scss|sass)$': '<rootDir>/tests/mocks/styleMock.ts',
//     /* mock models and services folder */
//     '(assets|models|services)': '<rootDir>/tests/mocks/fileMock.ts',
//   },
//   // to obtain access to the matchers.
//   setupFilesAfterEnv: ['./src/setupTests.ts'],
//
//   moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
//   modulePaths: ['<rootDir>'],
//   testEnvironment: 'jsdom',
// };

// module.exports = {
//   "transform": {
//     "^.+\\.tsx?$": "ts-jest"
//   },
//   "moduleFileExtensions": [
//     "ts",
//     "tsx",
//     "js",
//     "jsx",
//     "json",
//     "node"
//   ],
//   "setupFiles": [
//     "<rootDir>/src/setupTests.ts"
//   ]
// };
//
// module.exports = {
//   preset: 'ts-jest',
//   testEnvironment: 'jsdom',
// };