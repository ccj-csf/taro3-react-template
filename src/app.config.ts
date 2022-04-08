const tabbarConfig = require('./config/tabbar.config')
import { useGlobalIconFont } from './assets/icons/helper'
export default defineAppConfig({
	entryPagePath: 'pages/index/index',
	pages: ['pages/index/index', 'pages/user/index'],
	subpackages: [
		{
			root: 'pages/subpackages/packageA',
			name: 'packageA',
			pagesPath: 'pages/subpackages/packageA/pages',
			pages: ['pages/index/index'],
		},
		{
			root: 'pages/subpackages/packageB',
			name: 'packageB',
			pagesPath: 'pages/subpackages/packageB/pages',
			pages: ['pages/index/index'],
		},
	],
	tabBar: tabbarConfig,
	usingComponents: Object.assign(useGlobalIconFont()),
	window: {
		// navigationStyle: 'custom',
		navigationBarBackgroundColor: '#fff',
		navigationBarTextStyle: 'black',
	},
	// 页面切换动画
	animation: {
		duration: 196, // 动画切换时间，单位毫秒
		delay: 50, // 切换延迟时间，单位毫秒
	},
})
