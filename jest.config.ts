/** @type {import('ts-jest').JestConfigWithTsJest} */
// module.exports = {
//   preset: 'ts-jest',
//   testEnvironment: 'node',
// };

module.exports = {
    rootDir: 'src',
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    moduleNameMapper: {
        '\\.(gif|ttf|eot|png)$': '<rootDir>/config/jest/fileMock.ts',
        '^.+\\.(css|less|scss|sass)$': '<rootDir>/config/jest/styleMock.ts',
        "\\.svg": "<rootDir>/config/jest/__mocks__/svg.ts"
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
    // transformIgnorePatterns: [
    //     '\\.svg$',
    // ],
    modulePaths: ['<rootDir>/src'],
};