import isString from '../string/isString'

export default (element) => {
	let el = element
	if (isString(element)) {
		el = document.querySelector(element)
	}
	return el?.parentNode?.removeChild(el)
}
