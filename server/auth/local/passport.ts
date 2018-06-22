var passport = require('passport')
var passportLocal = require('passport-local')

var LocalUserStrategy = passportLocal.Strategy;

function localAuthenticate(User, email, password, done) {
  User.findOne({ email: email }, function(err, user) {
    if (err) { return done(err); }
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    return done(null, user);
  });


  // User.findOne({
  //   'email': username,
  //   'disabled': false
  // })
  // .exec()
  //   .then(user => {
  //     if(!user) {
  //       return done(null, false, {
  //         message: 'Incorrect username/email and password.', 
  //         code: 410
  //       });
  //     }
  //     else {
  //       return done(null, user);
  //     }
  //     // user.authenticate(password, function(authError, authenticated) {
  //     //   if(authError) {
  //     //     // return done(authError);
  //     //     return done({message: 'Incorrect username/email and password.', code: 410});
  //     //   }
  //     //   if(!authenticated) {
  //     //     return done(null, false, { message: 'Incorrect username/email and password.', code: 410 });
  //     //   } else {
  //     //     return done(null, user);
  //     //   }
  //     // });
  //   })
 
  //   .catch(err => done(err));
}

export function setup(User/*, config*/) {
  passport.use('local.user', new LocalUserStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, function(email, password, done) {
    return localAuthenticate(User, email, password, done);
  }));
}