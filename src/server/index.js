import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import webpack from 'webpack';
import config from "../../webpack/webpack.config.dev.js";

const app = express();

const isDev = process.env.NODE_ENV === "development";

/**
 * Только для режима разработки и перекомпиляции
 * */
if(isDev) {
    const compiler = webpack(config);
    app.use(require("webpack-dev-middleware")(compiler, {
        noInfo: true,
        publicPath: config.output.publicPath
    }));
    app.use(require("webpack-hot-middleware")(compiler))
}


