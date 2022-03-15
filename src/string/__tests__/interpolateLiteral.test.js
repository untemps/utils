import interpolateLiteral from '../interpolateLiteral'

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
		{
			name: 'throws if value is not stringifiable',
			value: Symbol(),
			tokens: {
				foo: 'bird',
				bar: 'wings',
				fun: 'dignity',
			},
			error: 'Cannot convert a Symbol value to a string'
		},
		{
			name: 'throws if one of tokens is not stringifiable',
			value: 'A ${foo} with fun "${bar}" and a lot of ${fun}',
			tokens: {
				foo: 'bird',
				bar: Symbol(),
				fun: 'dignity',
			},
			error: 'Cannot convert a Symbol value to a string'
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
		expect(() => interpolateLiteral(value, tokens)).toThrow(new Error(error))
	})
})
