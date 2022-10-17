import glob from 'glob';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import babel from '@rollup/plugin-babel'
import strip from '@rollup/plugin-strip'
import resolve from '@rollup/plugin-node-resolve'
import filesize from 'rollup-plugin-filesize'
import multiInput from 'rollup-plugin-multi-input'
import progress from 'rollup-plugin-progress'
import { terser } from 'rollup-plugin-terser'

const production = process.env.NODE_ENV === 'production'
const target = process.env.BABEL_ENV

export default {
  input: Object.fromEntries(
    glob.sync('src/**/*.js').filter(file => !file.includes('__tests__')).map(file => [
        path.relative("src", file.slice(0, file.length - path.extname(file).length)),
        fileURLToPath(new URL(file, import.meta.url))
      ]
    )
  ),
	output: {
		name: '@untemps/utils',
		dir: `dist/${target}`,
		format: target,
		exports: 'auto',
	},
	external: [/@babel\/runtime/],
	plugins: [
		progress(),
		multiInput(),
		strip(),
		babel({
			exclude: 'node_modules/**',
			babelHelpers: 'runtime',
		}),
		resolve(),
		filesize(),
		production && terser(),
	],
}
