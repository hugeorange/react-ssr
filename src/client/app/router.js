// src/client/router/indxex.js
//路由配置文件

import Layout from './layout';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

//服务端也会用到所以通过参数的方式将配置传递进来
export default function App({ routeList }) {
    return (
        <Layout>
            <Switch>
                { routeList.map(item => <Route key={item.path} {...item}></Route>)}
                <Route to="*" render={() => <h1>404 page</h1> }></Route>
            </Switch>
        </Layout>
    );
}