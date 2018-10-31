var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;


const GatewayFactory = require('../gateway/gatewayFactory');

passport.use(new LocalStrategy(
    {usernameField:"username", passwordField:"password"},
    async function(username, password, done) {
        let userGateway = GatewayFactory.createUserGateway();

        let user = await userGateway.find(username);
        
        if (user == null) 
            return done(null, false, { message: 'Incorrect Email.' });
        
        let isMatch = await userGateway.createComparePromise(password, user.password());

        if (!isMatch) 
            return done(null, false, { message: 'Incorrect password.' });
    
        return done(null, user);
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id());
});

passport.deserializeUser(function(id, done) {
    done(null, id);
});
  









