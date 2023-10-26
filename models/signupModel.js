const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
 name: {
    type: String,
    required: true
 },
 email: {
    type: String,
    required: true,
    unique: true
 },
 password: {
    type: String,
    required: true
 },
 role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
 }
});

// UserSchema.pre('save', async function (next) {
//  const user = this;

//  // only hash the password if it has been modified (or is new)
//  if (!user.isModified('password')) return next();

//  try {
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(user.password, salt);
//     user.password = hashedPassword;
//     next();
//  } catch (error) {
//     next(error);
//  }
// });

// UserSchema.methods.comparePassword = function (candidatePassword) {
//  return bcrypt.compare(candidatePassword, this.password);
// };

const User = mongoose.model('User', UserSchema);
module.exports = User;