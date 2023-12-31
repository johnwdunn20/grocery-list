const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development', // I don't think I need this because setting this in pacakage.json scripts
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  // devtool: 'eval-source-map', // improves debugging capabilities ?
  devServer: {
    // specifying dev server
    host: 'localhost',
    port: 8080,
    // enable HMR on the devServer
    hot: true,
    // fallback to root for other urls. Best practice if you need client side routing
    historyApiFallback: true,
    // point static files to client/dist even though public path is /
    static: {
      // match the output path
      directory: path.resolve(__dirname, '/dist'),
      // match the output 'publicPath'
      publicPath: '/',
    },
    // only required if there are specific CORS items
    headers: { 'Access-Control-Allow-Origin': '*' },

    //proxy is required in order to make api calls to express server while using hot-reload webpack server routes api fetch requests from localhost:8080/api/* (webpack dev server) to localhost:3000/api/* (where our Express server is running). In the client, I can just call to /api/whatever and it will be sent to /whatever. Set up router for everything to be /api
    proxy: {
      '/api/**': { // so all client side request to server need to be prefaced with api/
        target: 'http://localhost:3000/',
        secure: false,
      }
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      // load scss
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      // load css
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
        ],
      },
      
      {
        test: /\.(png|jpe?g|svg|gif)$/i,
        use: [
          {
            loader: "file-loader",
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  resolve: {
    // Enable importing JS / JSX files without specifying their extension in react components
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
}