import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

// User schema
const userSchema = mongoose.Schema({
  local: {
    email: String,
    password: String
  },
  reddit: {
    id: String,
    displayName: String,
    accessToken: String,
  }
});

userSchema.methods.generateHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
}

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
}

module.exports = mongoose.model('User', userSchema);
