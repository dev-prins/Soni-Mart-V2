const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    uid: { type: String, required: true }, // Firebase UID
    name: String,
    phone: String,
    email: String
});

module.exports = mongoose.model('User', userSchema);
