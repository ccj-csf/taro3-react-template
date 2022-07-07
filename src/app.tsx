import * as React from 'react'
import './app.scss'
import 'windi.css'
import './guard'
import { Provider } from 'react-redux'

import configStore from './store'
const store = configStore()

const App: React.FC = props => {
	return (
		// 在入口组件不会渲染任何内容
		<Provider store={store}>
			<>{props.children}</>
		</Provider>
	)
}

export default App
