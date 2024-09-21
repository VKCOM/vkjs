import path from 'node:path';

const config = {
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
  testEnvironment: 'jsdom',
  roots: [path.join(__dirname, 'src')],
  collectCoverage: true,
  coverageReporters: ['text', 'cobertura'],
  collectCoverageFrom: ['src/*/**/**.{ts,tsx}'],
};

export default config;
