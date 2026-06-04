import { createElement } from '../createElement'
import { modifyElement } from '../modifyElement'
import { removeElement } from '../removeElement'

describe('removeElement', () => {
	let el: HTMLElement | null = null

	beforeEach(() => {
		el = createElement({ attributes: { id: 'foo' }, parent: document.body })
	})

	afterEach(() => {
		removeElement(el as HTMLElement)
	})

	// prettier-ignore
	it.each([
		{
			name: 'removes explicit element',
			getElement: () => el as HTMLElement,
		},
		{
			name: 'removes queried element',
			getElement: () => '#foo',
		},
	])('$name', ({ getElement }) => {
		expect(el).toBeInTheDocument()
		expect(removeElement(getElement())).not.toBeInTheDocument()
	})

	it('returns undefined if element is null', () => {
		expect(removeElement(null as unknown as HTMLElement)).toBeUndefined()
	})

	it('returns the element unchanged when it has no parent', () => {
		const detached = document.createElement('div')
		expect(removeElement(detached)).toBe(detached)
	})

	it('throws ReferenceError when string selector does not match any element', () => {
		expect(() => removeElement('#does-not-exist')).toThrow(ReferenceError)
		expect(() => removeElement('#does-not-exist')).toThrow("Selector '#does-not-exist' did not match any element")
	})

	describe('parity with modifyElement', () => {
		// prettier-ignore
		it.each([
			{ name: 'removeElement', fn: () => removeElement('#does-not-exist') },
			{ name: 'modifyElement', fn: () => modifyElement('#does-not-exist', { class: 'bar' }) },
		])('$name throws ReferenceError with the same message on a missing selector', ({ fn }) => {
			expect(fn).toThrow(ReferenceError)
			expect(fn).toThrow("Selector '#does-not-exist' did not match any element")
		})
	})
})
