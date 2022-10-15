const User = require('../schemas/user/userSchema');
const passport = require('passport');

const chHead = async function (req, res, next) {
  req.headers['csrf-token'] = req.body.csrf;
  next()
}

const registerUser = async function (req, res) {

  const { first_name, last_name, password, email, telephone, DofB, gender, username } = req.body;

  const user = new User({
    first_name,
    last_name,
    username,
    password,
    email,
    telephone,
    DofB,
    gender
  });
  if (req.file) {
    const { path } = req.file;
    user.image = path
  };

  try {
    await user.save(function (e) {
      if (e) {
        console.log(e)
        res.redirect('/signup');
        return;
      }
      res.redirect('/signin');
    });
  }
  catch (e) {
    console.log(e)
  }
};
const logOut = function (req, res) {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/signin');
  });
}
const passportLogin = function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err); } //error exception

      // user will be set to false, if not authenticated
      if (!user) {
          res.status(401).json(info); //info contains the error message
      } else {
          // if user authenticated maintain the session
          req.logIn(user, function() {
              res.redirect('/');
              // do whatever here on successful login
          })
      }    
  })(req, res, next);
}
module.exports = {
  passportLogin,
  logOut,
  registerUser,
  chHead,
};
