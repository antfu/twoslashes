import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

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
