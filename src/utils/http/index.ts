/**
 * 请求基类
 */

import Taro from '@tarojs/taro'
import { CodeStatus } from '@/constants'
import urlInterceptor from '@/utils/http/interceptors/url.interceptor'
import headerInterceptor from '@/utils/http/interceptors/header.interceptor'
import paramInterceptor from '@/utils/http/interceptors/param.interceptor'
import dataInterceptor from '@/utils/http/interceptors/data.interceptor'
import delelteInterceptor from '@/utils/http/interceptors/delelte.interceptor'
import toast from '@/utils/toast'

// 添加拦截器
const getInterceptors = () => {
	return [
		urlInterceptor,
		headerInterceptor,
		paramInterceptor,
		dataInterceptor,
		delelteInterceptor,
		Taro.interceptors.logInterceptor,
		Taro.interceptors.timeoutInterceptor,
	]
}
getInterceptors().forEach(interceptorItem =>
	Taro.addInterceptor(interceptorItem)
)

type RequestConfig = {
	url: string
	data?: any
	method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'UPLOAD'
	[key: string]: any
}

type Response = {
	code: number
	data: any
	message: string
	status: any
}
type Options = {
	url: string
	data: any
	baseUrl?: string
	showToast?: boolean
	header?: any
}
class Request {
	async request({
		url,
		data,
		method,
		header = {
			'Content-Type': 'application/json',
		},
		showToast = true,
		baseUrl = TARO_API_BASE,
		dataType = 'json',
		responseType = 'text',
		jsonp = false,
	}: RequestConfig): Promise<any> {
		console.log('baseUrl :>> ', baseUrl)
		// 添加自定义请求头，用于配置处理
		header.config = {}
		header.config.baseUrl = baseUrl
		header.config.showToast = showToast

		// UPLOAD方法特殊处理
		if (method === 'UPLOAD') {
			return new Promise((resolve, reject) => {
				return Taro.uploadFile({
					url: `${baseUrl}/${url}`,
					filePath: data,
					name: 'file',
					success(res) {
						const resultData = res.data

						console.log('uploadFile success', resultData)
						console.log('uploadFile success', JSON.parse(resultData))
						const result = JSON.parse(resultData)
						if (CodeStatus.SUCCESS_LIST.includes(result.code)) {
							resolve(result)
						} else {
							toast.info(result.msg)
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
				url: `${baseUrl}/${url}`,
				data,
				method,
				header,
				dataType,
				responseType,
				jsonp,
			})
		}
	}

	get(options: Options): Promise<Response> {
		return this.request({
			method: 'GET',
			...options,
		})
	}

	post(options: Options): Promise<Response> {
		return this.request({
			method: 'POST',
			...options,
		})
	}

	put(options: Options): Promise<Response> {
		return this.request({
			method: 'PUT',
			...options,
		})
	}

	delete(options: Options): Promise<Response> {
		return this.request({
			method: 'DELETE',
			...options,
		})
	}

	jsonp(options: Options): Promise<Response> {
		return this.request({
			method: 'GET',
			jsonp: true,
			...options,
		})
	}

	/**
	 * 上传文件
	 */
	upload(options: Options): Promise<Response> {
		return this.request({
			...options,
			method: 'UPLOAD',
			header: {
				'Content-Type': 'multipart/form-data',
			},
		})
	}
}

export default Request
