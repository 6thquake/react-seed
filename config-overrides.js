const {
    injectBabelPlugin
} = require('react-app-rewired');
const paths = require('react-scripts/config/paths');
const path = require('path');
const fs = require('fs');
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
    webpack: function (config, env) {
        if(env==='production'){
            config.output.path = paths.appBuild = resolveApp('../build');
        }
        config = injectBabelPlugin(['import', {
            libraryName: '@6thquake/react-material',
            libraryDirectory: 'es',
            style: 'css'
        }], config);

        config = injectBabelPlugin(['syntax-dynamic-import'], config);
        const alias = {
            '$pages': path.resolve(__dirname, 'src/pages'),
            '$modules': path.resolve(__dirname, 'src/modules/modules'),
            '$components': path.resolve(__dirname, 'src/modules/components'),
            '$utils': path.resolve(__dirname, 'src/modules/utils'),
            '$redux': path.resolve(__dirname, 'src/modules/redux'),
            '$core': path.resolve(__dirname, 'src/modules/core'),
            '$svgIcons': path.resolve(__dirname, 'src/svgIcons'),
            '$themes': path.resolve(__dirname, 'src/themes'),
            '$config': path.resolve(__dirname, 'src/config'),
        };
        for(const k in alias){
            config.resolve.alias[k] = alias[k];
        }
        return config;
    },

    devServer: function (configFunction) {
        return function (proxy, allowedHost) {
            const config = configFunction(proxy, allowedHost);
            config.proxy = {
                "/api": {
                    "target": "/",
                    "headers": {
                    },
                    "changeOrigin": true,
                    "secure": false,
                },
            };

            return config;
        }
    }
};