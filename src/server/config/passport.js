/**
 * Created by david on 09.12.17.
 */
import User from '../model/user';
import local from './passport-strategy/local';

export default function (app, passport) {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        })
    });

    /**
     * Использование следующих стратегий
     */
    passport.use(local);
}
