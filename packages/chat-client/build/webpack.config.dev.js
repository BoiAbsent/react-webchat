const path = require('path')
const httpWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, '../src/index'),
  output: {
    path: path.resolve(__dirname, '../dist')
  },
  mode: 'development',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.css'],
  },
  plugins: [
    new httpWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html')
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
        // loader: 'babel-loader',
        // options: {
        //   plugins: [
        //     [
        //       '@babel/plugin-transform-react-jsx'
        //     ]
        //   ]
        // },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: ['style-loader', 'css-loader']
      },
    ]
  },
  devServer: {
    port: 8888,
    contentBase: path.resolve(__dirname, '../dist'),
    proxy: {
      '/socket.io': {
        target: 'http://127.0.0.1:3333',
        ws: true,
        changeOrigin: true
      },
    }
  }
}