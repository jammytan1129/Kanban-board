var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

const RegisterUseCase = require('../usecase/registerUseCase');
const Usergateway = require('../gateway/user/userGateway');

passport.use(new LocalStrategy(
    {usernameField:"email", passwordField:"password"},
    async function(email, password, done) {
        let registerUseCase = new RegisterUseCase();
        registerUseCase.setUserGateway(new Usergateway);

        let user = await registerUseCase.findUserByEmail(email);

        if (user == null)
            return done(null, false, { message: 'Incorrect Email.' });
        
        if (user.password != password)
            return done(null, false, { message: 'Incorrect password.' });
        return done(null, user);
    }
));

passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    RegisterUseCase
      .findUserById(id)
      .then(user => {
          done(null, user);
      });
});
  









