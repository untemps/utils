/**
 * @module string/generateText
 */

import { getRandomInteger } from '../number/getRandomInteger'
import { normalizeMinMax } from '../number/normalizeMinMax'

/** @private */
const WORDS: string[] = [
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

/** @private */
const getMinMax = (min: number, max: number): { min: number; max: number } => {
	const { min: nMin, max: nMax } = normalizeMinMax(Math.abs(min), Math.abs(max))
	const tMin = Math.max(nMin, 1)
	const tMax = Math.max(nMax, tMin)
	return { min: tMin, max: tMax }
}

/**
 * Configuration object for generateText.
 */
export interface GenerateTextConfig {
	/** The minimum number of words to pick. */
	minWords?: number
	/** The maximum number of words to pick. */
	maxWords?: number
	/** A list of words from which picking the words. */
	dictionary?: string[]
}

/**
 * Generates a string made of a random number of words picked from a dictionary, bounded by the given minimum and maximum word counts.
 *
 * @function
 * @example
 * import { generateText } from '@untemps/utils/string/generateText'
 *
 * const minWords = 5;
 * const maxWords = 10;
 * const dictionary = ['foo', 'bar', 'gag'];
 * generateText({minWords, maxWords, dictionary}) // bar foo foo gag gag bar gag gag
 *
 * @param config - The configuration object for the text generation.
 * @returns The generated string.
 */
export const generateText = ({ minWords = 10, maxWords = 50, dictionary = WORDS }: GenerateTextConfig = {}): string => {
	if (!dictionary?.length) throw new RangeError('dictionary must not be empty')
	let result = ''
	const { min, max } = getMinMax(minWords, maxWords)
	const length = getRandomInteger(min, max)
	for (let i = 0; i < length; i++) {
		const word = dictionary[Math.floor(Math.random() * dictionary.length)]
		result += `${i > 0 ? ' ' : ''}${word}`
	}
	return result
}
