//路由配置文件- 服务端静态路由
import Index from '../pages/index';
import List from '../pages/list';

export default [
    {
        path: ['/', '/index'],
        component: Index,
        exact: true //是否精确匹配
    },
    {
        path: '/list',
        component: List,
        exact: true,
    }
]