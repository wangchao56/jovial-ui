import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { storybookTest } from '@storybook/experimental-addon-test/vitest-plugin'
import { defineWorkspace } from 'vitest/config'

const dirname
  = typeof __dirname !== 'undefined'
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url))

export default defineWorkspace([
  // This is the path to your existing Vitest config file
  './vitest.config.ts',
  {
    // This is the path to your existing Vite config file
    extends: './vite.config.ts',
    plugins: [
      storybookTest({
        configDir: path.join(dirname, '.storybook'),
        storybookScript: 'pnpm storybook --ci',
      }),
    ],
    test: {
      name: 'storybook',
      // Enable browser mode
      browser: {
        enabled: true,
        name: 'chromium',
        // Make sure to install Playwright
        provider: 'playwright',
        headless: true,
      },
      setupFiles: ['./.storybook/vitest.setup.ts'],
    },
  },
])
