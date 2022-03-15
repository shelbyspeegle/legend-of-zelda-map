const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      title: 'The Legend of Zelda',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ]
  },
  output: {
    clean: true, // clean dist/ on each build.
  },
  devtool: 'inline-source-map',
  devServer: {
    hot: true, // enables reload on change.
  }
};