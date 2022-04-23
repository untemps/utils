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
	input: 'src/**[!__tests__]/*.js',
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
