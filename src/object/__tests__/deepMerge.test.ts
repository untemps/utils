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

		it('handles null values without throwing', () => {
			expect(deepMerge({ a: null }, { a: null })).toEqual({ a: null })
			expect(deepMerge({ a: null }, { a: { b: 1 } })).toEqual({ a: null })
			expect(deepMerge({ a: { b: 1 } }, { a: null })).toEqual({ a: { b: 1 } })
		})
	})

	describe('non-cloneable values', () => {
		it('copies a function from source by reference instead of throwing', () => {
			const fn = () => 1
			const result = deepMerge({ a: fn }, { b: 2 })
			expect(result.a).toBe(fn)
			expect(result.b).toBe(2)
		})

		it('copies a function from target by reference instead of throwing', () => {
			const fn = () => 1
			const result = deepMerge({ b: 2 }, { a: fn })
			expect(result.a).toBe(fn)
			expect(result.b).toBe(2)
		})

		it('copies a function nested in a source object by reference', () => {
			const fn = () => 1
			const result = deepMerge({ a: { fn } }, {})
			expect((result.a as { fn: () => number }).fn).toBe(fn)
		})

		it('keeps a non-cloneable class instance by reference instead of throwing', () => {
			class Box {
				fn = () => 1
			}
			const box = new Box()
			const result = deepMerge({ b: 1 }, { box })
			expect(result.box).toBe(box)
		})

		it('copies a non-cloneable element inside a source array by reference', () => {
			const fn = () => 1
			const items = [fn, 2]
			const result = deepMerge({ a: items }, {})
			const arr = result.a as [() => number, number]
			expect(arr).not.toBe(items)
			expect(arr[0]).toBe(fn)
			expect(arr[1]).toBe(2)
		})
	})

	describe('circular references', () => {
		it('clones a circular target without throwing', () => {
			const target: Record<string, unknown> = { a: 1 }
			target.self = target
			const result = deepMerge({ b: 2 }, target)
			expect(result).not.toBe(target)
			expect(result.a).toBe(1)
			expect(result.b).toBe(2)
			expect(result.self).toBe(result)
		})

		it('clones a circular source value without throwing', () => {
			const node: Record<string, unknown> = { id: 1 }
			node.self = node
			const result = deepMerge({ node }, {})
			const cloned = result.node as Record<string, unknown>
			expect(cloned).not.toBe(node)
			expect(cloned.id).toBe(1)
			expect(cloned.self).toBe(cloned)
		})

		it('clones a circular array without throwing', () => {
			const arr: unknown[] = [1]
			arr.push(arr)
			const result = deepMerge({ arr }, {})
			const cloned = result.arr as unknown[]
			expect(cloned).not.toBe(arr)
			expect(cloned[0]).toBe(1)
			expect(cloned[1]).toBe(cloned)
		})

		it('merges when both source and target are circular without overflowing', () => {
			const source: Record<string, unknown> = { a: 1 }
			source.self = source
			const target: Record<string, unknown> = { b: 2 }
			target.self = target
			const result = deepMerge(source, target)
			expect(result).not.toBe(source)
			expect(result).not.toBe(target)
			expect(result.a).toBe(1)
			expect(result.b).toBe(2)
			expect(result.self).toBe(result)
		})

		it('merges circular source and target in place when mutate is true', () => {
			const source: Record<string, unknown> = { a: 1 }
			source.self = source
			const target: Record<string, unknown> = { b: 2 }
			target.self = target
			const result = deepMerge(source, target, true)
			expect(result).toBe(target)
			expect(result.a).toBe(1)
			expect(result.b).toBe(2)
			expect(result.self).toBe(result)
		})
	})

	describe('source aliasing', () => {
		it('preserves aliasing for two source properties sharing the same object reference', () => {
			const shared = { n: 1 }
			const result = deepMerge({ a: shared, b: shared }, {}) as { a: object; b: object }
			expect(result.a).not.toBe(shared)
			expect(result.a).toBe(result.b)
		})

		it('preserves aliasing for shared references buried under merged subtrees', () => {
			const shared = { z: 1 }
			const source = { a: { sub: shared }, b: { sub: shared } }
			const target = { a: { keepA: 1 }, b: { keepB: 2 } }
			const result = deepMerge(source, target) as {
				a: { sub: object; keepA: number }
				b: { sub: object; keepB: number }
			}
			expect(result.a.sub).not.toBe(shared)
			expect(result.a.sub).toBe(result.b.sub)
			expect(result.a.keepA).toBe(1)
			expect(result.b.keepB).toBe(2)
		})

		it('preserves aliasing for an object shared between source and target', () => {
			const shared = { z: 1 }
			const result = deepMerge({ fromSource: shared }, { fromTarget: shared }) as {
				fromSource: object
				fromTarget: object
			}
			expect(result.fromSource).not.toBe(shared)
			expect(result.fromSource).toBe(result.fromTarget)
		})

		it('preserves aliasing for shared array elements', () => {
			const shared = { n: 1 }
			const result = deepMerge({ items: [shared, shared] }, {}) as { items: object[] }
			expect(result.items[0]).not.toBe(shared)
			expect(result.items[0]).toBe(result.items[1])
		})
	})

	describe('prototype pollution', () => {
		afterEach(() => {
			delete (Object.prototype as Record<string, unknown>).polluted
		})

		it('ignores top-level __proto__ keys without polluting Object.prototype', () => {
			const payload = JSON.parse('{"__proto__":{"polluted":true}}')
			const result = deepMerge(payload, {})
			expect(({} as Record<string, unknown>).polluted).toBeUndefined()
			expect(Object.getPrototypeOf(result)).toBe(Object.prototype)
		})

		it('ignores nested __proto__ keys when cloning', () => {
			const payload = JSON.parse('{"a":{"__proto__":{"polluted":true}}}')
			const result = deepMerge(payload, {})
			expect(({} as Record<string, unknown>).polluted).toBeUndefined()
			expect(Object.getPrototypeOf(result.a)).toBe(Object.prototype)
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

		it('keeps a non-cloneable source value by reference instead of throwing', () => {
			const fn = () => 1
			const target: Record<string, unknown> = {}
			deepMerge({ fn }, target, true)
			expect(target.fn).toBe(fn)
		})
	})
})
