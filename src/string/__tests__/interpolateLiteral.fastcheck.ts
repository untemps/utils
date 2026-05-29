import fc from 'fast-check'

import { interpolateLiteral } from '../interpolateLiteral'

const identifier = fc.string({ minLength: 1, maxLength: 6 }).filter((key) => /^\w+$/.test(key))
const plainValue = fc.string({ maxLength: 8 }).filter((value) => !value.includes('$'))

describe('interpolateLiteral (property-based)', () => {
	it('replaces every provided token placeholder', () => {
		fc.assert(
			fc.property(fc.dictionary(identifier, plainValue, { minKeys: 1, maxKeys: 5 }), (tokens) => {
				const keys = Object.keys(tokens)
				const value = keys.map((key) => `\${${key}}`).join(' ')
				const result = interpolateLiteral(value, tokens)
				for (const key of keys) {
					expect(result).not.toContain(`\${${key}}`)
					expect(result).toContain(String(tokens[key]))
				}
			})
		)
	})

	it('throws a ReferenceError for a placeholder whose key is absent', () => {
		fc.assert(
			fc.property(identifier, (key) => {
				expect(() => interpolateLiteral(`\${${key}}`, {})).toThrow(ReferenceError)
			})
		)
	})
})
