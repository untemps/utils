import { createElement } from '../createElement'
import { modifyElement } from '../modifyElement'
import { removeElement } from '../removeElement'

describe('modifyElement', () => {
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
			name: 'adds attributes on explicit element',
			getElement: () => el as HTMLElement,
			attributes: {
				class: 'bar',
				'data-foo': 'foo'
			},
			expected: '<div id="foo" class="bar" data-foo="foo"></div>'
		},
		{
			name: 'removes attributes on explicit element',
			getElement: () => el as HTMLElement,
			attributes: {
				id: undefined
			},
			expected: '<div></div>'
		},
		{
			name: 'adds and removes attributes on explicit element',
			getElement: () => el as HTMLElement,
			attributes: {
				id: null,
				class: 'bar',
			},
			expected: '<div class="bar"></div>'
		},
		{
			name: 'adds and removes attributes on queried element',
			getElement: () => '#foo',
			attributes: {
				id: null,
				class: 'bar',
			},
			expected: '<div class="bar"></div>'
		},
	])('$name', ({ getElement, attributes, expected }) => {
		expect(modifyElement(getElement(), attributes)).toContainHTML(expected)
	})

	it('does not apply inherited enumerable properties from attributes prototype', () => {
		const proto = { 'data-inherited': 'bad' }
		const attributes = Object.create(proto) as Record<string, string>
		attributes['data-own'] = 'good'
		modifyElement(el as HTMLElement, attributes)
		expect(el?.getAttribute('data-own')).toBe('good')
		expect(el?.hasAttribute('data-inherited')).toBe(false)
	})

	// prettier-ignore
	it.each([
		{
			name: 'returns undefined if element is null',
		},
	])('$name', () => {
		expect(modifyElement(undefined as unknown as HTMLElement)).toBeUndefined()
	})

	// prettier-ignore
	it.each([
		{
			name: 'throws if attribute value is not stringifiable',
			getElement: () => el as HTMLElement,
			attributes: {
				class: Symbol(),
			}
		},
	])('$name', ({ getElement, attributes }) => {
		expect(() => modifyElement(getElement(), attributes as unknown as Record<string, string>)).toThrow()
	})

	it('throws ReferenceError when string selector does not match any element', () => {
		expect(() => modifyElement('#does-not-exist', { class: 'bar' })).toThrow(ReferenceError)
		expect(() => modifyElement('#does-not-exist', { class: 'bar' })).toThrow(
			"Selector '#does-not-exist' did not match any element"
		)
	})

	it('treats null attributes as a no-op', () => {
		const before = (el as HTMLElement).outerHTML
		expect(() => modifyElement(el as HTMLElement, null)).not.toThrow()
		expect(modifyElement(el as HTMLElement, null)).toBe(el)
		expect((el as HTMLElement).outerHTML).toBe(before)
	})
})
