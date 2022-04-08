import React from 'react'
import 'windi.css'
import './app.scss'
import './guard'
import { Provider } from 'react-redux'

import configStore from './store'
const store = configStore()

type AppProps = React.PropsWithChildren<Record<string, unknown>>

const App: React.FC<AppProps> = props => {
	return (
		// 在入口组件不会渲染任何内容
		<Provider store={store}>
			{props.children}
		</Provider>
	)
}

export default App
