import createElement from '../createElement'
import removeElement from '../removeElement'

import modifyElement from '../modifyElement'

describe('modifyElement', () => {
	let el = null

	beforeEach(() => {
		el = createElement({ attributes: { id: 'foo' }, parent: document.body })
	})

	afterEach(() => {
		removeElement(el)
	})

	// prettier-ignore
	it.each([
		{
			name: 'adds attributes on explicit element',
			getElement: () => el,
			attributes: {
				class: 'bar',
				'data-foo': 'foo'
			},
			expected: '<div id="foo" class="bar" data-foo="foo"></div>'
		},
		{
			name: 'removes attributes on explicit element',
			getElement: () => el,
			attributes: {
				id: undefined
			},
			expected: '<div></div>'
		},
		{
			name: 'adds and removes attributes on explicit element',
			getElement: () => el,
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

	// prettier-ignore
	it.each([
		{
			name: 'returns undefined if element is null',
			getElement: () => null,
		},
	])('$name', ({ element }) => {
		expect(modifyElement(element)).toBeUndefined()
	})

	// prettier-ignore
	it.each([
		{
			name: 'throws if attribute value is not stringifiable',
			getElement: () => el,
			attributes: {
				class: Symbol(),
			}
		},
	])('$name', ({ getElement, attributes }) => {
		expect(() => modifyElement(getElement(), attributes)).toThrow()
	})
})
