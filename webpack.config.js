const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
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
    // plugins: [
    //     new CopyPlugin([{
    //         from: 'src/assets',
    //         to: 'docs/assets',
    //         // flatten: true,
    //         // toType: 'file'
    //     }])
    // ],
    devServer: {
        contentBase: 'docs',
        historyApiFallback: true
    }
};