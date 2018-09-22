const path = require('path');
const webpack = require('webpack');

let config = {
    devtool: 'none',
    output: {
        path: path.resolve(__dirname, 'docs'),
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                exclude: /node_modules/,
                use: {
                    loader: "vue-loader"
                }
            },
            {
                test: /\.(s)?[a|c]ss$/,
                use: {
                    loader: 'style!css!sass'
                }
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'assets/fonts/'
                    }
                }]
            }
        ]
    },
    devServer: {
        contentBase: 'docs',
        historyApiFallback: true
    }
};

// console.log(process.env.NODE_ENV);

// if (process.env.NODE_ENV === 'production') {
//     config = Object.assign(config, {
//         optimization: {
//             minimize: true
//         }
//     })
// }

module.exports = config;