import normalizeMinMax from '../number/normalizeMinMax'
import getRandomInteger from '../number/getRandomInteger'

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

const getMinMax = (min, max) => {
	const { min: nMin, max: nMax } = normalizeMinMax(Math.abs(min), Math.abs(max))
	const tMin = Math.max(nMin, 1)
	const tMax = Math.max(nMax, tMin)
	return {
		min: tMin,
		max: tMax,
	}
}

export default ({ minWords = 10, maxWords = 50, dictionary = WORDS } = {}) => {
	let result = ''
	const { min, max } = getMinMax(minWords, maxWords)
	const length = getRandomInteger(min, max)
	for (let i = 0; i < length; i++) {
		const word = dictionary[Math.floor(Math.random() * dictionary.length)]
		result += `${i > 0 ? ' ' : ''}${word}`
	}
	return result
}
