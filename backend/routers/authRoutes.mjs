import express from 'express';
import passport from 'passport';
import Role from '../models/userModel.mjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Function to sign JWT token
function signToken(userID) {
  return jwt.sign(
    {
      iss: 'moonServer',
      sub: userID,
    },
    'secret',
    { expiresIn: '28d' }
  );
}

router.get('/dashboard',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    if (req.user.role === 'admin') {
      // Allow access for admin role
      res.status(200).json({ message: 'Access granted to Admin Dashboard' });
    } else if (req.user.role === 'user') {
      // Allow access for user role
      res.status(200).json({ message: 'Access granted to User Dashboard' });
    } else {
      // Deny access for other roles
      res.status(403).json({ message: 'Access forbidden' });
    }
  }
);

router.post('/register', async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const existingRole = await Role.findOne({ email });

    if (existingRole) {
      return res.status(400).json({ msg: 'Role already exists', error: true });
    }

    const newRole = new Role({ email, password, username });

    await newRole.save();

    const token = signToken(newRole.id);

    res.cookie('access_token', token, { maxAge: 3600 * 1000, httpOnly: true, sameSite: true });

    return res.status(200).json({
      isAuthenticated: true,
      role: { email, role: newRole.role },
      error: false,
    });
  } catch (err) {
    console.error('Registration Error:', err);
    return res.status(500).json({ msg: 'Internal server error', error: true });
  }
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, role) => {
    if (err || !role) {
      console.error('Authentication failed:', err || 'Invalid credentials');
      return res.status(401).json({ msg: 'Invalid credentials', error: true });
    }

    console.log('Authentication succeeded. Role:', role);

    const { id, email, role: userRole } = role;
    const token = signToken(id);

    res.cookie('access_token', token, { maxAge: 3600 * 1000, httpOnly: true, sameSite: true });

    return res.status(200).json({ isAuthenticated: true, role: { email, role: userRole } });
  })(req, res, next);
});

router.get('/logout', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.clearCookie('access_token');
  return res.status(200).json({ success: true, role: { email: '', role: '' } });
});

export default router;
