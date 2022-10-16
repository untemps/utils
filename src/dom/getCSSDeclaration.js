/**
 * @fileOverview Returns a CSS declaration by its name.
 * @module dom/getCSSDeclaration
 */

/**
 * @function
 * @example
 * import { getCSSDeclaration } from '@untemps/utils/dom/getCSSDeclaration'
 *
 * const styleElement = document.createElement('style')
 * styleElement.textContent = '.drag { background-color: black; }'
 * document.head.appendChild(styleElement)
 *
 * const className = '.drag'
 * const returnText = true
 * getCSSDeclaration(className, returnText) // background-color: black;
 *
 * @param {string} className            - The name of the CSS declaration to return. You may ignore the starting dot.
 * @param {boolean} [returnText=false]  - `true` to get a string representation of the CSS declaration.
 * @returns {CSSStyleDeclaration|null}  The CSS declaration or null if the CSS declaration is not found.
 */
export const getCSSDeclaration = (className, returnText = false) => {
	if (!!className) {
		className = className.startsWith('.') ? className : `.${className}`

		if (!!document.styleSheets?.length) {
			for (let { cssRules } of document.styleSheets) {
				for (let { selectorText, style } of cssRules) {
					if (selectorText === className && !!style) {
						return returnText ? style.cssText : style
					}
				}
			}
		}
	}

	return null
}
