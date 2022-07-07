import * as dayjs from 'dayjs'
import Taro from '@tarojs/taro'
import wtils from 'wtils'

const notFringeScreenModels = [
	'iPhone 5',
	'iPhone 6',
	'iPhone 7',
	'iPhone 8',
	'iPhone 6 Plus',
	'iPhone 7 Plus',
	'iPhone 8 Plus',
	'iPhone se',
	'iPhone SE',
]

/**
 * @description 工具方法集合
 */
class Utils {
	/**
	 * @description 获取手机系统信息
	 */
	static systemInfo = Taro.getSystemInfoSync()

	/**
	 * @description 状态栏高度
	 */
	static statusBarHeight = this.systemInfo.statusBarHeight || 0

	/**
	 * @description 菜单按钮的布局位置信息
	 * @return Rect
	 */
	static menuButtonInfo = Taro.getMenuButtonBoundingClientRect()

	/**
	 * @description 判断是否是ios设备
	 * @return boolean
	 */
	static isIOS(): boolean {
		console.log('this.systemInfo :>> ', this.systemInfo)
		return !!this.systemInfo.model.startsWith('iPhone')
	}

	/**
	 * @description 判断是否是ios刘海屏幕设备
	 * @return boolean
	 */
	static isLiuHaibing(): boolean {
		if (this.isIOS()) {
			return !notFringeScreenModels.some(item => {
				return this.systemInfo.model.startsWith(item)
			})
		}
		return true
	}

	/**
	 * @description 自定义navbar高度
	 * @return Rect
	 */
	static navBarHeight(): number {
		const { height, top } = this.menuButtonInfo
		return height + (top - this.statusBarHeight) * 2
	}

	/**
	 * @description 自定义navbar高度+StatusBarHeight
	 * @return number
	 */
	static navigationBarAndStatusBarHeight(): number {
		return this.navBarHeight() + this.statusBarHeight
	}

	/**
	 * @description 格式化金额
	 * @param  price - 接收泛型
	 * @return T
	 */
	static formatPrice<T>(price: T): T {
		return wtils.formatPrice(price) || 0
	}

	/**
	 * @description 数字千位符格式化并保留两位小数
	 * @param price - 接受number | null类型参数
	 * @return string
	 */
	static toThousands(price: number | null): string {
		price = price || 0
		return price.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
	}

	/**
	 * @description 拨打手机号
	 * @param phoneNumber - 接收string类型手机号
	 */
	static makePhoneCall(phoneNumber = '0871-68626969'): void {
		Taro.makePhoneCall({
			phoneNumber: phoneNumber,
		})
	}

	/**
	 * @description 格式化日期
	 * @param date - 接受日期类型格式
	 * @return string
	 */
	static formatDate(date: string | Date, format = 'YYYY-MM-DD'): string {
		return dayjs(date).format(format)
	}
}

export default Utils
