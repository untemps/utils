import { deepClone } from '../deepClone'

describe('deepClone', () => {
	it('clones a plain object', () => {
		const original = { a: 1, b: 'hello' }
		const clone = deepClone(original)

		expect(clone).toEqual(original)
		expect(clone).not.toBe(original)
	})

	it('clones nested objects deeply', () => {
		const original = { a: { b: { c: 42 } } }
		const clone = deepClone(original)

		expect(clone).toEqual(original)
		expect(clone.a).not.toBe(original.a)
		expect(clone.a.b).not.toBe(original.a.b)
	})

	it('clones arrays deeply', () => {
		const original = { items: [1, [2, 3], [4, [5]]] }
		const clone = deepClone(original)

		expect(clone).toEqual(original)
		expect(clone.items).not.toBe(original.items)
		expect(clone.items[1]).not.toBe(original.items[1])
	})

	it('clones Date instances', () => {
		const original = { created: new Date('2025-01-01') }
		const clone = deepClone(original)

		expect(clone.created).toEqual(original.created)
		expect(clone.created).not.toBe(original.created)
		expect(clone.created).toBeInstanceOf(Date)
	})

	it('clones RegExp instances', () => {
		const original = { pattern: /foo/gi }
		const clone = deepClone(original)

		expect(clone.pattern).toEqual(original.pattern)
		expect(clone.pattern).not.toBe(original.pattern)
		expect(clone.pattern).toBeInstanceOf(RegExp)
	})

	it('clones Map instances', () => {
		const original = new Map([
			['a', 1],
			['b', 2],
		])
		const clone = deepClone(original)

		expect(clone).toEqual(original)
		expect(clone).not.toBe(original)
		expect(clone).toBeInstanceOf(Map)
	})

	it('clones Set instances', () => {
		const original = new Set([1, 2, 3])
		const clone = deepClone(original)

		expect(clone).toEqual(original)
		expect(clone).not.toBe(original)
		expect(clone).toBeInstanceOf(Set)
	})

	it('clones primitives', () => {
		expect(deepClone(42)).toBe(42)
		expect(deepClone('hello')).toBe('hello')
		expect(deepClone(true)).toBe(true)
		expect(deepClone(null)).toBe(null)
		expect(deepClone(undefined)).toBe(undefined)
	})

	it('produces an independent clone (mutating clone does not affect original)', () => {
		const original = { a: 1, b: { c: [2, 3] } }
		const clone = deepClone(original)

		clone.a = 99
		clone.b.c.push(4)

		expect(original.a).toBe(1)
		expect(original.b.c).toEqual([2, 3])
	})
})
