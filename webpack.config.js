const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devServer: {
      inline: true,
      port: 8001
    },
    module: {
        rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: ["babel-loader"]
        }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ]
};
