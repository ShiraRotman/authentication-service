const User = require('../models/user')
const { defaultRole } = require('../../config')
const PassportLocalStrategy = require('passport-local').Strategy

/**
 * Return the Passport Local Strategy object.
 */
module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
  const name = (req.body && req.body.name) || ''
  const newUser = new User({
    tenant: req.headers.tenant,
    email: email.trim(),
    password: password.trim(),
    name,
    roles: [defaultRole],
  })
  newUser.save((err) => {
    if (err) {
      return done(err)
    }

    req.user = newUser
    return done(null)
  })
})
