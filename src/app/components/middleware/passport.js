const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const jwtConfig = require('./../../../configs/jwt');
const users = require('./../models/user');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtConfig.key,
}

module.exports = passport => {
  passport.use(
    new JwtStrategy(options, async (payload, cb) => {
      try {
        const user = await users.findOne({ _id: payload._id }).select('email _id');

        if (user) {
          cb(null, user);
        } else {
          cb(null, false);
        }
      } catch (error) {
        return error;
      }
    })
  )
}