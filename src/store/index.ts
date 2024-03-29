import {
	createStore,
	applyMiddleware,
	compose,
	Store,
	EmptyObject,
	AnyAction,
} from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers'

const composeEnhancers =
	typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
		: compose

const middlewares = [thunkMiddleware]

if (
	process.env.NODE_ENV === 'development' &&
	process.env.TARO_ENV !== 'quickapp'
) {
	middlewares.push(require('redux-logger').createLogger())
}

const enhancer = composeEnhancers(applyMiddleware(...middlewares))

export default function configStore(): Store<EmptyObject, AnyAction> {
	const store = createStore(rootReducer, enhancer)
	return store
}
