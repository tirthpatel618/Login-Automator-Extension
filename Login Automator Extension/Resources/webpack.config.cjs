const path = require('path');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const Buffer = require('buffer').Buffer;
const Stream = require('stream-browserify');


module.exports = {
  // Your existing configuration
  entry: './background.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'background.bundle.js',
  },
  resolve: {
    fallback: {
      "buffer": require.resolve("buffer/"),
      "stream": require.resolve("stream-browserify"),
      "crypto": false,
      "path": false,
      'tls': false,
      'net': false,
    }
  }, 
  plugins: [
    new NodePolyfillPlugin()
  ],
  // Add this section if not already present
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  // Set the mode option
  mode: 'development' // or 'production'
};
