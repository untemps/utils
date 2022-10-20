/**
 * @fileOverview Creates a DOM element.
 * @module dom/createElement
 */

/**
 * @function
 * @example
 * import { createElement } from '@untemps/utils/dom/createElement'
 *
 * createElement({
 *  tag: 'p',
 *  attributes: { id: 'foo', style: 'font-weight: bold' },
 *  textContent: 'Foo',
 *  parentSelector: 'body'
 * }) // <p id="foo" style="font-weight: bold">Foo</p>
 *
 * @param {object} config                                                                                                                                      - The configuration object for the new DOM element.
 * @param {string} [config.tag='div']                                                                                                                          - The tag name of the new DOM element to create. All valid HTML tags are accepted (See {@link https://www.w3schools.com/TAGS/default.asp}).
 * @param {object<string, *>} [config.attributes={}]                                                                                                           - The attributes to pass to the new DOM element. All valid attributes for the specified HTML tag are accepted.
 * @param {HTMLElement} [config.content=null]                                                                                                                  - A DOM element to append as child of the new DOM element. This property has precedence over `textContent`.
 * @param {string} [config.textContent=null]                                                                                                                   - A text to append as child of the new DOM element.
 * @param {HTMLElement} [config.parent=null]                                                                                                                   - A DOM element to which append the new DOM element. This property has precedence over `parentSelector`.
 * @param {string} [config.parentSelector=null]                                                                                                                - A selector of a DOM element to which append the new DOM element.
 * @param {{x: number, y: number, left: number, right: number, top: number, bottom: number, width: number, height: number}} [config.boundingClientRect=null]   - The values returned by the getBoundingClientRect function. Useful in jsdom environment.
 * @returns {HTMLElement}                             The new DOM element.
 */
export const createElement = ({
	tag = 'div',
	attributes = {},
	content = null,
	textContent = null,
	parent = null,
	parentSelector = null,
	boundingClientRect = null,
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
	if (!!boundingClientRect) {
		el.getBoundingClientRect = () => boundingClientRect
	}
	return el
}
