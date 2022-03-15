module.exports = (api) => ({
	presets: ['@babel/preset-env'],
	plugins: [...(api.env('test') ? ['@babel/plugin-transform-runtime'] : [])],
})
