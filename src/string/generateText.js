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
export default ({ minWords = 10, maxWords = 50, dictionary = WORDS } = {}) => {
	let result = ''
	const minAbs = Math.abs(minWords)
	const maxAbs = Math.abs(maxWords)
	const min = Math.min(minAbs, maxAbs)
	const max = Math.max(minAbs, maxAbs)
	const length = Math.ceil(Math.random() * (max - min)) + min
	for (let i = 0; i < length; i++) {
		const word = dictionary[Math.floor(Math.random() * dictionary.length)]
		result += `${i > 0 ? ' ' : ''}${word}`
	}
	return result
}
