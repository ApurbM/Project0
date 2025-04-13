const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const LoginUser = require('./LoginUser');

function initialize(passport) {
  passport.use(
    new LocalStrategy(
      
      async (username, password, done) => {
        try {
          const user = await LoginUser.findOne({ username });
          if (!user)
            return done(null, false, {
              message: 'We don’t have the given user in database'
            });

          const match = await bcrypt.compare(password, user.password);
          if (!match)
            return done(null, false, {
              message: "Password doesn't match"
            });

          return done(null, user);
        } catch (err) {
            console.log(err);
          return done(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id); // Save user ID in session
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await LoginUser.findById(id);
      done(null, user); // Set `req.user`
    } catch (err) {
      done(err, null);
    }
  });
}






module.exports = initialize;
