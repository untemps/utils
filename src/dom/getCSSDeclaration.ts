/**
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
 * @param className            - The name of the CSS declaration to return. You may ignore the starting dot.
 * @param returnText  - `true` to get a string representation of the CSS declaration.
 * @returns The CSS declaration or null if the CSS declaration is not found.
 */
export const getCSSDeclaration = (className: string, returnText = false): CSSStyleDeclaration | string | null => {
	if (!!className) {
		className = className.startsWith('.') ? className : `.${className}`
		if (!!document.styleSheets?.length) {
			for (const sheet of document.styleSheets) {
				for (const rule of sheet.cssRules) {
					const styleRule = rule as CSSStyleRule
					if (styleRule.selectorText === className && !!styleRule.style) {
						return returnText ? styleRule.style.cssText : styleRule.style
					}
				}
			}
		}
	}
	return null
}
