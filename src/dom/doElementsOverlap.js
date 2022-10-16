/**
 * @fileOverview Compares two DOM elements position and checks whether they overlap.
 * @module dom/doElementsOverlap
 */

/**
 * @function
 * @example
 * import { doElementsOverlap } from '@untemps/utils/dom/doElementsOverlap'
 *
 * const element1 = document.createElement('div')
 * element1.style = 'width: 140px; height: 140px; position: absolute; background-color: red;'
 * document.body.appendChild(element1)
 *
 * const element2 = document.createElement('div')
 * element2.style = 'width: 130px; height: 130px; position: absolute; background-color: green;'
 * document.body.appendChild(element2)
 *
 * const element3 = document.createElement('div')
 * element3.style = 'width: 130px; height: 130px; left: 250px; top: 250px; position: absolute; background-color: blue;'
 * document.body.appendChild(element3)
 *
 * doElementsOverlap(element1, element2) // true
 * doElementsOverlap(element1, element3) // false
 *
 * @param {HTMLElement} element1  - The first DOM element to compare.
 * @param {HTMLElement} element2  - The second DOM element to compare.
 * @returns {boolean}             `true` if the two DOM elements overlap.
 */
export const doElementsOverlap = (element1, element2) => {
	const { left: left1, right: right1, top: top1, bottom: bottom1 } = element1.getBoundingClientRect()
	const { left: left2, right: right2, top: top2, bottom: bottom2 } = element2.getBoundingClientRect()

	return !(top1 > bottom2 || right1 < left2 || bottom1 < top2 || left1 > right2)
}
