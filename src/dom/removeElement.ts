/**
 * @module dom/removeElement
 */

import { isString } from '../string/isString'

/**
 * Removes a DOM element from the document, referenced directly or by selector, and returns it.
 *
 * @function
 * @example
 * import { removeElement } from '@untemps/utils/dom/removeElement'
 *
 * const element = document.createElement('div')
 * element.className = 'foo'
 * document.body.appendChild(element)
 *
 * removeElement(element) // returns the detached <div class="foo"></div>
 * removeElement('#missing') // throws ReferenceError
 * removeElement(null)       // throws TypeError
 *
 * @param element  - The DOM element or the selector of the DOM element to remove.
 * @throws {TypeError} When `element` is `null` or `undefined`.
 * @throws {ReferenceError} When `element` is a string selector that does not match any element in the document.
 * @returns The removed DOM element. An element with no parent is returned unchanged.
 */
export const removeElement = (element: HTMLElement | string): HTMLElement => {
	if (element == null) throw new TypeError('element must be a non-null HTMLElement or a string selector')
	let el: HTMLElement
	if (isString(element)) {
		const queried = document.querySelector<HTMLElement>(element)
		if (queried === null) throw new ReferenceError(`Selector '${element}' did not match any element`)
		el = queried
	} else {
		el = element
	}
	el.remove()
	return el
}
