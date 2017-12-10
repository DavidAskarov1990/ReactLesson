import users from '../controllers/users';

export default function (app) {
    /**
     * User operation
     */
    app.get("/logout", users.logout);

    app.post("/login", users.login);
    app.post("/register", users.register);
}