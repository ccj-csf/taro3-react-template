/**
 * 个人中心页面
 */

import React from 'react'
import { View } from '@tarojs/components'

import './index.scss'
import Router from 'tarojs-router-next'

const UserIndex = (): JSX.Element => {
	console.log('进入页面')
	console.log('object :>> ', Router.getParams())
	return (
		<View className='user-index-content'>
			分包1首页页面
		</View>
	)
}

export default UserIndex
