import interpolate from '../interpolate'

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
	])('$name', ({ value, tokens, divider, expected }) => {
		expect(interpolate(value, tokens, divider)).toBe(expected)
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
		expect(() => interpolate(value, tokens, divider)).toThrow()
	})
})
