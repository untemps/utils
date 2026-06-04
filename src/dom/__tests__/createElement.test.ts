import { createElement, CreateElementConfig } from '../createElement'

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
		const parent = values.parent || document.querySelector(values.parentSelector as string)
		expect(parent).toContainElement(createElement(values))
	})

	it('creates an empty text node when textContent is an empty string', () => {
		const el = createElement({ textContent: '' })
		expect(el.firstChild).not.toBeNull()
		expect(el.firstChild?.nodeType).toBe(Node.TEXT_NODE)
		expect(el.firstChild?.nodeValue).toBe('')
	})

	it('still prefers content over an empty-string textContent', () => {
		const child = createElement({ tag: 'span' })
		const el = createElement({ content: child, textContent: '' })
		expect(el.firstChild).toBe(child)
		expect(el.childNodes.length).toBe(1)
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
		expect(() => createElement(values as unknown as CreateElementConfig)).toThrow()
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

	it('derives missing rect fields from a partial boundingClientRect', () => {
		const rect = createElement({
			boundingClientRect: { left: 10, top: 20, width: 100, height: 50 },
		}).getBoundingClientRect()
		expect(rect).toEqual({ x: 10, y: 20, left: 10, top: 20, width: 100, height: 50, right: 110, bottom: 70 })
	})

	it('derives width and height from the bounds when not provided', () => {
		const rect = createElement({
			boundingClientRect: { left: 10, right: 100, top: 20, bottom: 70 },
		}).getBoundingClientRect()
		expect(rect).toEqual({ x: 10, y: 20, left: 10, top: 20, right: 100, bottom: 70, width: 90, height: 50 })
	})

	it('exposes a toJSON method returning the rect values', () => {
		const rect = createElement({
			boundingClientRect: { x: 5, y: 15, width: 30, height: 40 },
		}).getBoundingClientRect()
		expect(typeof rect.toJSON).toBe('function')
		expect(rect.toJSON()).toEqual({ x: 5, y: 15, left: 5, top: 15, width: 30, height: 40, right: 35, bottom: 55 })
	})

	it('defaults x and y to 0 when neither origin nor left/top are provided', () => {
		const rect = createElement({
			boundingClientRect: { right: 50, bottom: 30 },
		}).getBoundingClientRect()
		expect(rect).toEqual({ x: 0, y: 0, left: 0, top: 0, right: 50, bottom: 30, width: 50, height: 30 })
	})

	it('defaults width and height to 0 when neither size nor end bounds are provided', () => {
		const rect = createElement({
			boundingClientRect: { x: 5, y: 10 },
		}).getBoundingClientRect()
		expect(rect).toEqual({ x: 5, y: 10, left: 5, top: 10, right: 5, bottom: 10, width: 0, height: 0 })
	})
})
