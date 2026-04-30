import { clamp } from '../clamp'

describe('clamp', () => {
	// prettier-ignore
	it.each([
		{ name: 'returns value when within range',          value: 5,   min: 0,  max: 10, expected: 5  },
		{ name: 'returns min when value is below min',      value: -3,  min: 0,  max: 10, expected: 0  },
		{ name: 'returns max when value is above max',      value: 15,  min: 0,  max: 10, expected: 10 },
		{ name: 'returns min when value equals min',        value: 0,   min: 0,  max: 10, expected: 0  },
		{ name: 'returns max when value equals max',        value: 10,  min: 0,  max: 10, expected: 10 },
		{ name: 'returns value when min equals max',        value: 7,   min: 5,  max: 5,  expected: 5  },
		{ name: 'normalizes reversed min and max',          value: 5,   min: 10, max: 0,  expected: 5  },
		{ name: 'clamps below with reversed min and max',   value: -1,  min: 10, max: 0,  expected: 0  },
		{ name: 'clamps above with reversed min and max',   value: 15,  min: 10, max: 0,  expected: 10 },
		{ name: 'handles negative range',                   value: -5,  min: -10, max: -1, expected: -5 },
		{ name: 'clamps below in negative range',           value: -15, min: -10, max: -1, expected: -10 },
		{ name: 'clamps above in negative range',           value: 0,   min: -10, max: -1, expected: -1 },
	])('$name', ({ value, min, max, expected }) => {
		expect(clamp(value, min, max)).toBe(expected)
	})
})
