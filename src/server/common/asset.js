//生产环境中 静态资源的处理
module.exports = function () {

    let devHost = '//localhost:9001';


    const assets = {
        js: [],
        css: []
    };

    if (process.env.NODE_ENV !== "production") {//开发环境
        assets.js.push(`<script type="text/javascript"  src="${devHost}/index.js"></script>`);
        assets.css.push(`<link rel="stylesheet" type="text/css" href="${devHost}/main.css" />`);
    } else {
        //生产环境从 manifest.json 读取资源
        const map = require('@dist/static/manifest.json');

        Object.keys(map).forEach(item => {
            if (item.includes('js')) {
                assets.js.push(`<script type="text/javascript"  src="${map[item]}"></script>`)
            }
            if (item.includes('css')) {
                assets.css.push(`<link rel="stylesheet" type="text/css" href="${map[item]}" />`)
            }
        })
    }


    return assets;

}