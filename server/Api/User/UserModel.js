const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserModelSchema = new Schema({
  userId: { type: String, default: '', unique: true },
  profilePicture: { type: String, default: '' },
  name: { type: String, default: '' },
  createdOn: { type: String, default: new Date().toISOString() },
  lastUpdatedOn: { type: String, default: new Date().toISOString() },
  email: { type: String, default: '' }
});

module.exports = mongoose.model('UserModel', UserModelSchema);
