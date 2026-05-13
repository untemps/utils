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

	it('does not mutate source or target', () => {
		const source = { foo: 1, bar: { baz: 2 } }
		const target = { foo: 2, bar: { qux: 3 } }
		const sourceBefore = structuredClone(source)
		const targetBefore = structuredClone(target)
		deepMerge(source, target)
		expect(source).toEqual(sourceBefore)
		expect(target).toEqual(targetBefore)
	})

	it('returns a new object distinct from both source and target', () => {
		const source = { foo: 1 }
		const target = { bar: 2 }
		const result = deepMerge(source, target)
		expect(result).not.toBe(source)
		expect(result).not.toBe(target)
	})
})
