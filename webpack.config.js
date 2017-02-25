const webpack = require('webpack');
const path = require('path');
const ExtractTextWebpack = require('extract-text-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    app: './js/app.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextWebpack.extract({
          fallback: 'style-loader',
          use: [
            'css-loader?modules&importLoaders=1',
            'postcss-loader?sourceMap=inline'
          ]
        })
      },
    ]
  },
  output: {
    path: path.resolve(__dirname, 'theme/static/js'),
    filename: '[name].js',
  },
  plugins: [
      new ExtractTextWebpack('../css/[name].css'),
  ],
  resolve: {
    extensions: [".js", ".json"],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
};
