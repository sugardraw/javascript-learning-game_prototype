var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
    entry: path.join(__dirname, 'src', 'js', 'public', 'src/scss', 'src/images'),
    output: {
        path: path.join(__dirname, '/public'),
        filename: 'main.js',
    },
    resolve: {
        modules: [__dirname, 'node_modules'],
        extensions: ['.js'],
        enforceExtension: false,
    },
    watch: true,
    devtool: "source-map",

    devServer: {
        contentBase: path.join(__dirname, './public/'), //serve your static files from here
        historyApiFallback: true,
        progress: true,
        publicPath: 'public',
        inline: true,
        hot: true,
        host: 'localhost',
        port: '8080',
        watchContentBase: true,
        compress: true,
        open: true, // Here
        openPage: 'index.html', // And here
        index: 'index.html'
    },

    module: {
        rules: [
            /*
                     your other rules for JavaScript transpiling go in here
                     */
            { // css / sass / scss loader for webpack
                test: /\.(css|sass|scss)$/,
                exclude: [
                    path.resolve(__dirname, "node-modules")
                ],
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                // If you are having trouble with urls not resolving add this setting.
                                // See https://github.com/webpack-contrib/css-loader#url
                                url: true,
                                minimize: true,
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            },
            {
                test: /\.svg/,
                use: {
                    loader: 'svg-url-loader',
                    options: {}
                }
            },
            {
                test: /\.(gif|png|jpe?g)/i,

                use: [
                    "file-loader",
                    {
                        loader: "image-webpack-loader",
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            optipng: {
                                optimizationLevel: 7
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            }

                        }
                    }
                ]
            }


        ]
    },
    plugins: [
        new ExtractTextPlugin({ // define where to save the file
            filename: '../styles/style.css',
            allChunks: true,
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new LiveReloadPlugin()
    ],
};