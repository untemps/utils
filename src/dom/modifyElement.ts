/**
 * @module dom/modifyElement
 */

import { isString } from '../string/isString'

/**
 * Sets attributes on a DOM element referenced directly or by selector. An attribute whose value is `null` or `undefined` is removed instead of being set.
 *
 * @function
 * @example
 * import { modifyElement } from '@untemps/utils/dom/modifyElement'
 *
 * const element = document.createElement('div')
 * element.className = 'foo'
 * document.body.appendChild(element)
 *
 * modifyElement(element, { className: 'bar' }) // <div class="bar"></div>
 * modifyElement('#missing', { className: 'bar' }) // throws ReferenceError
 * modifyElement(null, { className: 'bar' })       // throws TypeError
 *
 * @param element    - The DOM element or selector of the DOM element to modify.
 * @param attributes - The new attributes to set to the DOM element. `null` is treated as a no-op,
 *                     mirroring the lenient behaviour of `createElement`.
 * @throws {TypeError} When `element` is `null` or `undefined`.
 * @throws {ReferenceError} When `element` is a string selector that does not match any element in the document.
 * @returns The modified DOM element.
 */
export const modifyElement = (
	element: HTMLElement | string,
	attributes: Record<string, string | null | undefined> | null = {}
): HTMLElement => {
	if (element == null) throw new TypeError('element must be a non-null HTMLElement or a string selector')
	let el: HTMLElement | null
	if (isString(element)) {
		el = document.querySelector<HTMLElement>(element)
		if (el === null) throw new ReferenceError(`Selector '${element}' did not match any element`)
	} else {
		el = element
	}
	if (attributes) {
		for (const [key, value] of Object.entries(attributes)) {
			if (value === undefined || value === null) {
				el.removeAttribute(key)
			} else {
				el.setAttribute(key, value)
			}
		}
	}
	return el
}
