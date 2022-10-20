import { createElement } from '../createElement'

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

	// prettier-ignore
	it.each([
    {
      name: 'returns new element getBoundingClientRect() default value',
      values: {},
      expected: { x: 0, y: 0, left: 0, right: 0, top: 0, bottom: 0, width: 0, height: 0 },
    },
    {
      name: 'returns new element getBoundingClientRect() specified value',
      values: { boundingClientRect: { x: 0, y: 0, left: 30, right: 70, top: 10, bottom: 20, width: 110, height: 240 } },
      expected: { x: 0, y: 0, left: 30, right: 70, top: 10, bottom: 20, width: 110, height: 240 },
    }
  ])('$name', ({ values, expected }) => {
    expect(createElement(values).getBoundingClientRect()).toEqual(expected)
  })
})
