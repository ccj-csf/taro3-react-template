import * as React from 'react'
import { Button } from '@antmjs/vantui'

type Props = {
	content: string
}

const BaseButton: React.FC<Props> = props => {
	const { content } = props
	return (
		<>
			<Button type='danger'>{content || 'base button'}</Button>
		</>
	)
}

export default BaseButton
