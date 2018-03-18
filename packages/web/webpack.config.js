const {  } = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = (cliEnv, args) => {
  const env = cliEnv || args.mode || args.env;

  console.log(args.env, env);
  return {
    context: __dirname,
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
      })
    ]
  }
};
