import * as React from 'react'
import { Button } from '@antmjs/vantui'
import { View } from '@tarojs/components'
import Counter from './components/Counter'
const Index: React.FC = () => {
	return (
		<>
			<Button type='primary' block>
				默认按钮
			</Button>
			<Counter />
			<View className='bg-blue-500 mt-160px'>444</View>
		</>
	)
}

export default Index
