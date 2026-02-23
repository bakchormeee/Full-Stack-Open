const path = require('path')

//config can be both a function or an object
const config = () => {
  return {
    entry: './src/index.js',
    //defines the location where bundled code is stored
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'main.js'
    }
  }
}

module.exports = config