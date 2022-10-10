/**
 * @module string/generateText
 */

import { getRandomInteger } from '../number/getRandomInteger'
import { normalizeMinMax } from '../number/normalizeMinMax'

/**
 * @private
 */
const WORDS = [
	'year',
	'learn',
	'key',
	'cook',
	'crosswalk',
	'script',
	'chief',
	'plan',
	'meat',
	'vague',
	'demonstrator',
	'dictionary',
	'visible',
	'bomber',
	'variation',
	'leader',
	'channel',
	'litigation',
	'royalty',
	'impulse',
	'package',
	'oppose',
	'privilege',
	'begin',
	'operation',
	'herd',
	'hemisphere',
	'incongruous',
	'horror',
	'pipe',
	'start',
	'vertical',
	'worry',
	'reform',
	'unlike',
	'exhibition',
	'disagree',
	'allow',
	'patrol',
	'combine',
	'impress',
	'invisible',
	'cage',
	'log',
	'snow',
	'undertake',
	'division',
	'ethics',
	'damage',
	'responsible',
]

/**
 * @private
 */
const getMinMax = (min, max) => {
	const { min: nMin, max: nMax } = normalizeMinMax(Math.abs(min), Math.abs(max))
	const tMin = Math.max(nMin, 1)
	const tMax = Math.max(nMax, tMin)
	return {
		min: tMin,
		max: tMax,
	}
}

/**
 * Generates a string with a minimum and a maximum number of random words picking from a dictionary.
 *
 * @function
 * @example
 * import { generateText } from '@untemps/utils/string/generateText'
 *
 * const minWords = 5
 * const maxWords = 10
 * const dictionary = ['foo', 'bar', 'gag']
 * console.log(generateTokenizedText(minWords, maxWords, dictionary)) // 'bar foo foo gag bar foo gag bar'
 *
 * @param {number} [minWords=10] - Minimum number of words to pick.
 * @param {number} [maxWords=50] - Maximum number of words to pick.
 * @param {string[]} [dictionary=[...]] - List of words to constitute the text.
 * @returns {string}  The generated text.
 */
export const generateText = ({ minWords = 10, maxWords = 50, dictionary = WORDS } = {}) => {
	let result = ''
	const { min, max } = getMinMax(minWords, maxWords)
	const length = getRandomInteger(min, max)
	for (let i = 0; i < length; i++) {
		const word = dictionary[Math.floor(Math.random() * dictionary.length)]
		result += `${i > 0 ? ' ' : ''}${word}`
	}
	return result
}
