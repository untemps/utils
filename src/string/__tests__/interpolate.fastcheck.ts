import fc from 'fast-check'

import { interpolate } from '../interpolate'

// Keys may contain regex metacharacters; only the divider '%' is excluded.
const keyChar = fc.constantFrom(...'abAB01.*+?^${}()|[]\\- _'.split(''))
const tokenKey = fc.array(keyChar, { minLength: 1, maxLength: 6 }).map((chars) => chars.join(''))
const plainValue = fc.string({ maxLength: 8 }).filter((value) => !value.includes('%'))

describe('interpolate (property-based)', () => {
	it('substitutes every known token with its string value', () => {
		fc.assert(
			fc.property(fc.dictionary(tokenKey, plainValue, { minKeys: 1, maxKeys: 5 }), (tokens) => {
				const keys = Object.keys(tokens)
				const value = keys.map((key) => `%${key}%`).join(' ')
				const result = interpolate(value, tokens)
				for (const key of keys) {
					expect(result).not.toContain(`%${key}%`)
					expect(result).toContain(String(tokens[key]))
				}
			})
		)
	})

	it('leaves unknown placeholders unchanged', () => {
		fc.assert(
			fc.property(
				tokenKey.filter((key) => key !== 'known'),
				(unknownKey) => {
					const value = `before %${unknownKey}% after`
					expect(interpolate(value, { known: 'value' })).toBe(value)
				}
			)
		)
	})
})
