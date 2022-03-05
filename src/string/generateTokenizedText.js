import generateText from './generateText'

const DEFAULT_TOKEN = '%token%'
export default ({ token = DEFAULT_TOKEN, minWords = 10, maxWords = 50, dictionary = undefined } = {}) => {
	const text = generateText({ minWords, maxWords, dictionary })
	let hasToken = false
	const result = text.split(' ').map((word) => {
		const r = Math.random() < 0.1
		hasToken = !hasToken && r
		return r ? token : word
	})
	if (!hasToken) {
		result[Math.floor(Math.random() * result.length)] = token
	}
	return result.join(' ')
}
