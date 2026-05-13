/**
 * @module string/generateTokenizedText
 */

import { generateText } from './generateText'

/**
 * Configuration object for generateTokenizedText.
 */
export interface GenerateTokenizedTextConfig {
	/** The list of tokens. */
	tokens?: string[]
	/** The symbol that identifies a token. */
	divider?: string
	/** The minimum number of words to pick. */
	minWords?: number
	/** The maximum number of words to pick. */
	maxWords?: number
	/** A list of words from which picking the words. */
	dictionary?: string[]
}

/**
 * @function
 * @example
 * import { generateTokenizedText } from '@untemps/utils/string/generateTokenizedText'
 *
 * const tokens = ['pol', 'biz', 'kuy']
 * const divider = '$'
 * const minWords = 5
 * const maxWords = 10
 * const dictionary = ['foo', 'bar', 'gag']
 * generateTokenizedText({ tokens, divider, minWords, maxWords, dictionary }) // {indices: Array(3), text: "foo $pol$ $biz$ bar gag $kuy$ foo gag foo"}
 *
 * @param config - The configuration object for the text generation.
 * @returns An object containing a list of token indices and the generated string.
 */
export const generateTokenizedText = ({
	tokens = [],
	divider = '%',
	minWords = 10,
	maxWords = 50,
	dictionary = undefined,
}: GenerateTokenizedTextConfig = {}): { indices: number[]; text: string } => {
	const text = generateText({
		minWords: Math.max(minWords, tokens.length),
		maxWords: Math.max(maxWords, tokens.length),
		dictionary,
	})
	const words = text.split(' ')
	const threshold = Math.max(Math.floor((words.length - tokens.length) / tokens.length), 1)
	const indices: number[] = []
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
