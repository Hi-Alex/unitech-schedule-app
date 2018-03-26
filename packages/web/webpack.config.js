const { createConfig, createAssertion, getEnvironment } = require('@secundant/webpack-config');
const { HMR } = require('@secundant/webpack-module-hmr');
const { DLL, getPackagesFromDLLOptions, getFileNameFromPackages } = require('@secundant/webpack-module-dll');
const { Babel } = require('@secundant/webpack-module-babel');
const { Entry } = require('@secundant/webpack-module-entry');
const { React } = require('@secundant/webpack-module-react');
const { Thread } = require('@secundant/webpack-module-thread');
const { TypeScript } = require('@secundant/webpack-module-typescript');
const { Optimization } = require('@secundant/webpack-module-optimization');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HTMLWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const { compact } = require('lodash');
const { join } = require('path');
const dllOptions = {
  presets: ['lodash'],
  modules: [
    'ramda',
    'sockjs-client/dist/sockjs.js'
  ]
};

module.exports = (baseEnv, args) => {
  const env = getEnvironment(baseEnv || args.mode || args.env);
  const { prod, dev } = createAssertion(env, 'web');

  return createConfig({
    env,
    config() {
      return {
        output: {
          publicPath: '/',
          path: join(__dirname, '.build')
        },
        module: {
          rules: [
            {
              test: /\.(scss|sass|css)$/,
              use: [
                'style-loader',
                {
                  loader: "css-loader",
                  options: {
                    modules: true,
                    localIdentName: '[name]__[local]__[hash:6]'
                  }
                },
                'sass-loader'
              ]
            },
            {
              test: /\.(svg|png|jpg)$/,
              use: [
                {
                  loader: 'url-loader',
                  options: {
                    limit: 1024
                  }
                }
              ]
            }
          ]
        },
        plugins: compact([
          new BundleAnalyzerPlugin({
            openAnalyzer: false
          }),
          new HTMLWebpackPlugin({
            title: "Редактор раписания",
            inject: false,
            template: join(__dirname, 'template.ejs'),
            appMountId: 'root'
          }),
          prod && new LodashModuleReplacementPlugin({
            shorthands: true,
            collections: true
          }),
          dev && new AddAssetHtmlPlugin({
            filepath: join(__dirname, '.cache', '.DLL', getFileNameFromPackages(getPackagesFromDLLOptions(dllOptions)))
          })
        ]),
        devServer: {
          historyApiFallback: true,
          hotOnly: true,
          publicPath: '/'
        }
      }
    },
    modules: [
      new HMR({
        useDevServer: true
      }),
      new DLL(dllOptions),
      new Babel({
        plugins: compact([
          'syntax-dynamic-import',
          'transform-object-rest-spread',
          'react-hot-loader/babel',
          prod && 'lodash',
          prod && 'ramda'
        ])
      }),
      new Entry('./src/index.tsx'),
      new TypeScript(),
      new Thread(),
      new React(),
      new Optimization({
        devTool: 'source-map'
      })
    ]
  }).then(raw => {
    //console.log(JSON.stringify(raw.module.rules, null, 2));
    return raw;
  });
};
