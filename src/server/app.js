//web 服务启动入口文件
//这是一个中间件，它用于处理web 请求，实现react ssr，将组件转换为 html字符串

const Koa = require('koa2');
const koaStatic = require('koa-static');
const path = require('path');

const app = new Koa();

let reactSsr;
//设置可访问的静态资源，我们把 webpack 打包后的代码放到/dist/static目录下
if (process.env.NODE_ENV !== "production") {
    reactSsr = require('../../dist/src/server/middlewares/react-ssr').default;
    app.use(koaStatic(path.join(__dirname ,'../../dist/static')));
} else {
    reactSsr = require('./middlewares/react-ssr').default;
    app.use(koaStatic('./dist/static'));
}


//react ssr 中间件
app.use(reactSsr);

//启动服务

const port = process.env.NODE_ENV == "production" ? 9002 : 9001
app.listen(port);

console.log('server is start .', port);