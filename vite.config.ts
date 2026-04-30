import { globSync } from 'node:fs'
import { extname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	build: {
		lib: {
			entry: Object.fromEntries(
				globSync('src/**/*.ts', { exclude: (file) => file.includes('__tests__') }).map((file) => [
					relative('src', file.slice(0, file.length - extname(file).length)),
					fileURLToPath(new URL(file, import.meta.url)),
				])
			),
		},
	},
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: ['./vitest-setup.ts'],
		include: ['src/**/__tests__/**/*.ts'],
		coverage: {
			provider: 'v8',
			reportsDirectory: './coverage',
			include: ['src/**'],
			exclude: ['src/index.ts'],
			thresholds: {
				statements: 95,
				branches: 90,
				functions: 95,
				lines: 95,
			},
		},
	},
})
