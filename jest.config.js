module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
    },
    moduleNameMapper: {
        '\\.css$': 'identity-obj-proxy',
    },
    setupFilesAfterEnv: ['@testing-library/jest-dom'],
    testPathIgnorePatterns: ['/node_modules/', '/.next/'],
    transformIgnorePatterns: ['/node_modules/', '/.next/'],
};
