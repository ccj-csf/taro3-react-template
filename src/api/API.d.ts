declare namespace API {
	// 用户基本信息
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
