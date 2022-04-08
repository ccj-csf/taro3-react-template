/**
 * host拦截器 处理url拼接等
 */

export default function (chain: {
	requestParams: any
	proceed: (arg0: any) => void
}): void {
	console.log('chain-header====================== :>> ', chain)
	const requestParams = chain.requestParams
	// const { url } = requestParams
	// const { config } = header

	// requestParams.url = `${TARO_API_BASE}${url}`
	return chain.proceed(requestParams)
}
