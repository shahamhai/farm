const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    //toDo get user by id
    done(null, user.id);
});

passport.use(new LocalStrategy(
  (username, password, done) => {
      //toDo query user by name
      
      //toDo if user not found return done(null, false, { message: 'Incorrect username.' });
      
      //toDo if incorrect password return done(null, false, { message: 'Incorrect password.' });
      
      //toDo if valid return done(null, user);
      
      //mongo implamentation 
    // User.findOne({ username: username }, function(err, user) {
    //   if (err) { return done(err); }
    //   if (!user) {
    //     return done(null, false, { message: 'Incorrect username.' });
    //   }
    //   if (!user.validPassword(password)) {
    //     return done(null, false, { message: 'Incorrect password.' });
    //   }
    //   return done(null, user);
    // });
  }
));