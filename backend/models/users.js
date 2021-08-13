const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const usersSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    }
);

usersSchema.plugin(uniqueValidator); // permet d'avoir un double contole grace au module unique-validator

module.exports = mongoose.model("Users", usersSchema);