const path = require('path')
const webpack = require('webpack')

const config = (env, argv) => {
  console.log('argv.mode', argv.mode)

  const backend_url = argv.mode === 'production'
    ? 'https://notes2023.fly.dev/api/notes'
    : 'http://localhost:3001/notes'

  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'main.js'
    },
    devServer: {
      static: path.resolve(__dirname, 'build'),
      compress: true,
      port: 3000,
    },
    //helps to map the pure .js code in browser to our actual .jsx code
    devtool: 'source-map',
    module: {
      rules: [
        {
          //specifies that the loader is for files ending with .js
          test: /\.js$/,
          //specificies that the processing will be done by babel-loader for these files
          loader: 'babel-loader',
          options: {
            //@babel/preset-env helps to transpile the code into ES6 standard
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        }
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        BACKEND_URL: JSON.stringify(backend_url)
      })
    ]
  }
}

module.exports = config