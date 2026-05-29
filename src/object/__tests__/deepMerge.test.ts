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

	it('does not alias nested source objects into result', () => {
		const nested = { baz: 1 }
		const source = { foo: nested }
		const result = deepMerge(source, {})
		expect(result.foo).not.toBe(nested)
		expect(result.foo).toEqual(nested)
	})

	describe('non-plain-object source values', () => {
		it('does not alias arrays from source into result', () => {
			const items = [1, 2]
			const source = { items }
			const result = deepMerge(source, {})
			expect(result.items).not.toBe(items)
			;(result.items as number[]).push(3)
			expect(items).toEqual([1, 2])
		})

		it('clones Date instances from source', () => {
			const created = new Date('2025-01-01')
			const source = { created }
			const result = deepMerge(source, {})
			expect(result.created).not.toBe(created)
			expect(result.created).toEqual(created)
		})

		it('clones Map instances from source', () => {
			const map = new Map([['a', 1]])
			const source = { map }
			const result = deepMerge(source, {})
			expect(result.map).not.toBe(map)
			expect(result.map).toEqual(map)
		})

		it('clones Set instances from source', () => {
			const set = new Set([1, 2, 3])
			const source = { set }
			const result = deepMerge(source, {})
			expect(result.set).not.toBe(set)
			expect(result.set).toEqual(set)
		})

		it('does not alias arrays when overwriting an existing key', () => {
			const items = [1, 2]
			const source = { items }
			const result = deepMerge(source, { items: 'old' })
			expect(result.items).not.toBe(items)
			;(result.items as number[]).push(3)
			expect(items).toEqual([1, 2])
		})
	})

	describe('merge semantics', () => {
		it('replaces arrays instead of merging them', () => {
			const result = deepMerge({ a: [1, 2] }, { a: [3, 4, 5] })
			expect(result).toEqual({ a: [1, 2] })
		})

		it('merges objects nested beyond two levels', () => {
			const source = { a: { b: { c: { d: 1 } } } }
			const target = { a: { b: { c: { e: 2 }, x: 3 } } }
			const result = deepMerge(source, target)
			expect(result).toEqual({ a: { b: { c: { d: 1, e: 2 }, x: 3 } } })
		})

		it('replaces a primitive target value with an object from source', () => {
			const result = deepMerge({ a: { b: 1 } }, { a: 5 })
			expect(result).toEqual({ a: { b: 1 } })
		})

		it('replaces an object target value with a primitive from source', () => {
			const result = deepMerge({ a: 5 }, { a: { b: 1 } })
			expect(result).toEqual({ a: 5 })
		})
	})

	describe('mutate: true', () => {
		it('returns the target object itself', () => {
			const source = { foo: 1 }
			const target = { bar: 2 }
			const result = deepMerge(source, target, true)
			expect(result).toBe(target)
		})

		it('clones non-plain source values instead of aliasing them', () => {
			const items = [1, 2]
			const source = { items }
			const target: Record<string, unknown> = {}
			deepMerge(source, target, true)
			expect(target.items).not.toBe(items)
			;(target.items as number[]).push(3)
			expect(items).toEqual([1, 2])
		})

		it('mutates target in place', () => {
			const source = { foo: 1, bar: { baz: 2 } }
			const target: Record<string, unknown> = { foo: 2, bar: { qux: 3 } }
			deepMerge(source, target, true)
			expect(target).toEqual({ foo: 1, bar: { baz: 2, qux: 3 } })
		})

		it('does not alias nested source objects into target', () => {
			const nested = { baz: 1 }
			const source = { foo: nested }
			const target: Record<string, unknown> = {}
			deepMerge(source, target, true)
			expect(target.foo).not.toBe(nested)
			expect(target.foo).toEqual(nested)
		})
	})
})
