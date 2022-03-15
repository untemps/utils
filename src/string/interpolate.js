const escapeDivider = (divider) => {
	const regex = new RegExp('([\\[\\^\\$\\.|\\?\\*\\+\\(\\)])+', 'g')
	return divider.replace(regex, (match) =>
		match
			.split('')
			.map((i) => '\\' + i)
			.join('')
	)
}

const pipeTokens = (tokens) => {
	const tokenKeys = Object.keys(tokens)
	return tokenKeys.reduce((acc, key, i) => `${acc}${i > 0 ? '|' : ''}${key}`, '')
}

export default (value, tokens = {}, divider = '%') => {
	const escapedDivider = escapeDivider(divider)
	const pipedTokens = pipeTokens(tokens)
	const regex = new RegExp(`${escapedDivider}(${pipedTokens})${escapedDivider}`, 'g')
	return value.replace(regex, (_, r) => (!!tokens[r] ? tokens[r] : r))
}
