import React from 'react';

let __SERVER__ = false;

try {
    __SERVER__ = !__CLIENT__;
} catch (error) {
    __SERVER__ = true;
}

export default (SourceComponent) => {
    return class HoComponent extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                initialData: {},
                canClientFetch: false//浏览器端是否需要请求数据
            }
            console.log("-------__SERVER__--------->", __SERVER__)
        }
        //用于服务端调用
        static async getInitialProps(ctx) {
            console.log('-----服务端调用----->')
            return SourceComponent.getInitialProps ? await SourceComponent.getInitialProps(ctx) : {};
        }

        // ssr首次进入页面以及csr/ssr切换路由时才调用组件的getInitialProps方法
        async getClientInitialProps() {
            const { match, location } = this.props;
            console.log('-----客户端渲染------>')
            const res = SourceComponent.getInitialProps ? await SourceComponent.getInitialProps({ match, location }) : {};
            this.setState({
                initialData: res,
                canClientFetch: true
            });
            let tdk = res?.page?.tdk || {};
            document.title = tdk.title || "默认标题"; 
        }

        componentDidMount() {
            this.getClientInitialProps();
        }


        render() {
            const props = {
                initialData: {},
                ...this.props
            };

            if (__SERVER__) {
                props.initialData = this.props.staticContext.initialData || {};
            } else {
                //客户端渲染
                //需要异步请求数据
                if (this.state.canClientFetch) {
                    props.initialData = this.state.initialData || {};
                } else {
                    //使用过后清除数据,否则其他页面会使用
                    props.initialData = window.__INITIAL_DATA__;
                    window.__INITIAL_DATA__ = {};
                }
            }
            return <SourceComponent  {...props}></SourceComponent>
        }
    }
}