const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        username: {type: String, required: true, unique: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        first_name: {type: String, required: true},
        last_name: {type: String, required: true}
    },
    {timestamps: true}
);

module.exports = mongoose.model("UserModel", UserSchema);