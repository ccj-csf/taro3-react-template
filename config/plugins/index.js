const plugins = ['taro-plugin-tailwind', 'tarojs-router-next-plugin']

if (process.env.TARO_ENV === 'weapp') {
	plugins.push('taro-plugin-compiler-optimization')
}

module.exports = plugins
