import path from 'path';
import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import connectMongo from 'connect-mongo';

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

    console.log(`Current directory: ${process.cwd()}`);

}