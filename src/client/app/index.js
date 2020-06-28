// ./src/client/app/index.js

import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import App from './router';
import routeList from './routes';

import "./layout.css";


function renderDom(routeList) {
    ReactDom.hydrate(
        <BrowserRouter>
            <App routeList={routeList} />
        </BrowserRouter>
        , document.getElementById('root'))
}

function clientRender(routeList) {

    let initialData = JSON.parse(document.getElementById('ssrTextInitData').value);
    window.__INITIAL_DATA__ = initialData;

    renderDom(routeList);
}

//渲染入口
clientRender(routeList);

