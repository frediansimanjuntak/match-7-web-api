"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var passport = require('passport');
var passportLocal = require('passport-local');
var LocalUserStrategy = passportLocal.Strategy;
function localAuthenticate(User, username, password, done) {
    User.findOne({
        $or: [
            { username: username.toLowerCase() },
            { email: username.toLowerCase() }
        ],
        disabled: false
    })
        .select('+password')
        .exec()
        .then(function (user) {
        if (!user) {
            return done(null, false, {
                message: 'Incorrect username/email and password.',
                code: 410
            });
        }
        user.authenticate(password, function (authError, authenticated) {
            if (authError) {
                // return done(authError);
                return done({ message: 'Incorrect username/email and password.', code: 410 });
            }
            if (!authenticated) {
                return done(null, false, { message: 'Incorrect username/email and password.', code: 410 });
            }
            else {
                return done(null, user);
            }
        });
    })
        .catch(function (err) { return done(err); });
}
function setup(User /*, config*/) {
    passport.use('local.user', new LocalUserStrategy({
        usernameField: 'username',
        passwordField: 'password' // this is the virtual field on the model
    }, function (username, password, done) {
        return localAuthenticate(User, username, password, done);
    }));
}
exports.setup = setup;
//# sourceMappingURL=passport.js.map