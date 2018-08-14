const { injectBabelPlugin } = require('react-app-rewired');
const paths = require('react-scripts/config/paths');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const Properties = require('@6thquake/react-properties');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  webpack: function(config, env) {
    if (env === 'production') {
      config.output.path = paths.appBuild = resolveApp('./build');
      config.devtool = false;
    }

    config = injectBabelPlugin(
      [
        'import',
        {
          libraryName: '@6thquake/react-material',
          libraryDirectory: 'es',
          style: 'css',
        },
      ],
      config,
    );

    config = injectBabelPlugin(['syntax-dynamic-import'], config);
    const alias = {
      $pages: path.resolve(__dirname, 'src/pages'),
      $modules: path.resolve(__dirname, 'src/modules/modules'),
      $components: path.resolve(__dirname, 'src/modules/components'),
      $utils: path.resolve(__dirname, 'src/modules/utils'),
      $redux: path.resolve(__dirname, 'src/modules/redux'),
      $core: path.resolve(__dirname, 'src/modules/core'),
      $service: path.resolve(__dirname, 'src/modules/service'),
      $svgIcons: path.resolve(__dirname, 'src/svgIcons'),
      $logger: path.resolve(__dirname, 'src/logger'),
      $themes: path.resolve(__dirname, 'src/themes'),
      $config: path.resolve(__dirname, 'src/config'),
    };
    for (const k in alias) {
      config.resolve.alias[k] = alias[k];
    }

    console.log(chalk.yellow.bold('--------------------webpack config start:--------------------'));
    console.log(chalk.yellow(`${JSON.stringify(config)}`));
    console.log(chalk.yellow.bold('--------------------webpack config end!  --------------------'));

    return config;
  },

  devServer: function(configFunction) {
    return function(proxy, allowedHost) {
      const config = configFunction(proxy, allowedHost);

      var props = Properties.load(path.resolve(__dirname));
      config.proxy = props.proxy;

      console.log(
        chalk.green.bold('--------------------dev server config start:--------------------'),
      );
      console.log(chalk.green(`${JSON.stringify(config)}`));
      console.log(
        chalk.green.bold('--------------------dev server config end!  --------------------'),
      );

      return config;
    };
  },
};
