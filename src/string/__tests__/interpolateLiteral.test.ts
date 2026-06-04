import { interpolateLiteral } from '../interpolateLiteral'

describe('interpolateLiteral', () => {
	// prettier-ignore
	it.each([
		{
			name: 'interpolates value with full tokens',
			value: 'A ${foo} with fun "${bar}" and a lot of ${fun}',
			tokens: {
				foo: 'bird',
				bar: 'wings',
				fun: 'dignity',
			},
			expected: 'A bird with fun "wings" and a lot of dignity'
		}
	])('$name', ({value, tokens, expected}) => {
		expect(
			interpolateLiteral(value, tokens)
		).toBe(expected)
	})

	// prettier-ignore
	it.each([
		{ bar: null,      expected: '${bar}' },
		{ bar: undefined, expected: '${bar}' },
	])('preserves the placeholder when the token value is $bar', ({ bar, expected }) => {
		expect(interpolateLiteral('A ${foo} and ${bar}', { foo: 'bird', bar } as Record<string, unknown>)).toBe(`A bird and ${expected}`)
	})

	it('coerces non-nil token values to string (including symbols)', () => {
		expect(interpolateLiteral('A ${foo} and ${bar}', { foo: 'bird', bar: Symbol('sym') })).toBe(
			'A bird and Symbol(sym)'
		)
	})

	// prettier-ignore
	it.each([
		{
			name: 'throws if value is not a string',
			value: Symbol(),
			tokens: {
				foo: 'bird',
				bar: 'wings',
				fun: 'dignity',
			},
			error: TypeError
		},
	])('$name', ({value, tokens, error}) => {
		expect(() => interpolateLiteral(value as unknown as string, tokens as unknown as Record<string, unknown>)).toThrow(error)
	})

	it('returns the value unchanged when tokens is omitted and no token is present', () => {
		expect(interpolateLiteral('A plain string with no token')).toBe('A plain string with no token')
	})

	it('preserves the placeholder when a key is missing', () => {
		expect(
			interpolateLiteral('A ${foo} with fun "${bar}" and a lot of ${fun}', { foo: 'bird', fun: 'dignity' })
		).toBe('A bird with fun "${bar}" and a lot of dignity')
	})

	it('preserves the placeholder when tokens is omitted and a token is present', () => {
		expect(interpolateLiteral('A ${foo}')).toBe('A ${foo}')
	})

	it('preserves the placeholder for both missing keys and present nil values', () => {
		expect(interpolateLiteral('${foo} ${bar} ${baz}', { bar: null, baz: undefined })).toBe('${foo} ${bar} ${baz}')
	})
})
