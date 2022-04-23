export const interpolateLiteral = (value, tokens) => {
	const fn = new Function(...Object.keys(tokens), `return \`${value}\``)
	return fn(...Object.values(tokens))
}
