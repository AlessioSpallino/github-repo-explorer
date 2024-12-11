module.exports = {
    testEnvironment: 'jsdom', // Use jsdom for testing components
    transform: {
        '^.+\\.tsx?$': 'ts-jest', // If using TypeScript
        '^.+\\.jsx?$': 'babel-jest', // If using Babel
    },
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock CSS modules
    },
};
