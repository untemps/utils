import { createElement } from '../createElement'
import { getCSSDeclaration } from '../getCSSDeclaration'

describe('getCSSDeclaration', () => {
	describe('With no stylesheets', () => {
		it('Returns null', () => {
			expect(getCSSDeclaration('drag')).toBeNull()
		})
	})

	describe('With stylesheets', () => {
		beforeAll(() => {
			createElement({
				tag: 'style',
				textContent: `.drag {
        background-color: black;
      }`,
				parent: document.body,
			})

			createElement({
				attributes: {
					class: 'drag',
				},
				parent: document.body,
			})
		})

		it.each([null, undefined, '', 'drop', '.drop'])('Returns null', (className) => {
			expect(getCSSDeclaration(className as unknown as string)).toBeNull()
		})

		it.each(['drag', '.drag'])('Returns declaration', (className) => {
			expect(getCSSDeclaration(className)).toHaveLength(1)
		})

		it('Returns declaration', () => {
			expect(getCSSDeclaration('drag', true)).toBe('background-color: black;')
		})
	})

	describe('Grouped and composed selectors', () => {
		const setSheet = (selectorText: string): void => {
			const accessibleSheet = {
				cssRules: [{ selectorText, style: { cssText: 'color: red;' } }],
			} as unknown as CSSStyleSheet
			vi.spyOn(document, 'styleSheets', 'get').mockReturnValue([accessibleSheet] as unknown as StyleSheetList)
		}

		afterEach(() => {
			vi.restoreAllMocks()
		})

		it.each(['drag', '.drag', 'drop', '.drop'])('matches each name in a grouped selector (%s)', (className) => {
			setSheet('.drag, .drop')
			expect(getCSSDeclaration(className, true)).toBe('color: red;')
		})

		it('tolerates extra whitespace around the commas in a grouped selector', () => {
			setSheet('.drag  ,   .drop')
			expect(getCSSDeclaration('drop', true)).toBe('color: red;')
		})

		it('does not match a composed selector that merely contains the class', () => {
			setSheet('.drag.active')
			expect(getCSSDeclaration('drag')).toBeNull()
		})
	})

	describe('With cross-origin stylesheets', () => {
		const makeCrossOriginSheet = (): CSSStyleSheet =>
			({
				get cssRules(): CSSRuleList {
					throw new DOMException('Cannot access rules', 'SecurityError')
				},
			}) as unknown as CSSStyleSheet

		afterEach(() => {
			vi.restoreAllMocks()
		})

		it('Skips inaccessible sheets and finds the rule in an accessible one', () => {
			const accessibleSheet = {
				cssRules: [{ selectorText: '.drag', style: { cssText: 'background-color: black;' } }],
			} as unknown as CSSStyleSheet
			const merged = [makeCrossOriginSheet(), accessibleSheet] as unknown as StyleSheetList
			vi.spyOn(document, 'styleSheets', 'get').mockReturnValue(merged)
			expect(getCSSDeclaration('drag', true)).toBe('background-color: black;')
		})

		it('Returns null when only cross-origin sheets are present', () => {
			const onlyCrossOrigin = [makeCrossOriginSheet()] as unknown as StyleSheetList
			vi.spyOn(document, 'styleSheets', 'get').mockReturnValue(onlyCrossOrigin)
			expect(getCSSDeclaration('drag')).toBeNull()
		})

		it('Does not throw when iterating cross-origin sheets', () => {
			const onlyCrossOrigin = [makeCrossOriginSheet()] as unknown as StyleSheetList
			vi.spyOn(document, 'styleSheets', 'get').mockReturnValue(onlyCrossOrigin)
			expect(() => getCSSDeclaration('drag')).not.toThrow()
		})
	})
})
