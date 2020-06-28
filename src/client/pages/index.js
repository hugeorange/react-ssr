import React from 'react';
import { Helmet } from 'react-helmet';
import WrapComps from "../app/hoc";


//组件
class Index extends React.Component {

    handlerClick() {
        alert('一起来玩 react ssr 呀123。');
    }

    render() {
        const { tdk = {} } = this.props.page || {};
        return <>
            <Helmet>
                <title>{tdk.title}</title>
                <meta name="description" content={tdk.description} />
                <meta name="keywords" content={tdk.keywords} />
            </Helmet>
            <h1 onClick={this.handlerClick}>click here4567890!</h1>
        </>
    }
}

export default WrapComps(Index);