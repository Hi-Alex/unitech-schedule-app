const {  } = require('webpack');
const { join } = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { ReactLoadablePlugin } = require('react-loadable/webpack');
const template = require('html-webpack-template');

/**
 * @returns {Configuration}
 */
module.exports = (cliEnv, args) => {
  const env = cliEnv || args.mode || args.env;
  const createIs = type => (value, falsy = null) => env === type ? value : falsy;
  const dev = createIs('development');
  const prod = createIs('production');

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
                plugins: [
                  'syntax-dynamic-import',
                  //'react-loadable/babel'
                ]
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
          test: /\.(scss|sass|css)?$/,
          use: [
            'style-loader',
            {
              loader: "css-loader",
              options: {
                modules: true
              }
            },
            'sass-loader'
          ]
        }
      ]
    },
    plugins: [
      new ReactLoadablePlugin({
        filename: './dist/loadable-stats.json'
      }),
      new ForkTsCheckerWebpackPlugin({
        workers: ForkTsCheckerWebpackPlugin.TWO_CPUS_FREE
      }),
      new htmlWebpackPlugin({
        inject: false,
        template,
        appMountId: 'root'
      })
    ],
    optimization: {
      splitChunks: {
        chunks: 'async'
      }
    },
    devServer: {
      historyApiFallback: true,
    }
  }
};
