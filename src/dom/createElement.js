export default ({
	tag = 'div',
	attributes = {},
	content = null,
	textContent = null,
	parent = null,
	parentSelector = null,
} = {}) => {
	const el = document.createElement(tag)
	for (let z in attributes) {
		el.setAttribute(z, attributes[z])
	}
	if (!!content) {
		el.appendChild(content)
	}
	if (!!textContent && !el.hasChildNodes()) {
		el.appendChild(document.createTextNode(textContent))
	}
	const parentNode = parent || document.querySelector(parentSelector)
	if (!!parentNode) {
		parentNode.appendChild(el)
	}
	return el
}
