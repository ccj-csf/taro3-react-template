import { CommonActionTypes } from '@/store/action-types'
import { AnyAction } from 'redux'
type InitialStateType = {
	num: number
}
const initialState: InitialStateType = {
	num: 0,
}

export default (state = initialState, action: AnyAction): InitialStateType => {
	const { type } = action
	switch (type) {
		case CommonActionTypes.ADD_USER:
			return {
				...state,
				num: state.num + 1,
			}
		case CommonActionTypes.DELETE_USER:
			return {
				...state,
				num: state.num - 1,
			}
		case CommonActionTypes.MODIFY_USER:
			return {
				...state,
			}
		default:
			return state
	}
}
