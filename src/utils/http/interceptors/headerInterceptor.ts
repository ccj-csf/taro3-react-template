/**
 * 头部拦截器 处理请求头的配置
 */

export default function (chain: {
	requestParams: any
	proceed: (arg0: any) => void
}): void {
	console.log('header+++++++++++++++++++ :>> ', chain)
	const requestParams = chain.requestParams
	const { header } = requestParams
	header.token = 'test-token'
	requestParams.header = header

	return chain.proceed(requestParams)
}
