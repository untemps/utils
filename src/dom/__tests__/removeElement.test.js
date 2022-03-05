import createElement from '../createElement'

import removeElement from '../removeElement'

describe('removeElement', () => {
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
			name: 'removes explicit element',
			getElement: () => el,
		},
		{
			name: 'removes queried element',
			getElement: () => '#foo',
		},
	])('$name', ({ getElement }) => {
		expect(el).toBeInTheDocument()
		expect(removeElement(getElement())).not.toBeInTheDocument()
	})

	// prettier-ignore
	it.each([
		{
			name: 'returns undefined if element is null',
			element: null,
		},
		{
			name: 'returns undefined if element does not exist',
			element: document.createElement('div'),
		},
		{
			name: 'returns undefined if element selector does not match existing element',
			element: '.bar',
		},
	])('$name', ({ element }) => {
		expect(removeElement(element)).toBeUndefined()
	})
})
