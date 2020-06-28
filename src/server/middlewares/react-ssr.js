//完成 react ssr 工作的中间件,组件在服务端渲染的逻辑都在这个文件内

//引入Index 组件
import React from 'react';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import App from '../../client/app/router';
import routeList from '../../client/app/routes2';
import matchRoute from "../../share/match-route";


//导入资源处理库
const getAssets = require('../../server/common/asset');

//得到静态资源
const assetsMap = getAssets();

export default async(ctx, next) => {

    //获得请求的 path
    const path = ctx.request.path;

    if (path.indexOf('.') > -1) {
        ctx.body = null;
        return next();
    }


    //查找到的目标路由对象
    let {targetRoute} = matchRoute(path, routeList);
    let fetchResult = {};
    let tdk = {}
    if (targetRoute) {
        //数据预取 -> fetchResult
        let compsGetDataFunc = targetRoute.component.getInitialProps;
        if (compsGetDataFunc) {
            fetchResult = await compsGetDataFunc();
            if (fetchResult?.page?.tdk) {
                tdk = fetchResult.page.tdk || {};
            } else {
                tdk = {
                    title: '默认标题-react-ssr',
                    keywords: '默认关键词-react-ssr',
                    description: '默认描述-react-ssr'
                };
            }
        }
    }
    //将预取数据在这里传递过去 组内通过props.staticContext获取
    const context = { 
        initialData: fetchResult || {}
    };

    /**
     * import { StaticRouter} from 'react-router';
        该组件主要用于服务端渲染，可以帮助我们完成路由查找功能,无需再做手动匹配。
        基本的思路是，将替换为无状态的。
        将服务器上接收到的path传递给此组件用来匹配，同时支持传入context特性,此组件会自动匹配到目标组件进行渲染。
     */
    //渲染组件为 html 字符串
    const html = renderToString(
        <StaticRouter 
            location={path} 
            context={context}
        >
            <App routeList={routeList}></App>
        </StaticRouter>
    );

    console.log('assetsMap--->', assetsMap);

    const htmlStr = `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>${tdk.title || ""}</title>
                <meta name="keywords" content="${tdk.keywords}" />
                <meta name="description" content="${tdk.description}" />
                ${assetsMap.css.join('')}
            </head>
            <body>
                <div id="root">${html}</div>
                <textarea id="ssrTextInitData" style="display:none;">
                    ${JSON.stringify(fetchResult)}
                </textarea>
            </body>
        </html>
        ${assetsMap.js.join('')}
    `;

        // 在直出组件的时候同时将数据源也输出给浏览器，而这个过程就叫做数据脱水
    ctx.body = htmlStr;                
    return next();
}