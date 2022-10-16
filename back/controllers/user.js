const User = require('../schemas/user/userSchema');
const passport = require('passport');

const chHead = async function (req, res, next) {
  req.headers['csrf-token'] = req.body.csrf;
  next()
}

const registerUser = async function (req, res) {

  const { first_name, last_name, password, email } = req.body;

  const user = new User({
    first_name,
    last_name,
    password,
    email,
  });
  if (req.file) {
    const { path } = req.file;
    user.image = path
  };

  try {
    await user.save(function (e) {
      if (e.name === "ValidationError") {
        let errors = {};
  
        Object.keys(e.errors).forEach((key) => {
          errors[key] = e.errors[key].message;
        });
        return res.status(400).send(errors);
      }


      if (e) {
        console.log(e)
        res.status(504).send('something get bad');
        return;
      }
      res.status(201).send();
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
  console.log(req.body)
  passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err); } //error exception

      // user will be set to false, if not authenticated
      if (!user) {
          res.status(401).json(info); //info contains the error message
      } else {
          // if user authenticated maintain the session
          req.logIn(user, function() {
              data = {
                username: user.username,
                email: user.email,
                fulname: user.first_name +user.last_name
              }
              console.log(req.session)
              res.send(data);
              // do whatever here on successful login
          })
      }    
  })(req, res, next);
}
const me = (req,res)=>{
  console.log(req.session);
  console.log(req.cookie)
  res.status(200).send();
}
module.exports = {
  me,
  passportLogin,
  logOut,
  registerUser,
  chHead,
};
