import rootReducer from '@/store/reducers'
declare namespace REDUX {
	export type RootState = ReturnType<typeof rootReducer>
	export type CurrentUser = {
		avatar?: string
		name?: string
		title?: string
		group?: string
		signature?: string
		tags?: {
			key: string
			label: string
		}[]
		userid?: string
		roles?: 'user' | 'guest' | 'admin'
	}
}
