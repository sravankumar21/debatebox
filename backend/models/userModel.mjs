import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const RoleSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true // Ensure email uniqueness
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'user', // Set default role to 'user'
    required: true,
    enum: ['admin', 'user'], // Change 'student' to 'user' for consistency
  },
  username: {
    type: String,
    required: true, // Ensure username is required
  },
});

// Hash password before saving
RoleSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  bcrypt.hash(this.password, 10, (err, hashedPassword) => {
    if (err) return next(err);
    this.password = hashedPassword;
    return next();
  });
});

// Method to compare passwords
RoleSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) return cb(err);
    if (!isMatch) return cb(null, false);
    return cb(null, this);
  });
};

export default mongoose.model('Role', RoleSchema);
