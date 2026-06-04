import { extractByIndices } from '../extractByIndices'

describe('extractByIndices', () => {
	// prettier-ignore
	it.each([
    {
      name: 'returns empty array if inputs are undefined',
      source: undefined,
      indices: undefined,
      expected: []
    },
    {
      name: 'returns empty array if indices is undefined',
      source: ['foo', 'bar'],
      indices: undefined,
      expected: []
    },
    {
      name: 'returns empty array if source is undefined',
      source: undefined,
      indices: [0],
      expected: []
    },
    {
      name: 'returns empty array if indices are over source length',
      source: ['foo', 'bar'],
      indices: [8],
      expected: []
    },
    {
      name: 'returns empty array if indices are invalid',
      source: ['foo', 'bar'],
      indices: [-1],
      expected: []
    },
    {
      name: 'extracts source values by their indices',
      source: ['foo', 'bar', 'gag', 'pol', 'zux'],
      indices: [1, 3],
      expected: ['bar', 'pol'],
    },
    {
      name: 'returns values in the order specified by indices',
      source: ['foo', 'bar', 'gag', 'pol', 'zux'],
      indices: [3, 1],
      expected: ['pol', 'bar'],
    },
    {
      name: 'preserves duplicates in indices',
      source: ['foo', 'bar', 'gag', 'pol', 'zux'],
      indices: [1, 1, 0],
      expected: ['bar', 'bar', 'foo'],
    },
    {
      name: 'skips invalid indices while keeping the requested order',
      source: ['foo', 'bar', 'gag', 'pol', 'zux'],
      indices: [3, -1, 1, 99],
      expected: ['pol', 'bar'],
    },
    {
      name: 'skips non-integer indices',
      source: ['foo', 'bar', 'gag', 'pol', 'zux'],
      indices: [0, 1.5, 2],
      expected: ['foo', 'gag'],
    }
  ])(`$name`, ({source, indices, expected}) => {
    const target = extractByIndices(source, indices)
    expect(target).toEqual(expected)
  })
})
