// const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;

module.exports = function (passport) {

    passport.serializeUser((user, done) => {
        console.log("Teste1Teste1");
        done(null, user.idUsu);
    });

    passport.deserializeUser(async (id, done) => {
        console.log("Teste1Teste1Teste1Teste1")
        console.log("id: ", id)
        try {
            const db = require('./db');
            const user = await db.findUserById(id);
            console.log("usário: ",user);
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });

    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
        async (username, password, done) => {
            console.log("Teste1Teste1Teste1Teste1Teste1")
            try {
                const db = require('./db');
                const user = await db.findUser(username);
                console.log("user: ",user);
                console.log("username: ",username);
                console.log("PW: ", password)
                // usuário inexistente
                if (!user) { return done(null, false) }

                // comparando as senhas
                // const isValid = bcrypt.compareSync(password, user.password);
                const isValid = password === user.password;
                if (!isValid) return done(null, false)
                
                return done(null, user)
            } catch (err) {
                done(err, false);
            }
        }
    ));
}