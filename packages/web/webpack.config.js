const {  } = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const template = require('html-webpack-template');

module.exports = (cliEnv, args) => {
  const env = cliEnv || args.mode || args.env;
  const createIs = type => value => env === type ? value : null;
  const dev = createIs('development');
  const prod = createIs('production');

  return {
    mode: args.mode || env,
    context: __dirname,
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    module: {
      rules: [
        {
          test: /\.[tj]sx?$/,
          use: [
            {
              loader: 'cache-loader'
            },
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['env', {}]
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
        }
      ]
    },
    plugins: [
      new ForkTsCheckerWebpackPlugin({
        workers: ForkTsCheckerWebpackPlugin.TWO_CPUS_FREE
      }),
      new htmlWebpackPlugin({
        inject: false,
        template,
        appMountId: 'root'
      })
    ]
  }
};
