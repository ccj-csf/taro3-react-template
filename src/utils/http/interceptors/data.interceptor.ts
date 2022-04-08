/**
 * data拦截器 处理数据格式 接口错误等
 */

import Toast from '@/utils/toast'

export default function (chain: {
	requestParams: any
	proceed: (arg0: any) => Promise<any>
}): Promise<any> {
	console.log('chain+++++++++++++++++++++++++++', chain)
	const requestParams = chain.requestParams
	const { showToast } = requestParams?.header?.config
	return chain
		.proceed(requestParams)
		.then(res => {
			console.log('请求成功------------- :>> ', res)
			if (showToast) {
				switch (res.statusCode) {
					case 404:
						Toast.info('url不存在')
						break

					default:
						break
				}
			}
			return Promise.resolve(res)
		})
		.catch(err => {
			// Taro.hideLoading()
			console.log('请求失败------------- :>> ', err)
			Toast.info('服务器异常，稍后重试')
			return Promise.reject(err)
		})
}
