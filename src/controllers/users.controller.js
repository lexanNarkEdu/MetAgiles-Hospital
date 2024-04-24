const usersCtrl = {};

// Models
const User = require('../models/User');

// Modules
const passport = require("passport");

// Renderizar la vista del REGISTRO
usersCtrl.renderSignUpForm = (req, res) => {
  res.render('users/signup');
};

usersCtrl.singup = async (req, res) => {
  let errors = [];
  const { name, email, password, confirm_password } = req.body;
  if (password != confirm_password) {
    errors.push({ text: "Las Contraseñas no coinciden." });
  }
  if (password.length < 4) {
    errors.push({ text: "Passwords must be at least 4 characters." });
  }
  if (errors.length > 0) {
    res.render("users/signup", {
      errors,
      name,// Le volvemos a enviar toda la data que escribio el "user" para que no la vuelva a escribir
      email,
      password,
      confirm_password
    });
  } else {
    // Look for email coincidence
    const emailUser = await User.findOne({ email: email });
    if (emailUser) {
      req.flash("error_msg", "The Email is already in use.");
      res.redirect("/users/signup");
    } else {
      // Saving a New User
      const newUser = new User({ name, email, password });
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash("success_msg", "You are registered.");
      res.redirect("/users/signin");
    }
  }
};

// Renderizar la vista del LOGIN
usersCtrl.renderSigninForm = (req, res) => {
  res.render("users/signin",{
    style: 'formLogin.css', // NO OLVIDAR el ".css"
  });
};

// Para mantenerme logueado en cualquier parte de la pagina
// Lo realizo en "config/passport" es una estrategy que sera usado en muchos lados por eso se exxxx
usersCtrl.signin = passport.authenticate("local", {
    successRedirect: "/turnos", // Cuando todo valla bien
    failureRedirect: "/users/signin", // Cuando falle algo
    failureFlash: true  // Cuando exista un error usar flash
  });

usersCtrl.logout = (req, res) => {
  req.logout();// function de "passport" que me permite borrar la session
  req.flash("success_msg", "Tu session expiro.");
  res.redirect("/users/signin");
};

module.exports = usersCtrl;