const { HotModuleReplacementPlugin } = require('webpack');
const { join } = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { ReactLoadablePlugin } = require('react-loadable/webpack');
const template = require('html-webpack-template');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const { compact } = require('lodash');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

/**
 * @returns {Configuration}
 */
module.exports = (cliEnv, args) => {
  const env = cliEnv || args.mode || args.env;
  const createIs = type => (value, falsy = null) => env === type ? value : falsy;
  const dev = createIs('development');
  const prod = createIs('production');

  console.log('Babel plugins', compact([
    'syntax-dynamic-import',
    'transform-object-rest-spread',
    prod('lodash'),
    prod('ramda')
    //'react-loadable/babel'
  ]));

  return {
    mode: args.mode || env,
    context: __dirname,
    devtool: dev('eval', false),
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    output: {
      path: join(__dirname, '.build')
    },
    module: {
      rules: [
        {
          test: /\.[tj]sx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'cache-loader',
              options: {
                cacheDirectory: join(__dirname, '.cache', 'cache-loader')
              }
            },
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['env', {
                    modules: false
                  }]
                ],
                plugins: compact([
                  'syntax-dynamic-import',
                  'transform-object-rest-spread',
                  prod('lodash'),
                  prod('ramda')
                  //'react-loadable/babel'
                ])
              }
            },
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true
              }
            }
          ]
        },
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
      prod(new BundleAnalyzerPlugin({
        openAnalyzer: true
      })),
      prod(new LodashModuleReplacementPlugin()),
      new HotModuleReplacementPlugin(),
      new ReactLoadablePlugin({
        filename: './.build/loadable-stats.json'
      }),
      new ForkTsCheckerWebpackPlugin({
        workers: ForkTsCheckerWebpackPlugin.TWO_CPUS_FREE
      }),
      new htmlWebpackPlugin({
        inject: false,
        template,
        appMountId: 'root'
      })
    ]),
    optimization: {
      splitChunks: {
        chunks: 'async'
      }
    },
    devServer: {
      historyApiFallback: true,
      hotOnly: true
    }
  }
};
