import { isString } from '../string/isString'

export const removeElement = (element) => {
	let el = element
	if (isString(element)) {
		el = document.querySelector(element)
	}
	return el?.parentNode?.removeChild(el)
}
