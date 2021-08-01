const path = require('path');

module.exports = {
  entry: ['babel-polyfill', './client/src/index.js'],
  devServer: {
    contentBase: __dirname + '/client/src/',
    proxy: {
      '/': 'http://localhost:3000',
    },
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              '@babel/plugin-transform-runtime',
              '@babel/transform-async-to-generator',
            ],
          },
        },
      },
      {
        // test: /\.s[ac]ss$ || \.css$/i,
        test: /\.(scss|css|sass)$/i,
        // include: [path.resolve(__dirname, 'client')],
        // exclude: [path.resolve(__dirname, 'node_modules')],
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/build/',
    filename: 'bundle.js',
  },
  resolve: {
    // Enable importing JS / JSX files without specifying their extension
    extensions: ['.js', '.jsx'],
  },
};
