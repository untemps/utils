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
    }
  ])(`$name`, ({source, indices, expected}) => {
    const target = extractByIndices(source, indices)
    expect(target).toEqual(expected)
  })
})
