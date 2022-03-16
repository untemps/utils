import generateText from './generateText'

export default ({ tokens = [], divider = '%', minWords = 10, maxWords = 50, dictionary = undefined } = {}) => {
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
