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
 * Matches `className` exactly against any of the comma-separated selectors of a rule (e.g.
 * `.drag, .other` resolves both `drag` and `other`). Composed selectors such as `.foo.bar`,
 * `.foo:hover`, or `body .foo` are not unwrapped — use `getComputedStyle` for those.
 *
 * @param className            - The name of the CSS declaration to return. You may ignore the starting dot.
 * @param returnText  - `true` to get a string representation of the CSS declaration.
 * @returns The CSS declaration or null if the CSS declaration is not found.
 */
export const getCSSDeclaration = (className: string, returnText = false): CSSStyleDeclaration | string | null => {
	if (className) {
		className = className.startsWith('.') ? className : `.${className}`
		if (document.styleSheets?.length) {
			for (const sheet of document.styleSheets) {
				let rules: CSSRuleList
				try {
					rules = sheet.cssRules
				} catch {
					// Cross-origin stylesheets throw SecurityError on cssRules access
					continue
				}
				for (const rule of rules) {
					const styleRule = rule as CSSStyleRule
					const selectors = styleRule.selectorText?.split(',').map((s) => s.trim())
					if (selectors?.includes(className) && styleRule.style) {
						return returnText ? styleRule.style.cssText : styleRule.style
					}
				}
			}
		}
	}
	return null
}
