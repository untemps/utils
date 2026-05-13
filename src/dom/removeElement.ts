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
 * @returns The removed DOM element.
 */
export const removeElement = (element: HTMLElement | string): HTMLElement | undefined => {
	const el: HTMLElement | null = isString(element) ? document.querySelector<HTMLElement>(element) : element
	return el?.parentNode?.removeChild(el) as HTMLElement | undefined
}
