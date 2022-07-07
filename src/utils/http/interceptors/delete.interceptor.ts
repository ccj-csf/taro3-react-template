/**
 * @description 删除自定义请求头拦截器
 */

export default function (chain: {
	requestParams: any
	proceed: (arg0: any) => void
}): void {
	const requestParams = chain.requestParams

	const { header } = requestParams
	const { config } = header

	// 删除自定义请求头参数
	if (config) {
		delete header.config
		requestParams.header = header
	}

	return chain.proceed(requestParams)
}
