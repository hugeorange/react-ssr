import React from 'react';
import tempData from '../data.js';
import WrapComps from "../app/hoc";

class List extends React.Component {
    static async getInitialProps() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    page: {
                        data: tempData,
                        tdk: {
                            title: '列表页',
                            keywords: '前端技术江湖',
                            description: '前端技术江湖'
                        }
                    }
                })
            }, 100);
        })
    }


    handlerClick() {
        alert('一起来玩 react ssr 呀123。');
    }

    render() {
        const { data } = this.props?.initialData?.page || {};
        return <div>
                    <h1 onClick={this.handlerClick}>click here111222456!</h1>
                    {data && data.map((item, index) => (          
                        <div key={index}>
                            <h3>{item.title}</h3>
                            <p>{item.desc}</p>
                        </div>
                    ))}
                    {!data && <div>暂无数据</div>}
                    <div>1111</div>
                </div>
    }
}

export default WrapComps(List);