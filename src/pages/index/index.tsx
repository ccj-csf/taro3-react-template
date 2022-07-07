import * as React from 'react'
import demoApi from '@/api/demo'
import { Button } from '@antmjs/vantui'

const Index: React.FC = () => {
	React.useEffect(() => {
		demoApi
			.getUserInfo()
			.then(res => {
				console.log('res :>> ', res)
			})
			.catch(err => {
				console.log('err :>> ', err)
			})
	}, [])
	return (
		<>
			<Button type='primary' block>
				默认按钮
			</Button>
		</>
	)
}

export default Index
