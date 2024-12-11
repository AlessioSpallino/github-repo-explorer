// jest.config.js
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './', // Path to your Next.js project
});

// Custom settings for Jest
const customJestConfig = {
  testEnvironment: 'jsdom', // Ensure this is set to 'jsdom'
  setupFilesAfterEnv: ['./jest.setup.js'], // Optional: setup file if needed
};

module.exports = createJestConfig(customJestConfig);
