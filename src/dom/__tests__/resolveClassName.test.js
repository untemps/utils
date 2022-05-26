import { resolveClassName } from '../resolveClassName'

describe('resolveClassName', () => {
	// prettier-ignore
	it.each([
        {
            input: [[]],
            expected: ''
        },
        {
            input: [[true, null]],
            expected: ''
        },
        {
            input: [[true]],
            expected: ''
        },
        {
            input: [[true, 'foo']],
            expected: 'foo'
        },
        {
            input: [[true, 'foo', 'bar']],
            expected: 'foo'
        },
        {
            input: [[false, 'foo']],
            expected: ''
        },
        {
            input: [[false, 'foo', 'bar']],
            expected: 'bar'
        },
        {
            input: [
                [false, 'foo', 'bar'],
                [true, 'foo', 'bar']
            ],
            expected: 'bar foo'
        },
        {
            input: [
                [true, 'foo', 'bar'],
                [false, 'foo', 'bar'],
            ],
            expected: 'foo bar',
        },
        {
            input: [
                [false, 'foo'],
                [true, 'foo', 'bar'],
            ],
            expected: 'foo',
        },
        {
            input: [
                [true, 'foo', 'bar'],
                [false, 'foo'],
            ],
            expected: 'foo',
        },
        {
            input: [
                [true, 'foo', 'bar'],
                [false, 'foo'],
                [true, 'foo'],
                [false, 'foo', 'bar'],
            ],
            expected: 'foo foo bar',
        },
        {
            input: [
                [false, 'foo', 'bar'],
                [true, 'foo'],
                [false, 'foo'],
                [true, 'foo', 'bar'],
            ],
            expected: 'bar foo foo',
        },
        {
            input: [
                [true, 'foo'],
                [false, 'foo', 'bar'],
                [true, 'foo', 'bar'],
                [false, 'foo'],
            ],
            expected: 'foo bar foo',
        },
        {
            input: [
                [false, 'foo'],
                [true, 'foo', 'bar'],
                [false, 'foo', 'bar'],
                [true, 'foo'],
            ],
            expected: 'foo bar foo',
        }
    ])('serializes class names depending on conditions and provided values', ({input, expected}) => {
        expect(resolveClassName(input)).toBe(expected)
    })

	// prettier-ignore
	it.each([
		{
			name: 'throws if input is null',
			input: null,
		},
		{
			name: 'throws if input is undefined',
			input: undefined,
		},
		{
			name: 'throws if input is not an array',
			input: {},
		},
		{
			name: 'throws if input is not stringifiable',
			input: Symbol(),
		},
		{
			name: 'throws if input contains null values',
			input: [null],
		},
		{
			name: 'throws if input contains undefined values',
			input: [undefined],
		},
		{
			name: 'throws if input does contain arrays',
			input: [{}],
		},
		{
			name: 'throws if input does contain stringifiable values',
			input: [Symbol()],
		},
		{
			name: 'throws if input does contain stringifiable values',
			input: [true, 'foo'],
		},
	])('$name', ({ input }) => {
		expect(() => resolveClassName(input)).toThrow()
	})
})
