/**
 * 个人中心页面
 */

import React from 'react'
import { View } from '@tarojs/components'
import { useApp, useRouter } from 'taro-hooks'

import './index.scss'

const UserIndex = (): JSX.Element => {
	const [appInstance, globalData] = useApp(true)
	const { } = useRouter()
	console.log('appInstance :>> ', appInstance)
	console.log('globalData :>> ', globalData)
	return (
		<View className='user-index-content'>
			I&apos;m Lexmin, a FrontEnd Engineer.
		</View>
	)
}

export default UserIndex
