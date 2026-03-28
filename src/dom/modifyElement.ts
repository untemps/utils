/**
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
 * @param element    - The DOM element or selector of the DOM element to modify.
 * @param attributes - The new attributes to set to the DOM element.
 * @returns The modified DOM element.
 */
export const modifyElement = (
	element: HTMLElement | string,
	attributes: Record<string, string | null | undefined> = {}
): HTMLElement | null => {
	const el: HTMLElement | null = isString(element) ? document.querySelector<HTMLElement>(element) : element
	for (const z in attributes) {
		if (attributes[z] === undefined || attributes[z] === null) {
			el?.removeAttribute(z)
		} else {
			el?.setAttribute(z, attributes[z] as string)
		}
	}
	return el
}
