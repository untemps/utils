import createElement from '../createElement'

import isElement from '../isElement'

describe('isElement', () => {
	// prettier-ignore
	it.each([
        createElement()
    ])('returns true', (value) => {
        expect(value).toBeTruthy()
    })

	// prettier-ignore
	it.each([
        1,
        [],
        () => null,
        false,
        null,
        undefined,
        Symbol()
    ])('returns false', (value) => {
        expect(isElement(value)).toBeFalsy()
    })
})
