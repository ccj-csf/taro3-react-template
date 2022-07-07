const plugins = [
	'tarojs-router-next-plugin',
	'@dcasia/mini-program-tailwind-webpack-plugin/dist/taro',
]

if (process.env.TARO_ENV === 'weapp') {
	plugins.push('taro-plugin-compiler-optimization')
}

module.exports = plugins
