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
 *
 * @param element  - The DOM element or the selector of the DOM element to remove.
 * @returns The removed DOM element, or `undefined` when the input is `null`/`undefined` or the
 *          selector matches nothing. An element with no parent is returned unchanged.
 */
export const removeElement = (element: HTMLElement | string): HTMLElement | undefined => {
	const el: HTMLElement | null = isString(element) ? document.querySelector<HTMLElement>(element) : element
	el?.remove()
	return el ?? undefined
}
