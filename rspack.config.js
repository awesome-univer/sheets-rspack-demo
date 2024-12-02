const rspack = require('@rspack/core');
const packageJson = require('./package.json');

module.exports = {
  // ignoreWarnings: [
  //   warning => {
  //     if (warning.message.includes('Critical dependency')) {
  //       return true;
  //     }
  //     return false;
  //   }
  // ],
  entry: {
    main: './src/index.ts',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.css'],
    modules: ['node_modules']
  },
  devServer: {
    proxy: [
      {
        context: ['/universer-api'],
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    ],
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        exclude: [/node_modules/],
        loader: 'builtin:swc-loader',
        options: {
          jsc: {
            target: 'es2015',
            parser: {
              syntax: 'typescript',
            },
          },
        },
        type: 'javascript/auto',
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
        ],
        sideEffects: true,
      },
    ],
  },
  optimization: {
    minimize: false
  },
  devtool: false,
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: 'index.html',
    }),
    new rspack.DefinePlugin({
      'process.env.UNIVER_VERSION': JSON.stringify(packageJson.dependencies['@univerjs/presets']),
    })
  ],
};