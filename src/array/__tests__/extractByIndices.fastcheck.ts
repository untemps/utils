import * as fc from 'fast-check'

import { extractByIndices } from '../extractByIndices'

describe('extractByIndices', () => {
	it(
		'returns only the values located at the given indices',
		() =>
			fc.assert(
				fc.property(
					fc.nat({ max: 300 }).chain((length) => {
						return fc.tuple(
							fc.array(fc.lorem({ mode: 'words', maxCount: 1 }), {
								minLength: length,
								maxLength: length,
							}),
							fc.array(fc.nat({ max: Math.max(length - 1, 0) }), { minLength: length, maxLength: length })
						)
					}),
					([source, indices]) => {
						const target = extractByIndices(source, indices)
						const indexSet = new Set(indices)
						expect(target).toEqual(source.filter((_, index) => indexSet.has(index)))
					}
				)
			),
		30000
	)
})
