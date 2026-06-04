import * as fc from 'fast-check'

import { extractByIndices } from '../extractByIndices'

describe('extractByIndices', () => {
	it(
		'returns values in the order specified by indices, skipping out-of-bounds entries',
		() =>
			fc.assert(
				fc.property(
					fc.nat({ max: 300 }).chain((length) => {
						return fc.tuple(
							fc.array(fc.lorem({ mode: 'words', maxCount: 1 }), {
								minLength: length,
								maxLength: length,
							}),
							fc.array(fc.integer({ min: -length - 5, max: length + 5 }), {
								minLength: length,
								maxLength: length,
							})
						)
					}),
					([source, indices]) => {
						const target = extractByIndices(source, indices)
						const expected = indices.flatMap((i) => (i >= 0 && i < source.length ? [source[i]] : []))
						expect(target).toEqual(expected)
					}
				)
			),
		30000
	)
})
