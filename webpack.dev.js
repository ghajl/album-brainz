const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  plugins: [
    new CopyWebpackPlugin([
      { from: 'static', to: 'static' },
      { from: 'cypress/fixtures/images', to: 'cypress/fixtures/images' }
    ])
  ],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public/'),
    port: 3000,
    publicPath: 'http://localhost:3000/dist/',
    hotOnly: true,
    historyApiFallback: true
  }
});
