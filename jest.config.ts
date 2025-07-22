import type { Config } from 'jest';

const config: Config = {
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
  testEnvironment: 'jsdom',
  roots: ['src'],
  collectCoverage: true,
  coverageReporters: ['text', 'cobertura'],
  collectCoverageFrom: ['src/*/**/**.{ts,tsx}'],
};

export default config;
