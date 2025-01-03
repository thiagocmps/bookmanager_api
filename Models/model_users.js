const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: { type: String, default: 'user' }
});

const Users = mongoose.model('Users', userSchema);

module.exports = Users;