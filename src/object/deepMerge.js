import { isObject } from './isObject'

export const deepMerge = (source, target) => {
	for (const key of Object.keys(source)) {
		if (isObject(source[key]) && key in target) {
			Object.assign(source[key], deepMerge(source[key], target[key]))
		}
	}
	Object.assign(target || {}, source)
	return target
}
