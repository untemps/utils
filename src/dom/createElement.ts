/**
 * @module dom/createElement
 */

/**
 * Partial bounding rect used to mock getBoundingClientRect in jsdom environments.
 */
export interface BoundingClientRectInit {
	x?: number
	y?: number
	left?: number
	right?: number
	top?: number
	bottom?: number
	width?: number
	height?: number
}

/**
 * Configuration object for createElement.
 */
export interface CreateElementConfig {
	/** The tag name of the new DOM element to create. All valid HTML tags are accepted. */
	tag?: string
	/** The attributes to pass to the new DOM element. */
	attributes?: Record<string, string> | null
	/** A DOM element to append as child. Has precedence over textContent. */
	content?: HTMLElement | null
	/** A text to append as child of the new DOM element. */
	textContent?: string | null
	/** A DOM element to which append the new DOM element. Has precedence over parentSelector. */
	parent?: HTMLElement | null
	/** A selector of a DOM element to which append the new DOM element. */
	parentSelector?: string | null
	/** The values returned by getBoundingClientRect. Useful in jsdom environment. */
	boundingClientRect?: BoundingClientRectInit | null
}

/**
 * @function
 * @example
 * import { createElement } from '@untemps/utils/dom/createElement'
 *
 * createElement({
 *  tag: 'p',
 *  attributes: { id: 'foo', style: 'font-weight: bold' },
 *  textContent: 'Foo',
 *  parentSelector: 'body'
 * }) // <p id="foo" style="font-weight: bold">Foo</p>
 *
 * @param config - The configuration object for the new DOM element.
 * @returns The new DOM element.
 */
export const createElement = ({
	tag = 'div',
	attributes = {},
	content = null,
	textContent = null,
	parent = null,
	parentSelector = null,
	boundingClientRect = null,
}: CreateElementConfig = {}): HTMLElement => {
	const el = document.createElement(tag)
	if (attributes) {
		for (const [key, value] of Object.entries(attributes)) {
			el.setAttribute(key, value)
		}
	}
	if (content) {
		el.appendChild(content)
	}
	if (textContent && !el.hasChildNodes()) {
		el.appendChild(document.createTextNode(textContent))
	}
	const parentNode = parent || document.querySelector(parentSelector as string)
	if (parentNode) {
		parentNode.appendChild(el)
	}
	if (boundingClientRect) {
		el.getBoundingClientRect = () => boundingClientRect as DOMRect
	}
	return el
}
