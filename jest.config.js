module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        '^.+\\.(ts|tsx|js|jsx)$': ['babel-jest', { configFile: './babel-test.config.js' }],
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^@configs/(.*)$': '<rootDir>/src/configs/$1',
        '^@libs/(.*)$': '<rootDir>/src/libs/$1',
        '\\.css$': 'identity-obj-proxy',
    },
    setupFilesAfterEnv: ['@testing-library/jest-dom'],
    testPathIgnorePatterns: ['/node_modules/', '/.next/', '/cypress/'],
    transformIgnorePatterns: ['/node_modules/', '/.next/'],
};
