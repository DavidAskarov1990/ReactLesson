const path = require("path");
const webpack = require("webpack");
const assetsPath = path.join(__dirname, "..", "public", "assets");
const publicPath = "/assets/";

module.exports = {
    name: "browser",
    devtool: "eval",
    context: path.join(__dirname, "..", "src", "client"),
    entry: {
        app: [
            "./client",

            /**
             * Служит для watch на стороне сервера, без изпользования webpack-dev-server.
             */
            "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true"
        ]
    },
    output: {
        path: assetsPath,
        filename: "[name].js",
        /**
         * Указываем разрешенный путь для загрузки файлов, изображений
         * */
        publicPath: publicPath
    },
    module: {
        loaders: [
            {
                test: /.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                include: [
                    path.resolve(__dirname, '../src')
                ],
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.jsx?/,
                loader: "babel",
                exclude: /node_modules/,
                query: {
                    presets: ['react-hmre']
                }
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    resolve: {
        /**
         * Разрешения которые будут
         * */
        extensions: ["", ".js", ".jsx", ".json", ".scss"],
        modulesDirectories: [
            'src', 'node_modules'
        ]
    },
    plugins: [
        /**
         * Плагин для  webpack-hot-middleware.
         * */
        new webpack.HotModuleReplacementPlugin(),

        /**
         *  Плагин которые не обваливает webpack при компиляции в случае ошибки в коде
         * */
        new webpack.NoEmitOnErrorsPlugin(),

        /**
         * Плагин который создает глобальные переменные, которые в процессе работы могут быть изменены
         * */
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("development")
            }
        })
    ]
};

