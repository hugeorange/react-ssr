## 
- 开发环境启动： `npm run dev` 客户端打包，`npm run start` 启动服务端

- 生产环境： `npm run prod` 打包代码，`npm run prod:start` 启动服务

## react-ssr 记录
- [掘金小册](https://juejin.im/book/5d8ae0c2f265da5bb065c6f4/section/5d8ae0d2e51d4577ef53ddf3)
1. 虚拟DOM除了在渲染时提高渲染性能，以最小的代价更新视图外，另一个作用就是为组件的跨平台渲染提供可能
2. 虚拟dom本身就是存在于内存中的一个对象，通过对象的属性来描述要渲染的具体是什么元素以及什么内容
3. 基于同构，浏览器和服务端可以运行同一份代码，服务端直出组件后，浏览器接管页面，然后剩下的工作由浏览器来完成。



### 知识点
- react-router 在react-ssr 的用处
    1. StaticRouter location context
    2. matchPath path-to-regexp
    3. props.staticContext
- 数据脱水 & 数据注水

### SEO TDK 支持
- TDK
    1. title 当前页面的标题
    2. description 当前页面的描述
    3. keywords 当前页面的关键词

- 简单粗暴手动设置meta标签
- 动态tdk从预取数据里做手脚
- react-helmet 组件

### css 资源的处理
- 服务端处理-暴力破解法
  ```
    既然服务端无法处理css模块，而我们也不能给服务端配置添加相关的 css loader,否则css也会被打包进js

    babel 插件处理在服务端构建代码前干掉这行css
  ```
- react-ssr.js 手动 <link rel="stylesheet" type="text/css" href="/main.css" />

### 构建生产环境
- 常见的 [manifest.json](https://segmentfault.com/a/1190000019395237)问题
- webpack-manifest-plugin 在做node ssr 时，由于客户端打包出来的文件都具有hash值，导致服务端输出html时无法正确输出，利用该插件可以输出一个资源名：资源地址的映射，然后动态拼尽输出的html里面，参考`server/common/assets.js`

### 剩余问题：
1. 开发环境配置
2. 生产环境打包没有打出来依赖包，貌似是静态资源引用问题

### 高阶函数封装页面组件通用处理逻辑
1. 组件内服务端预取数据
2. 页面组件内服务端渲染时展示逻辑、客户端渲染展示逻辑
以上全部都封装在 hoc 里面

### css 同构资源直出

### 添加数据状态管理 redux/mobx...

### CSR/SSR双模式渲染支持以及其他细节梳理

### 对比业内已有框架实现
- [next.js](https://nextjs.frontendx.cn/docs/#%E8%87%AA%E5%AE%9A%E4%B9%89%E6%9C%8D%E5%8A%A1%E7%AB%AF%E8%B7%AF%E7%94%B1)
- [egg-react-ssr](https://github.com/ykfe/egg-react-ssr)
- [easy-team/egg-react-ssr](https://www.yuque.com/easy-team/egg-react/init)
  
---

### 额外知识
- [react中出现的"hydrate"这个单词到底是什么意思?](https://www.zhihu.com/question/66068748)
- [npm run all & && 脚本并行、串行](https://blog.csdn.net/ligang2585116/article/details/105909789)
- 数据脱水、数据注水
  ```
    服务端和客户端双端节点对比失败导致数据一闪而过，服务端首屏请求的数据无法传递到客户端

    脱水：
        在服务端将首屏获得的数据通过字符串的形式放在隐藏的html标签内，直出到客户端
        我们在直出组件的时候同时将数据源也输出给浏览器，而这个过程就叫做数据脱水。
        
    注水：
        浏览器得到数据后如何使用？
        浏览器在组建渲染前得到初始化数据
        将数据作为属性传递给组件
        ---
        根据当前的pathname匹配到相对应的路由组件，在Route组件的render方法里面将数据传递给组件即可

        ps:因为在服务端渲染的时候我们传入初始数据的属性为initialData,所以客户端最好使用同一个属性来传递。

        数据和组件调和渲染的过程叫做注水
  ```
  - path.join 与 path.resolve
  - hydrate
    ```
        //渲染 index 组件 到页面
        // ReactDom.hydrate(<Index />, document.getElementById('root'))


        /**
        * render : 
        * 这就带来了一个问题，ReactDOM.render 不再能够简单地用 data-react-checksum 的存在性来判断是否应该尝试复用，
        * 如果每次 ReactDOM.render 都要尽可能尝试复用，性能和语义都会出现问题。所以， ReactDOM 提供了一个新的 API， 
        *  ReactDOM.hydrate() 。


        结论：hydrate 描述的是 ReactDOM 复用 ReactDOMServer 服务端渲染的内容时尽可能保留结构，
        并补充事件绑定等 Client 特有内容的过程。

        作者：工业聚
        链接：https://www.zhihu.com/question/66068748/answer/238387766
        */
    ```

