//路由配置文件 客户端 按需加载路由
import loadable from '@loadable/component'

export default [
    {
        path: ['/', '/index'],
        // component: Index,
        component: loadable(() => import(/* webpackChunkName: "index" */ '../pages/index')),
        exact: true //是否精确匹配
    },
    {
        path: '/list',
        // component: List,
        component: loadable(() => import(/* webpackChunkName: "list" */ '../pages/list')),
        exact: true,
    }
]