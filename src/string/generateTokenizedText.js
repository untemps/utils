/**
 * @module string/generakenizedText
 */

import { generateText } from './generateText'

/**
 * Generates a string with custom tokens and a minimum and a maximum number of random words picking from a dictionary.
 * You may use this util to test a token replacement function for example.
 *
 * @function
 * @example
 * import { generateTokenizedText } from '@untemps/utils/string/generateTokenizedText'
 *
 * const tokens = ['pol', 'biz', 'kuy']
 * const divider = '$'
 * const minWords = 5
 * const maxWords = 10
 * const dictionary = ['foo', 'bar', 'gag']
 * console.log(generateTokenizedText(tokens, divider, minWords, maxWords, dictionary)) // 'bar foo $kuy$ foo $biz$ gag $pol$ bar'
 *
 * @param {string[]} [tokens=[]] - Minimum number of words to pick.
 * @param {string} [divider='%'] - Symbol that identifies a token.
 * @param {number} [minWords=10] - Minimum number of words to pick.
 * @param {number} [maxWords=50] - Maximum number of words to pick.
 * @param {string[]} [dictionary=[...]] - CList of words to constitute the text.
 * @returns {string}  The generated text.
 */
export const generateTokenizedText = ({
	tokens = [],
	divider = '%',
	minWords = 10,
	maxWords = 50,
	dictionary = undefined,
} = {}) => {
	const text = generateText({
		minWords: Math.max(minWords, tokens.length),
		maxWords: Math.max(maxWords, tokens.length),
		dictionary,
	})
	const words = text.split(' ')
	const threshold = Math.max(Math.floor((words.length - tokens.length) / tokens.length), 1)
	const indices = []
	for (let i = 0; i < tokens.length; i++) {
		const index = Math.floor(Math.random() * threshold) + threshold * i
		words[index] = `${divider}${tokens[i]}${divider}`
		indices.push(index)
	}
	return {
		indices,
		text: words.join(' '),
	}
}
