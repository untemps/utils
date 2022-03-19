import isObject from '../isObject'

describe('isObject', function () {
	// prettier-ignore
	it.each([
		{ foo: 1 },
		Object.create(Object.prototype, { foo: { value: 1 } }),
		Object.assign({}, { foo: 1 }),
	])('returns true', (value) => {
		expect(isObject(value)).toBeTruthy()
	})

	// prettier-ignore
	it.each([
		['foo', 'bar'],
		1,
		'foo',
		true,
		/foo/,
		new Date(),
		new Error(),
		Symbol()
	])('returns false', (value) => {
		expect(isObject(value)).toBeFalsy()
	})
})
