import path from 'path';
import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import connectMongo from 'connect-mongo';
import secret from './secret';

const MongoStore = connectMongo(session);

export default function (app, passport) {
    app.set("port", 3000);
    app.set("host", "localhost");

     /**
     *  Заголовок X-Powered-By не имеет функционального значения.
     *   Сохранение этого облегчает для хакера создание профиля сайта
     *   Это можно безопасно удалить
     */
    app.disable("x-powered-by");

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    /**
     * process.cwd() - возвращает текущий рабочий каталог
     * */
    app.use(express.static(path.join(process.cwd(), 'public')));

    const sess = {
        resave: true,
        saveUninitialized: true,
        secret: secret.sessionSecret,
        proxy: false,
        name: "sessionId",
        cookie: {
            httpOnly: true,
                secure: false
        },
        store: new MongoStore({
            url: secret.db,
            autoReconnect: true
        })
    };

    var node_env = process.env.NODE_ENV;
    console.log('Start express server ::: environment ==> ', node_env);
    if(node_env === 'production') {
        /**
         *  Теперь нужно только HTTPS соединение
         */
        sess.cookie.secure = true; // Serve secure cookies
    }

    app.use(session(sess));
    app.use(passport.initialize());
    app.use(passport.session());
}