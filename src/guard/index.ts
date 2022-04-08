import { registerMiddlewares } from 'tarojs-router-next'
import auth from './modules/auth'
import m2 from './modules/m2'

// 注册路由中间件
registerMiddlewares([auth, m2])
