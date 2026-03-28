/**
 * @module dom/getElement
 */

/**
 * @function
 * @example
 * import { getElement } from '@untemps/utils/dom/getElement'
 *
 * const element = document.createElement('div')
 * element.id = 'my-element'
 * document.body.appendChild(element)
 *
 * getElement('#my-element') // <div id="my-element"></div>
 *
 * @param selector - The selector of the DOM element to return.
 * @returns The DOM element corresponding to the selector.
 */
export const getElement = <T extends Element = HTMLElement>(selector: string): T | null =>
	document.querySelector<T>(selector)
