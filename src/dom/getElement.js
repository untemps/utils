/**
 * @fileOverview Returns a DOM element by its selector.
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
 * @param {string} selector - The selector of the DOM element to return.
 * @returns {HTMLElement}     The DOM element corresponding to the selector.
 */
export const getElement = (selector) => {
	return document.querySelector(selector)
}
