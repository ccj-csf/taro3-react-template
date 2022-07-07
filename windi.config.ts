import { defineConfig } from 'windicss/helpers'

export default defineConfig({
	prefixer: false,
	extract: {
		exclude: ['node_modules', '.git', 'dist'],
	},
	corePlugins: {
		container: false,
	},
})
