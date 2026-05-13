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
		},
		{
			name: 'interpolates token with null value as "null"',
			value: 'A ${foo} and ${bar}',
			tokens: {
				foo: 'bird',
				bar: null,
			},
			expected: 'A bird and null'
		},
		{
			name: 'interpolates token with undefined value as "undefined"',
			value: 'A ${foo} and ${bar}',
			tokens: {
				foo: 'bird',
				bar: undefined,
			},
			expected: 'A bird and undefined'
		},
		{
			name: 'interpolates token with Symbol value as its string representation',
			value: 'A ${foo} and ${bar}',
			tokens: {
				foo: 'bird',
				bar: Symbol('sym'),
			},
			expected: 'A bird and Symbol(sym)'
		}
	])('$name', ({value, tokens, expected}) => {
		expect(
			interpolateLiteral(value, tokens as Record<string, unknown>)
		).toBe(expected)
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
			error: 'value.replace is not a function'
		},
		{
			name: 'throws if one token is missing',
			value: 'A ${foo} with fun "${bar}" and a lot of ${fun}',
			tokens: {
				foo: 'bird',
				fun: 'dignity',
			},
			error: 'bar is not defined'
		}
	])('$name', ({value, tokens, error}) => {
		expect(() => interpolateLiteral(value as unknown as string, tokens as unknown as Record<string, unknown>)).toThrow(error)
	})
})
