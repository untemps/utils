/**
 * @fileOverview Removes a DOM element.
 * @module dom/removeElement
 */

import { isString } from '../string/isString'

/**
 * @function
 * @example
 * import { removeElement } from '@untemps/utils/dom/removeElement'
 *
 * const element = document.createElement('div')
 * element.className = 'foo'
 * document.body.appendChild(element)
 *
 * removeElement(element) // <div class="foo"></div>
 *
 * @param {HTMLElement|string} element  - The DOM element or the selector of the DOM element to remove.
 * @returns {HTMLElement}               The removed DOM element.
 */
export const removeElement = (element) => {
	let el = element
	if (isString(element)) {
		el = document.querySelector(element)
	}
	return el?.parentNode?.removeChild(el)
}
