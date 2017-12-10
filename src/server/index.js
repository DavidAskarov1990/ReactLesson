import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import webpack from 'webpack';
import config from "../../webpack/webpack.config.dev.js";
import secrets from "./config/secret";
import configuretePassport from './config/passport';
import configureteExpress from './config/express';
import roters from './router';

const app = express();
const isDev = process.env.NODE_ENV === "development";

const connect = () => {
    mongoose.connect(secrets.db, (err, res) => {
        if(err) {
            console.log(`Error connecting to ${secrets.db}. ${err}`)
        } else {
            console.log(`Successfully connected to ${secrets.db}.`)
        }
    })
};

/**
 * Подключение БД
 */
connect();

mongoose.connection.on("error", console.error);
mongoose.connection.on("disconnected", connect);

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

configuretePassport(app, passport);
configureteExpress(app, passport);

/**
 * Api request
 */
roters(app);

app.get("*", (req, res, next) => {
    const minified = process.env.MIN_EXT || "";
    const appHTML =
        `<!doctype html>
	<html lang="">
	<head>
		<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
		<title>Lesson React</title>
	</head>
	<body>
		<div id="app"></div>
		<script src="/assets/app${minified}.js"></script>
	</body>
	</html>`
    res.status(200).end(appHTML)
});

/**
 * Запуск Сервера
 */
app.listen(app.get("port"), app.get("host"), (err) => {
    if(err) {
        console.err(err.stack)
    } else {
        console.log(`App listening on port ${app.get("port")} [${process.env.NODE_ENV} mode]`)
    }
});


