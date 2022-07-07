import Taro from '@tarojs/taro'
import { CodeStatus } from '@/constants'
import urlInterceptor from '@/utils/http/interceptors/urlInterceptor'
import headerInterceptor from '@/utils/http/interceptors/headerInterceptor'
import paramInterceptor from '@/utils/http/interceptors/paramInterceptor'
import dataInterceptor from '@/utils/http/interceptors/dataInterceptor'
import deleteInterceptor from '@/utils/http/interceptors/deleteInterceptor'

/**
 * @description 拦截器
 */

const Interceptors = [
	urlInterceptor,
	headerInterceptor,
	paramInterceptor,
	dataInterceptor,
	deleteInterceptor,
	Taro.interceptors.logInterceptor,
	Taro.interceptors.timeoutInterceptor,
]

/**
 * @description 添加拦截器
 */
Interceptors.forEach(interceptorItem => Taro.addInterceptor(interceptorItem))

type RequestConfig = {
	url: string
	data?: any
	method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'UPLOAD'
	[key: string]: any
}

type Options = {
	url: string
	data?: any
	baseUrl?: string
	showToast?: boolean
	header?: any
	timeout?: number
}

/**
 * @description 请求基类
 */
class Request {
	async request({
		url,
		data,
		method,
		timeout = 15 * 1000,
		header = {
			'Content-Type': 'application/json',
		},
		showToast = true,
		baseUrl = TARO_API_BASE,
		dataType = 'json',
		responseType = 'text',
		jsonp = false,
	}: RequestConfig): Promise<any> {
		// 添加自定义请求头，用于配置处理
		header.config = {}
		header.config.baseUrl = baseUrl
		header.config.showToast = showToast

		// UPLOAD方法特殊处理
		if (method === 'UPLOAD') {
			return new Promise((resolve, reject) => {
				return Taro.uploadFile({
					url: `${baseUrl}${url}`,
					filePath: data,
					name: 'file',
					success(res) {
						const resultData = res.data
						const result = JSON.parse(resultData)
						if (CodeStatus.SUCCESS_LIST.includes(result.code)) {
							resolve(result)
						} else {
							Taro.showToast({
								title: result.msg,
								icon: 'none',
							})
							reject(result)
						}
					},
					fail(err) {
						console.log('uploadFile err', err)
						reject(err)
					},
				})
			})
		} else {
			return Taro.request({
				url: `${baseUrl}${url}`,
				data,
				method,
				header,
				dataType,
				responseType,
				timeout,
				jsonp,
			})
		}
	}

	get<T>(options: Options): Promise<T> {
		return this.request({
			method: 'GET',
			...options,
		})
	}

	post<T>(options: Options): Promise<T> {
		return this.request({
			method: 'POST',
			...options,
		})
	}

	put<T>(options: Options): Promise<T> {
		return this.request({
			method: 'PUT',
			...options,
		})
	}

	delete<T>(options: Options): Promise<T> {
		return this.request({
			method: 'DELETE',
			...options,
		})
	}

	jsonp<T>(options: Options): Promise<T> {
		return this.request({
			method: 'GET',
			jsonp: true,
			...options,
		})
	}
}

export default Request
