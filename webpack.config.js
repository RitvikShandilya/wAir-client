var path = require('path')
var webpack = require('webpack')

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'build.js'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'css-loader'
            },
            {
                test: /\.html$/,
                loader: 'file?name=[name].[ext]'
            }
        ],
        rules: [
            {
                test: /\.css$/,
                use: [ 'css-loader' ]
            },
            {
                test: /\.vue$/,
                use: {
                    loader: 'vue-loader'
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue', '.json', '.css'],
        modules: [path.resolve(__dirname, './node_modules')],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    resolveLoader: {
        modules: [path.join(__dirname, './node_modules')]
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurrenceOrderPlugin()
    ])
}
