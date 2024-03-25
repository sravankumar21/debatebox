import passport from 'passport';
import passportLocal from 'passport-local';
import passportJWT from 'passport-jwt';
import Role from '../models/userModel.mjs';

const LocalStrategy = passportLocal.Strategy;
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

// Local strategy for username/password authentication
passport.use(
  'local',
  new LocalStrategy(
    {
      usernameField: 'email', // Assuming your username field is 'email'
      passwordField: 'password',
    },
    async (email, password, cb) => {
      try {
        const role = await Role.findOne({ email }).exec();

        if (!role) {
          return cb(null, false, { message: 'Invalid credentials' });
        }

        role.comparePassword(password, (err, isMatch) => {
          if (err) return cb(err);
          if (!isMatch) return cb(null, false, { message: 'Invalid credentials' });

          return cb(null, role, { message: 'Login successful' });
        });
      } catch (err) {
        return cb(err);
      }
    }
  )
);

// JWT strategy for token authentication
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secret', // Change this to your secret key
    },
    (jwtPayload, cb) => {
      return Role.findById(jwtPayload.sub)
        .then(role => {
          return cb(null, role);
        })
        .catch(err => {
          return cb(err);
        });
    }
  )
);

export default passport;
