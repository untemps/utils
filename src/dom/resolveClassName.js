export default (input) =>
	input
		.reduce((acc, [condition, truthyValue, falsyValue]) => {
			if (condition && !!truthyValue) {
				return [...acc, truthyValue]
			} else if (!condition && !!falsyValue) {
				return [...acc, falsyValue]
			}
			return acc
		}, [])
		.join(' ')
