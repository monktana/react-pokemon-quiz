/// <reference types="vitest" />

import { coverageConfigDefaults, defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

// https://vitest.dev/config/
export default defineConfig((configEnv) =>
  mergeConfig(
    viteConfig(configEnv),
    defineConfig({
      test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/vitest.setup.ts',
        coverage: {
          exclude: [...coverageConfigDefaults.exclude, '**/*.cy.tsx'],
        },
      },
    })
  )
);
