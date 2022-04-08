const tabbarConfig = {
	// custom: true,
	selectedColor: '#1296db',
	list: [
		{
			pagePath: 'pages/index/index',
			text: '首页',
			iconPath: 'assets/images/tabbar-home.png',
			selectedIconPath: 'assets/images/tabbar-home-selected.png',
		},
		{
			pagePath: 'pages/user/index',
			text: '我的',
			iconPath: 'assets/images/tabbar-my.png',
			selectedIconPath: 'assets/images/tabbar-my-selected.png',
		},
	],
}

module.exports = tabbarConfig
