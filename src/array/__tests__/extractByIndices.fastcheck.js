import * as fc from 'fast-check'

import { extractByIndices } from '../extractByIndices'

describe('extractByIndices', () => {
	it('returns text length higher than minWords', () =>
		fc.assert(
			fc.property(
				fc.nat({ max: 300 }).chain((length) => {
					return fc.tuple(
						fc.array(fc.lorem({ mode: 'words', maxCount: 1 }), { minLength: length, maxLength: length }),
						fc.array(fc.nat({ max: Math.max(length - 1, 0) }), { minLength: length, maxLength: length })
					)
				}),
				([source, indices]) => {
					const target = extractByIndices(source, indices)
					indices.forEach((index) => {
						expect(target).toContain(source[index])
					})
					expect(target.length).toBeLessThanOrEqual(indices.length)
				}
			)
		))
})
