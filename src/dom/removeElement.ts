/**
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
 * removeElement(element) // returns the detached <div class="foo"></div>
 * removeElement('#missing') // throws ReferenceError
 *
 * @param element  - The DOM element or the selector of the DOM element to remove.
 * @throws {ReferenceError} When `element` is a string selector that does not match any element in the document.
 * @returns The removed DOM element, or `undefined` when the input is `null`/`undefined`. An
 *          element with no parent is returned unchanged.
 */
export const removeElement = (element: HTMLElement | string): HTMLElement | undefined => {
	let el: HTMLElement | null
	if (isString(element)) {
		el = document.querySelector<HTMLElement>(element)
		if (el === null) throw new ReferenceError(`Selector '${element}' did not match any element`)
	} else {
		el = element
	}
	el?.remove()
	return el ?? undefined
}
