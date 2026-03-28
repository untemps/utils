import { deepMerge } from '../deepMerge'

describe('deepMerge', () => {
	// prettier-ignore
	it.each([
		{
			name: 'merges empty objects',
			source: {},
			target: {},
			expected: {},
		},
		{
			name: 'merges complex objects',
			source: {
				foo: 1,
				bar: {
					gag: [1, 2, 3],
					pol: {
						mur: 'mur',
					},
				},
			},
			target: {
				foo: 2,
				zaz: {
					juv: 1,
				},
				bar: {
					gag: 'gag',
				},
			},
			expected: {
				foo: 1,
				zaz: {
					juv: 1,
				},
				bar: {
					gag: [1, 2, 3],
					pol: {
						mur: 'mur',
					},
				},
			},
		},
	])('$name', ({ source, target, expected }) => {
		expect(deepMerge(source, target)).toEqual(expected)
	})
})
