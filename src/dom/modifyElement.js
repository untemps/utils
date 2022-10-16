/**
 * @fileOverview Modifies a DOM element.
 * @module dom/modifyElement
 */

import { isString } from '../string/isString'

/**
 * @function
 * @example
 * import { modifyElement } from '@untemps/utils/dom/modifyElement'
 *
 * const element = document.createElement('div')
 * element.className = 'foo'
 * document.body.appendChild(element)
 *
 * modifyElement(element, { className: 'bar' }) // <div class="bar"></div>
 *
 * @param {HTMLElement} element                - The DOM element to modify.
 * @param {object<string, *>} [attributes={}]  - The new attributes to set to the DOM element.
 * @returns {HTMLElement}                      The modified DOM element.
 */
export const modifyElement = (element, attributes = {}) => {
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
