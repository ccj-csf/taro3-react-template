import Request from '@/utils/http'

/**
 * 服务类示例
 */
class CommonApi extends Request {
	/**
	 * 处理公用数据
	 */
	addName<T>(data: T): T {
		return data
	}
}

export default CommonApi
