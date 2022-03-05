import isString from '../string/isString'

export default (element, attributes = {}) => {
	let el = element
	if (isString(element)) {
		el = document.querySelector(element)
	}
	for (let z in attributes) {
		if (attributes[z] === undefined || attributes[z] === null) {
			el?.removeAttribute(z)
		} else {
			el?.setAttribute(z, attributes[z])
		}
	}
	return el
}
