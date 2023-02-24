import { resolveClassName } from '../resolveClassName'

describe('resolveClassName', () => {
	// prettier-ignore
	it.each([
    {
      input: null,
      expected: ''
    },
    {
      input: undefined,
      expected: ''
    },
    {
      input: '',
      expected: ''
    },
    {
      input: [],
      expected: ''
    },
    {
      input: {},
      expected: ''
    },
    {
      input: Symbol(),
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
    },
    {
      input: [
        [true, "footrue", "foofalse"],
        [false, "poltrue", "polfalse"],
        "bar",
        [false, "gagtrue"],
        99,
        [true, 99],
        [true, "samtrue"],
        [false, "ziztrue", "zizfalse"]
      ],
      expected: 'footrue polfalse bar samtrue zizfalse',
    },
    {
      input: [
        'bar',
        [false, 'foo'],
      ],
      expected: 'bar',
    }
  ])('serializes class names depending on conditions and provided values', ({input, expected}) => {
    expect(resolveClassName(input)).toBe(expected)
  })
})
