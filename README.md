# Taro 3.x 基础框架

基于 Taro3 + React + hooks 的开箱即用多端项目模版。

## 技术栈

- Taro
- React Hooks
- TypeScript
- Taroify
- SCSS
- redux

## 支持特性

- 🏠 基于 Taro3
- 📦 支持 React hooks
- 🐑 CSS 预处理器( SCSS )
- 🥣 完全使用 TypeScript 开发
- 🔛 基于taro request拦截器封装，支持横向扩展
- 👮 `eslint`+`stylelint`+`prettier`+`commitlint`+`editorConfig`
- 🔥 tarojs-router-next路由扩展
- 📈 taro-iconfont-cli使用 iconfont 图标
- 📈 Taro-Hooks
- 🐑 接入 tailwindcss 2.0 插件
- 👩🏻 css module
- 🌩️ 使用多核心及缓存提升编译速度

### 包管理工具

- yarn
- 优势
  - 并行安装, 使用缓存, 安装速度快
  - 版本的冥等性 (即 lock file, npm 现在也有了)
  - 输出信息简洁
  - 从 npm 切到 yarn 简单学习即可:  [快速入门](https://yarn.bootcss.com/)
  - 也可使用tyarn [地址](https://github.com/yiminghe/tyarn)
  - pmpm暂不推荐使用

### 基本框架结构说明

  ```bash
├── .husky                     # husky 配置文件
├── .taro-plugin-tailwind      # mini, h5端tailwind配置文件
├── config                     # taro配置
├── src                        # 源码: 业务代码主要集中在此目录
│   ├── api                    # api 封装
│   ├── assets                 # 静态资源
│   ├── components             # 全局公用组件
│   ├── config                 # 全局公用配置
│   ├── constants              # 常量文件管理
│   ├── guard                  # 权限拦截
│   ├── hooks                  # 全局composition管理
│   ├── store                  # store状态管理
│   ├── styles                 # 样式管理
│   ├── utils                  # 全局公用方法
│   ├── pages                  # 页面路由文件
│   ├── app.config.ts          # 小程序全局配置文件
│   ├── app.scss               # 全局样式入口文件
│   ├── app.tsx                # 项目入口文件
│   ├── index.html             # h5端模板文件
├── .cz-config.js              # cz-config配置文件
├── .eslintignore              # eslint 检验忽略文件
├── .eslintrc.js               # eslint 配置项
├── .gitignore                 # git 忽略文件配置项
├── .lintstagedrc.json         # lintstage配置文件
├── .prettierignore            # prettier忽略文件
├── .babel.config.js           # babel配置
├── commitlint.config.js       # commit 提交配置
├── global.d.ts                # 全局的 .d.ts文件
├── iconfont.json              # iconfont配置文件
├── package-lock.json          # npm锁定安装时的包的版本号，gitignore中忽略提交的
├── project.config.json        # 小程序配置文件
├── package.json               # npm包管理
├── README.md                  # 说明文档
├── windi.config.js            # tailwind 配置文件
├── tsconfig.json              # ts 配置文件
├── yarn.lock                  # yarn锁定安装时的包的版本号，gitignore中忽略提交的
  ```

### 目录补充说明

- config
  - plugins 插件配置集
  - dev.js开发环境配置
  - uat.js测试环境配置
  - pro.js生产环境配置
  - index.js默认配置

- src 目录

  - 业务相关的代码主要集中在 src 目录下

  - api: 请求封装，后面会详细讲解

  - assets:  静态资源放在该目录下，管理images和icons
    - images管理图片资源，图片命名采用模块+图片名的方式,eg:tabbar-home.png,tabbar-home-selected.png
      - 公用图片不用加模块前缀，一般来说模块名为路由对应页面的路径
      - 采用中划线进行连接
    - icons下存在的是iconfont上的图标
      - 基于社区taro-iconfont-cli插件来进行icon的管理，[文档](https://github.com/iconfont-cli/taro-iconfont-cli#readme)
      - icon名称放到name上会有ts提示，类型文件再icons/index.d.ts中定义的为准，可能会和iconfont上的名字有差异
      - 当iconfont.cn中的图标有变更时，只需更改配置iconfont.json配置中symbol_url，然后再次执行`npx iconfont-taro`即可生成最新的图标组件

```jsx
    import React, { Component } from 'react';
    import IconFont from '@/assets/icons';

    const App = ()=> {
      render() {
        return (
          // 原色彩
          <IconFont name="zhuanfarenwu" />

          // 单色：红色
          <IconFont name="zhuanfarenwu" color="red" />

          // 多色：红色+橘色
          <IconFont name="zhuanfarenwu" color={['red', 'orange']} size={300} />

          // 不同格式的颜色写法
          <IconFont name="zhuanfarenwu" color={['#333', 'rgb(50, 124, 39)']} />
        );
      }
    }

    export default App;
```

- components:  全局公用组件
  - 文件名和组件名必填且使用Pascal命名且保持一致，业务直接中需要使用自行导入
  - 组件命名，傻瓜组件以Base开头命名，带业务的逻辑组件以Sp开头，eg：BaseTable、BaseSvgIcon、TjSelectCity(ps:Tj腾晋简写)
  - 全局组件多个业务用到才可提取到当前文件下进行管理，不然请就近维护
  - 详细目录结构参照components下BaseButton组件的结构，不需要的文件可删除，比如样式文件和 components文件

  - config:  配置文件管理
    - tabbar.config.ts 小程序tabbar配置
    - 你认为可以抽离成配置的文件的都可以抽到当中来

  - constants:常量文件
    - index.ts 目前只维护一个未见，有需要再增加其他类型常量文件
  
  - guard:  全局路由守卫
    - 通过tarojs-router-next插件来实现，[文档](http://lblblib.gitee.io/tarojs-router-next/guide)
    - index.ts为模块注册文件，主需要在app.ts中导入即可
    - modules为路由中间件模块，需要在里面添加即可

```ts
  import { registerMiddlewares } from 'tarojs-router-next'
  import auth from './modules/auth'
  import m2 from './modules/m2'

  // 注册路由中间件
  registerMiddlewares([auth, m2])

```

- hooks
  - 逻辑复用采用hooks方式，不推荐使用类组件的形式
  - 文件名以use开头，比如useLoadMore，文件命名已use开头，eg：useTable、useConfirm
  - 项目引入引入了taro-hooks，自定义hooks前请先查看有没有封装好的hook，具体使用方式请查看[文档](https://taro-hooks-innocces.vercel.app/)

- pages: 主要的页面放置在其中, 根目录下不能有任何组件文件, 所有的页面都需要以文件夹的形式组织
  - 顶部文件夹以一级菜单为单位命名文件夹方便查找和定位
  - 文件内index.ts作为入口文件
  - 文件名采用中划线连接，eg：order-detail
  - 文件夹下的小程序文件相关文件命名必须为index.类型文件名结尾
  - 需要组件拆分的场景，新建components文件管理当前模块组件，组件名Pascal命名
  - 多模块复用组件请考虑抽离到全局components文件下
  - index.module.scss为页面组件样式，样式配置用已开启css module，文件名必须为示列中的命名
  - index.config.ts为当前页面配置文件
  - helper为当前页面帮助函数、hooks集合
  - data.d.ts为当前页面ts类型定义文件
  - route.config.ts为当前页面路由配置文件，通过导出类型定义后，可让Router.to*方法获得完备的类型提示，不需要传参可不用新建该文件，文件具体使用，[参照文档](http://lblblib.gitee.io/tarojs-router-next/guide/quike/params)

  - 分包
    - 分包文件新建在pages/subpackages下
    - 每个分包都是独立的标包名,包名建议命名方式为package-包名
    - pages下的规范为一级目录的中页面文件保持一致
    - 需在src/app.config.ts文件中的分包配置加入两个字段：
    - pagesPath加入会提示没有定义该字段，不用管
    - name该字段是子包的名字，子包路由方法生成规则按照 Router.[name].toXX，所以 name 的值请不要包含特殊符号
    - 新加入的页面可能会遇到不能找到该路由对应的方法，重新reload编辑器即可

```ts
  const tabbarConfig = require('./config/tabbar.config')
  import { useGlobalIconFont } from './assets/icons/helper'
  export default defineAppConfig({
    entryPagePath: 'pages/index/index',
    pages: ['pages/index/index', 'pages/user/index'],
    subpackages: [
      {
        root: 'pages/subpackages/packageA',
        name: 'packageA',
        pagesPath: 'pages/subpackages/packageA/pages',
        pages: ['pages/index/index'],
      },
      {
        root: 'pages/subpackages/packageB',
        name: 'packageB',
        pagesPath: 'pages/subpackages/packageB/pages',
        pages: ['pages/index/index'],
      },
    ],
    tabBar: tabbarConfig,
    usingComponents: Object.assign(useGlobalIconFont()),
    window: {
      // navigationStyle: 'custom',
      navigationBarBackgroundColor: '#fff',
      navigationBarTextStyle: 'black',
    },
    // 页面切换动画
    animation: {
      duration: 196, // 动画切换时间，单位毫秒
      delay: 50, // 切换延迟时间，单位毫秒
    },
  })

```

- styles: 样式管理
  - mixins.scss mixin管理，eg：样式溢出
  - util.scss工具类，项目已经集成tailwind，建议不在里面添加，除非tailwind满足不了
  - variables.scss，样式变量管理
  - 全部文件引入在app.scss中导入，然后在pages中任何页面都可以使用
  - tailwind
    1. [文档](https://taro-ext.jd.com/plugin/view/5fbb3a0799370e09266e2d68)
    2. 小程序不支持使用反斜杠和冒号作为类名，因此默认配置文件 mini.config.js 中，冒号、反斜杠 修改成使用下划线 _

```jsx
  <View className="w-1_3"></View>
  应该写成:
  <View className="w-1_3"></View>
```

- store: Redux导出
  - actions为action管理，按照模块管理，eg：user
  - actionTypes采用常量组织，目前只有index.ts作为导出，需要类型再里进行添加
  - reducers采用模块管理，在modules中添加需要管理的模块,index.ts做聚合导出
  - 不建议每个流程都走redux，简单的业务直接父子参数，或者采用useReducer+useContext方案
  - redux-logger是记录日志的插件

```jsx

import React from 'react'
import { Button } from '@taroify/core'
import { View } from '@tarojs/components'
import { useSelector, useDispatch } from 'react-redux'
import Counter from './components/Counter'
import { addUser, deleteUser } from '@/store/actions/user'
import type { RootState } from '@/store'
const Index: React.FC = () => {
 const { num } = useSelector((state: RootState) => state.user)
const dispatch = useDispatch()
return (
  <>
  <View className='mt-4'>
     <View className='flex mt-6 justify-between'>
      <Button color='primary' onClick={() => dispatch(addUser(4))}>增加</Button>
      <Button onClick={() => dispatch(deleteUser(1))}>删除</Button>
     </View>
     <Counter num={num} />
    </View>
 </>
 )
}

export default Index
```

- utils: 公用工具函数等
  - 文件名以小驼峰命名，eg：set.title
  - 安装了前端业务代码工具库utilscoreJs，String,Number,Array,Object,Function,Date,prototype扩展方法、base64、表单验证、url、事件订阅等常用函数，用到具体方法可基于此库进行二次封装再使用
  - auth token以及用户操作相关操作
  - http封装
  - validate 校验、正则工具
  - toast taro.toast二次封装

  ```ts
  // utilscoreJs使用
  import { mask } from 'utilscore' // 或 import { mask } from 'utilscore/dist/index.js'

  let txt = mask('12398765432',3,7) 
  console.log(txt) // => "123****5432"
  ```

### Api 层设计

- 封装 api
- 隔离 api 实现 (ajax, axios, fetch), 换实现时, 只需修改 Api 相关文件的部分实现, 不会影响到业务层，注意类名须以Api结尾
- 通过类的形式调用，也可以避免命名空间冲突的问题
- http模块对taro.request进行了二次封装，增加拦截器功能，拦截器可方便的进行扩展，参照utils/http/interceptors/下文件进行编写

- Api 基类

```ts
import Request from '@/utils/http/request'
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

// 使用
  import demoApi from '@/api/demo'

useEffect(() => {
  demoApi.getUserInfo().then(res => {
    console.log('res :>> ', res)
  }).catch(err => {
    console.log('err :>> ', err)
  })
}, [])

```

### TypeScript

- TypeScript 的好处已经无须赘述，无论是开发成本还是维护成本都能大大减少，TypeScript 的最佳实践。

- 什么时候推荐用 type 什么时候用 interface ？
  - 推荐任何时候都是用 type， type 使用起来更像一个变量，与 interface 相比，type 的特点如下：
  - 表达功能更强大，不局限于 object/class/function要扩展已有 type 需要创建新 type，不可以重名支持更复杂的类型操作
  - 基本上所有用 interface 表达的类型都有其等价的 type 表达。

- 定义接口数据
  - 任何一个项目都离不开对数据和接口的处理，拼接数据和接口是形成业务逻辑也是前端的主要工作之一，将接口返回的数据定义 TypeScript 类型可以减少很多维护成本和查询api的时间。
  - 推荐在 src/api/API.d.ts 中定义接口数据的类型，以用户基本信息为例：

```ts
declare namespace API {
  // 用户基本信息
  export type CurrentUser = {
    avatar?: string;
    name?: string;
    title?: string;
    group?: string;
    signature?: string;
    tags?: {
      key: string;
      label: string;
    }[];
    userid?: string;
    roles?: 'user' | 'guest' | 'admin';
  };
}
```

- 推荐 json2ts 等网站来自动转化。

- 在使用时我们就可以很简单的来使用, d.ts 结尾的文件会被 TypeScript 默认导入到全局，但是其中不能使用 import 语法，如果需要引用需要使用三斜杠。

```tsx
  export async function query() {
    return request<API.CurrentUser[]>('/api/users');
  }

  // props
  export type UserProps = {
    userInfo: API.CurrentUser;
  };
```

- 为 Window 增加参数
  - 前端开发很大程度上就是与 Window 打交道，有时候我们不得不给 Window 增加参数，例如各种统计的代码。在 TypeScript 中提供一个方式来增加参数。在 global.d.ts 中做如下定义：

```ts
interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
}
```

- 如果不想在 Window 中增加，但是想要全局使用，比如通过 define 注入的参数，我们通过 declare 关键字在 global.d.ts 注入。

```ts
  declare const REACT_APP_ENV: 'uat' | 'dev' | 'pre' | false;
```

- 动态增加
  - 有时候我需要对一个 Object 的 key 进行动态的更新，为了方便我们可以对 key 设置为 any，这样就可以使用任何 key，多余 JSON.parse

```ts
  type Person = {
    name: string;
    age?: number;
    [key: string]: any;
  };
```

- 值可以为 null 或 undefined
  - 在 3.8 中已经很简单了，obj?.xxx 即可。

- 某个库不存在 typescript 的定义
  - 我们可以直接将其定义为 any。

```ts
  declare module 'xxx';

  import xxx from 'xxx';
```

- @ts-ignore
  - 有些时候类型错误是组件的，但是看起来非常难受。会一直编译报报错，这里就可以使用 @ts-ignore 来暂时忽略它。尽量不要这样使用

### 命名规范

- src下文件
  - 文件夹命名统一采用-连接，eg:pruduct-manager
  - config配置下文件采用.连接
  - assets/images图片采用-连接,eg:home-bg
  - components下文件夹名和组件采用Pascal命名
  - hooks下采用.连接，导出方法名使用小驼峰,查看hook下示列
  - styles下文件采用.连接
  - constants文件采用.连接，具体文件中命名规范查看示列
  - pages下文件后续会详细说明
  - utils下文件采用.连接
  - ts、tsx文件中变量和方法采用小驼峰
  - 类首字母大写
  - 样式文件变量定义采用小驼峰
  - 样式命名采用-连接

### UI组件库

- 项目已引入**`Taroify`**组件库
- 组要定制主题，可通过ConfigProvider的方式配置
- 内置了一些工具样式类，可直接使用，比如移动端一像素边框和文字溢出的样式
- [使用文档](https://taroify.gitee.io/taroify.com/introduce/)

```jsx
  // 文字省略
  // 当文本内容长度超过容器最大宽度时，自动省略多余的文本。

  <!-- 最多显示一行 -->
  <View class="taroify-ellipsis">这是一段最多显示一行的文字，多余的内容会被省略</View>

  <!-- 最多显示两行 -->
  <View class="taroify-ellipsis--l2">
    这是一段最多显示两行的文字，多余的内容会被省略
  </View>

  <!-- 最多显示三行 -->
  <View class="taroify-ellipsis--l3">
    这是一段最多显示三行的文字，多余的内容会被省略
  </View>

// 1px 边框
// 为元素添加 Retina 屏幕下的 1px 边框（即 hairline），基于伪类 transform 实现。
  <!-- 上边框 -->
  <View class="taroify-hairline--top"></View>

  <!-- 下边框 -->
  <View class="taroify-hairline--bottom"></View>

  <!-- 左边框 -->
  <View class="taroify-hairline--left"></View>

  <!-- 右边框 -->
  <View class="taroify-hairline--right"></View>

  <!-- 上下边框 -->
  <View class="taroify-hairline--top-bottom"></View>

  <!-- 全边框 -->
  <View class="taroify-hairline--surround"></View>
```

#### 组件通信

- 原则上能不使用redux的场景通过组件之间的通信方式即可
- 根据业务流程情况，利用redux和前端存储做好页面缓存
- redux建议是用来处理一些公用数据的场景，比如用户信息之类的

### 异步操作

- 尽可能使用 async + await处理
- 可读性更强+异常捕捉

### 前端储存

- 使用api尽量封装后再使用
- 不要直接裸用

### 添加一个新功能示例

- 首先在 pages 中添加新页面的路由配置
- 在 api 中新建新页面需要操作数据的 api
- 将aap.config.ts中配置路由

### 代码提交

项目集成了`git hooks`，提交报错时请按照提示进行修改后尝试

### 统一使用commitizen工具提交

- 项目配置了规则，根据提示操作即可 描述部分尽量言简意赅，避免随意或无意义的msg

- commit之前请先自己review一下代码，减少错误

```bash
git add ./**.js
# or
git add .

npm run commit
# or
yarn commit

```

### git commit message说明

- feat: 新功能
- fix: bug 修复
- docs: 仅修改文档
- style: 修改格式（空格，格式化，省略分号等），对代码运行没有影响
- refactor: 重构（既不是修 bug ，也不是加功能）
- build: 构建流程、外部依赖变更，比如升级 npm 包、修改 webpack 配置等
- perf: 性能优化
- test: 测试相关
- chore: 对构建过程或辅助工具和库（如文档生成）的更改
- ci: ci 相关的更改
- revert:revert  回滚commit

### 分支管理

- 遵循git workflow流程 <https://cloud.tencent.com/developer/article/1665568>
- develop为开发分支，test为测试分支，pre为预发布分支，master为正式环境分支，原则上这些分支只能通过合并的方式就行提交，不允许上述分支上直接修改提交
- 功能分支请从develop份上检出一份进行开发，命名为feature_姓名_分支创建时间，eg：feature_ccj_11-05
- 测试环境修复分支从test环境新建bugfix进行修复，修复完成后合并到test分支，名为为bugfix_姓名_分支创建时间，eg：bugfix_ccj_11-11，预发布问题从测试环境修复和，直接从test合并到pre分支即可
- 生产环境问题修复，从master分支新建hotfix分支进行修复，修复完成后先合并到test让qa回归后再，qa验证没问题后，再从master合并到develop分支，命名跟测试环境bug分支一样，前缀换成hotfix
- bug修复和功能分支属于临时分支，开发修复完成及时删除

### ESLint

- 不管是多人合作还是个人项目，代码规范都是很重要的。这样做不仅可以很大程度地避免基本语法错误，也保证了代码的可读性。
- 项目已经集成eslint校验，不通过本地运行会报错，并且不能提交到远程仓库
- vscode和eslint自动格式化代码，[具体配置参照文档](<https://panjiachen.gitee.io/vue-element-admin-site/zh/guide/advanced/eslint.html#%E9%85%8D%E7%BD%AE%E9%A1%B9>)
- 所有的配置文件都在 .eslintrc.js 中。 本项目基本规范是依托于taro官方的 eslint规则做了少许的修改，后续会持续根据使用情况进行配置
- 需要打开vscode format on  save配置，保存即可自动格式化

### 其他

- 编辑器体检 使用vscode
- 如有需要增加的类库讨论后再做新增
- 其他: 使用第三方库或者组件等的时候, 不要裸用或者裸继承. 最好自己封装一层
- 因为:没法进行一些通用处理
- 如果使用的库出现问题, 只能到处去修改
- 尽量避免使用硬编码(在代码中直接裸写一些后面可能会变化的值, 且在到处使用)

- 如  ``` if ( code === 1 ) ```

  ``` if ( code === ResTypes.SUCCESS ) ```

### 如何运行项目

- 安装依赖

    ```bash
    tyarn
    ```

    运行开发模式(编译并支持修改热加载)

    ```bash
    yarn dev:mp-dev
    ```

    测试环境打包

    ```bash
    yarn build:mp-uat
    ```

    生产模式打包

    ```bash
    yarn build:mp-pro
    ```
