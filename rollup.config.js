import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import filesize from "rollup-plugin-filesize"
import { terser } from 'rollup-plugin-terser'
import visualizer from 'rollup-plugin-visualizer'

const production = process.env.NODE_ENV === 'production'
const target = process.env.BABEL_ENV

export default {
	input: 'src/index.js',
	output: {
		name: '@untemps/utils',
		file: {
			cjs: 'dist/index.js',
			es: 'dist/index.es.js',
		}[target],
		format: target,
		sourcemap: 'inline'
	},
	plugins: [
		babel({
			exclude: 'node_modules/**',
			babelHelpers: 'bundled'
		}),
		resolve(),
		commonjs(),
		filesize(),
		production && terser(),
		visualizer({
			sourcemap: true,
			open: true
		})
	],
}
