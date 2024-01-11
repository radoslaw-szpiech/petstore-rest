import type { Config } from 'jest';

const config: Config = {
  // The glob patterns Jest uses to detect test files
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],

  // Whether to use watchman for file crawling
  // watchman: true,
};

export default config;
