import { CommonActionTypes } from '../actionTypes'
import { Dispatch } from 'redux'

export const addUser = (
	user: string | number
): { type: CommonActionTypes; payload: any } => {
	return {
		type: CommonActionTypes.ADD_USER,
		payload: user,
	}
}

// 模拟异步操作
export const deleteUser = (id: number) => {
	return (dispatch: Dispatch): Promise<{ name: string; age: number }> => {
		setTimeout(() => {
			dispatch({ type: CommonActionTypes.DELETE_USER, payload: id })
		}, 2000)
		return Promise.resolve({ name: 'test', age: 1 })
	}
}
