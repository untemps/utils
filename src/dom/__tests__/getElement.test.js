import getElement from '../getElement'
import createElement from '../createElement'

describe('getElement', () => {
	// prettier-ignore
	it.each([
		{
			name: 'gets element by its id',
			selector: '#foo',
			expected: createElement({ attributes: { id: 'foo' }, parent: document.body }),
		},
		{
			name: 'gets null if no element is founded',
			selector: '.bar',
			expected: null,
		},
	])('$name', ({ selector, expected }) => {
		expect(getElement(selector)).toBe(expected)
	})

	// prettier-ignore
	it.each([
		{
			name: 'throws if selector is invalid',
			selector: '$gag',
		},
	])('$name', ({ selector }) => {
		expect(() => getElement(selector)).toThrow()
	})
})
