/**
 * @module dom/getCSSDeclaration
 */

const snapshot = (style: CSSStyleDeclaration): Record<string, string> => {
	const result: Record<string, string> = {}
	for (let i = 0; i < style.length; i++) {
		const property = style[i]
		result[property] = style.getPropertyValue(property)
	}
	return result
}

/**
 * Looks up a CSS rule by class name across `document.styleSheets` and returns a snapshot of its declared properties (or its raw `cssText` when `returnText` is `true`), or `null` when no rule matches.
 *
 * @function
 * @example
 * import { getCSSDeclaration } from '@untemps/utils/dom/getCSSDeclaration'
 *
 * const styleElement = document.createElement('style')
 * styleElement.textContent = '.drag { background-color: black; }'
 * document.head.appendChild(styleElement)
 *
 * const className = '.drag'
 * getCSSDeclaration(className) // { 'background-color': 'black' }
 * getCSSDeclaration(className, true) // 'background-color: black;'
 *
 * Matches `className` exactly against any of the comma-separated selectors of a rule (e.g.
 * `.drag, .other` resolves both `drag` and `other`). Composed selectors such as `.foo.bar`,
 * `.foo:hover`, or `body .foo` are not unwrapped — use `getComputedStyle` for those.
 *
 * The returned object is a snapshot of the matched rule's declared properties (kebab-case
 * keys, as produced by the CSS Object Model). Mutating it has no effect on the live
 * stylesheet; to update the rule itself, reach for `document.styleSheets` directly.
 *
 * @param className   - The name of the CSS declaration to return. You may ignore the starting dot.
 * @param returnText  - `true` to get the rule's `cssText` string instead of the snapshot object.
 * @returns The snapshot, the `cssText` string, or `null` if no rule matches.
 */
export const getCSSDeclaration = (className: string, returnText = false): Record<string, string> | string | null => {
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
						return returnText ? styleRule.style.cssText : snapshot(styleRule.style)
					}
				}
			}
		}
	}
	return null
}
