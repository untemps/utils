import { isString } from '../isString'

describe('isString', () => {
	// prettier-ignore
	it.each([
		'abc',
		'',
		String('abc')
	])(`returns true`, (value) => {
		expect(isString(value)).toBeTruthy()
	})

	// prettier-ignore
	it.each([
		1,
		[],
		() => undefined,
		false,
		null,
		undefined
	])(`returns false`, (value) => {
		expect(isString(value)).toBeFalsy()
	})
})
