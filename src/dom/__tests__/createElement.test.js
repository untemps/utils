import createElement from '../createElement'

describe('createElement', () => {
	// prettier-ignore
	it.each([
		{
			name: 'creates element with default tag',
			values: undefined,
			expected: '<div></div>',
		},
		{
			name: 'creates element with custom tag',
			values: { tag: 'p' },
			expected: '<p></p>',
		},
		{
			name: 'creates element with attributes',
			values: { attributes: { id: 'foo', 'aria-label': 'bar' } },
			expected: '<div id="foo" aria-label="bar"></div>',
		},
		{
			name: 'creates element with no attributes',
			values: { attributes: null },
			expected: '<div></div>',
		},
		{
			name: 'creates element with content',
			values: { content: createElement({ tag: 'span' }) },
			expected: '<div><span></span></div>',
		},
		{
			name: 'creates element with text content',
			values: { textContent: 'Foo' },
			expected: '<div>Foo</div>',
		},
		{
			name: 'creates element with content over text content',
			values: { content: createElement({ tag: 'span' }), textContent: 'Foo' },
			expected: '<div><span></span></div>',
		},
	])('$name', ({ values, expected }) => {
		expect(createElement(values)).toContainHTML(expected)
	})
	
	// prettier-ignore
	it.each([
		{
			name: 'creates element in explicit parent',
			values: { parent: document.body },
		},
		{
			name: 'creates element in queried parent',
			values: { parentSelector: 'body' },
		},
	])('$name', ({ values }) => {
		const parent = values.parent || document.querySelector(values.parentSelector)
		expect(parent).toContainElement(createElement(values))
	})

	// prettier-ignore
	it.each([
		{
			name: 'throws if values is null',
			values: null,
		},
		{
			name: 'throws if content is not appendable',
			values: { content: {} },
		},
		{
			name: 'throws if text content is not stringifiable',
			values: { textContent: Symbol() },
		},
		{
			name: 'throws if parent element is not valid',
			values: { parent: {} },
		},
		{
			name: 'throws if parent selector is not valid',
			values: { parentSelector: {} },
		},
	])('$name', ({ values }) => {
		expect(() => createElement(values)).toThrow()
	})
})
