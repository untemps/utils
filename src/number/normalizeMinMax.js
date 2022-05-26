export const normalizeMinMax = (min, max) => {
	return {
		min: Math.min(min, max),
		max: Math.max(min, max),
	}
}
