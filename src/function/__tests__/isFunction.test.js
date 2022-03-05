import isFunction from '../isFunction'

describe('isFunction', () => {
	// prettier-ignore
	it.each([
		() => {},
		function () {},
		Array.prototype.concat,
		async () => {},
		function* () {},
		Proxy
	])(
		'returns true',
		(value) => {
			expect(isFunction(value)).toBeTruthy()
		}
	)

	// prettier-ignore
	it.each([
		1,
		'foo',
		['foo', 'bar', 'gag'],
		{ foo: 1 },
		true,
		new Date(),
		new Error(),
		/foo/
	])(
		'returns false',
		(value) => {
			expect(isFunction(value)).toBeFalsy()
		}
	)
})
