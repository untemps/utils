import { interpolate } from '../interpolate'

describe('interpolate', () => {
	// prettier-ignore
	it.each([
		{
			name: 'interpolates value with full tokens and default divider',
			value: 'A %foo% with fun "%bar%" and a lot of %fun%',
			tokens: {
                foo: 'bird',
                bar: 'wings',
                fun: 'dignity'
            },
			expected: 'A bird with fun "wings" and a lot of dignity',
		},
		{
			name: 'interpolates value with full tokens and reserved divider',
			value: 'A $foo$ with fun "$bar$" and a lot of $fun$',
			tokens: {
				foo: 'bird',
				bar: 'wings',
				fun: 'dignity'
			},
			divider: '$',
			expected: 'A bird with fun "wings" and a lot of dignity',
		},
		{
			name: 'interpolates value with partial tokens and default divider',
			value: 'A %foo% with fun "%bar%" and a lot of %fun%',
			tokens: {
				foo: 'bird',
				fun: 'dignity'
			},
			divider: '%',
			expected: 'A bird with fun "%bar%" and a lot of dignity',
		},
		{
			name: 'interpolates value with partial tokens and reserved divider',
			value: 'A $foo$ with fun "$bar$" and a lot of $fun$',
			tokens: {
				foo: 'bird',
				fun: 'dignity'
			},
			divider: '$',
			expected: 'A bird with fun "$bar$" and a lot of dignity',
		},
		{
			name: 'interpolates value with partial tokens and complex divider',
			value: 'A <%=foo<%= with fun "<%=bar<%=" and a lot of <%=fun<%=',
			tokens: {
				foo: 'bird',
				fun: 'dignity'
			},
			divider: '<%=',
			expected: 'A bird with fun "<%=bar<%=" and a lot of dignity',
		},
		{
			name: 'interpolates value with { as divider',
			value: 'A {foo{ with fun "{bar{" and a lot of {fun{',
			tokens: { foo: 'bird', bar: 'wings', fun: 'dignity' },
			divider: '{',
			expected: 'A bird with fun "wings" and a lot of dignity',
		},
		{
			name: 'interpolates value with } as divider',
			value: 'A }foo} with fun "}bar}" and a lot of }fun}',
			tokens: { foo: 'bird', bar: 'wings', fun: 'dignity' },
			divider: '}',
			expected: 'A bird with fun "wings" and a lot of dignity',
		},
		{
			name: 'interpolates value with \\ as divider',
			value: 'A \\foo\\ with fun "\\bar\\" and a lot of \\fun\\',
			tokens: { foo: 'bird', bar: 'wings', fun: 'dignity' },
			divider: '\\',
			expected: 'A bird with fun "wings" and a lot of dignity',
		},
	])('$name', ({ value, tokens, divider, expected }) => {
		expect(interpolate(value, tokens, divider)).toBe(expected)
	})

	describe('keys with regex metacharacters', () => {
		it('matches a key containing "." literally', () => {
			expect(interpolate('%a.b%', { 'a.b': 'X' })).toBe('X')
		})

		it('does not over-match a "." key against arbitrary characters', () => {
			expect(interpolate('%axb%', { 'a.b': 'X' })).toBe('%axb%')
		})

		it('does not throw and replaces a key containing "("', () => {
			expect(interpolate('%(%', { '(': 'X' })).toBe('X')
		})

		it('does not throw and replaces a key containing "["', () => {
			expect(interpolate('%[%', { '[': 'X' })).toBe('X')
		})

		it('does not throw and replaces a key containing "\\"', () => {
			expect(interpolate('%\\%', { '\\': 'X' })).toBe('X')
		})
	})

	describe('empty tokens', () => {
		it('returns value unchanged when tokens contain adjacent dividers', () => {
			expect(interpolate('100%% done', {})).toBe('100%% done')
		})

		it('returns value unchanged when tokens is omitted', () => {
			expect(interpolate('100%% done')).toBe('100%% done')
		})

		it('does not strip a lone divider when tokens is empty', () => {
			expect(interpolate('a%b%c', {})).toBe('a%b%c')
		})

		it('returns value unchanged with a non-default divider', () => {
			expect(interpolate('100$$ done', {}, '$')).toBe('100$$ done')
		})
	})

	describe('nil token values', () => {
		it('leaves the token untouched when its value is null', () => {
			expect(interpolate('%foo%', { foo: null })).toBe('%foo%')
		})

		it('leaves the token untouched when its value is undefined', () => {
			expect(interpolate('%foo%', { foo: undefined })).toBe('%foo%')
		})
	})

	// prettier-ignore
	it.each([
		{
			name: 'throws if value is not a string',
			value: Symbol(),
		},
		{
			name: 'throws if divider is not a string',
			value: '',
			divider: Symbol(),
		},
		{
			name: 'throws if tokens is null',
			value: '',
			tokens: null
		},
	])('$name', ({ value, tokens, divider }) => {
		expect(() => interpolate(value as unknown as string, tokens as unknown as Record<string, unknown>, divider as unknown as string)).toThrow()
	})
})
