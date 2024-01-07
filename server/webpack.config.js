const path = require('path');

module.exports = {
  // Define the entry point for your server-side application
  entry: './server/server.ts', // Adjust the path according to your project structure

  // Define the output where the compiled files will be stored
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'server.bundle.js', // Output file name
  },

  // Resolve TypeScript and JavaScript files
  resolve: {
    extensions: ['.ts', '.js'],
  },

  // Define the loaders
  module: {
    rules: [
      {
        test: /\.ts$/, // Regex for TypeScript files
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      // You can add more loaders here for other types of files if needed
    ],
  },

  // Set the mode to development or production in scripts
  mode: 'development',

  // Additional settings for development
  devtool: 'inline-source-map',

  // Node settings for Webpack
  target: 'node',
};

