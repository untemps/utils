import { normalizeMinMax } from './normalizeMinMax'

export const getRandomInteger = (minValue = -Number.MAX_SAFE_INTEGER, maxValue = Number.MAX_SAFE_INTEGER) => {
	const { min, max } = normalizeMinMax(minValue, maxValue)
	return min + Math.random() * (max - min)
}
