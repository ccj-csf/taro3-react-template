import Request from '@/utils/http'

/**
 * 服务类示例
 */
class DemoApi extends Request {
	/**
	 * 一个获取某项数据的 get 请求
	 */
	getUserInfo() {
		return this.get({
			url: '/test/list',
			baseUrl:
				'https://www.fastmock.site/mock/499dd552f8ba5b2721b21c0687470e45/ccj',
		})
	}
}

export default new DemoApi()
