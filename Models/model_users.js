const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    role: { type: String, default: 'user' } // 'user' or 'admin'
});

const Users = mongoose.model('Users', userSchema);

module.exports = Users; 