import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'

export default tseslint.config(
	{
		ignores: ['dist/**', 'coverage/**', 'docs/**', 'scripts/**'],
	},
	eslint.configs.recommended,
	tseslint.configs.recommended,
	{
		languageOptions: {
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
		rules: {
			'@typescript-eslint/no-explicit-any': 'error',
			'@typescript-eslint/no-unsafe-assignment': 'error',
			'no-prototype-builtins': 'error',
			'guard-for-in': 'error',
		},
	},
	{
		files: ['src/**/__tests__/**/*.ts'],
		rules: {
			'@typescript-eslint/no-unsafe-assignment': 'off',
		},
	},
)
