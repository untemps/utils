import { globSync } from 'node:fs';
import { extname, relative } from 'node:path'
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      name: '@untemps/utils',
      entry: Object.fromEntries(
        globSync('src/**/*.js', { exclude: (file) => file.includes('__tests__') }).map(file => [
            relative("src", file.slice(0, file.length - extname(file).length)),
            fileURLToPath(new URL(file, import.meta.url))
          ]
        )
      )
    },
  },
})
