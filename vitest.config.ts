import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [
    tsconfigPaths(),
  ],
  test: {
    benchmark: {
      // reporters: ['default', 'json'],
      // outputFile: {
      //   json: 'bench/results.json'
      // }
    },
    testTimeout: 15000,
    coverage: {
      include: [
        '**/src/**/*.ts',
      ],
      exclude: [
        '**/twoslash-cdn/**',
        '**/types/**',
      ],
    },
  },
})
