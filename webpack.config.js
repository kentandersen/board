var path = require('path');

const src = path.resolve(__dirname, 'src/public');
const dist = path.resolve(__dirname, 'dist');

module.exports = {
  entry: path.join(src, 'main.js'),
  output: {
    path: dist,
    filename: 'board.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [{
      test : /\.jsx?/,
      include : src,
      exclude: /node_modules/,
      loader: 'babel',
    },
    {
      test: /\.less$/,
      loader: "style!css!less"
    }
    ]
  }
};
