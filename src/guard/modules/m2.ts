import { Middleware } from 'tarojs-router-next'
const m2: Middleware = async (ctx, next) => {
	console.log('第二个中间件执行：', ctx.route.url)
	await next() // 执行下一个中间件
}
export default m2
