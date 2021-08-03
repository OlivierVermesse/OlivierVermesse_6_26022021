const mongoose = require('mongoose');
const { isEmail } = require('validator')
const uniqueValidator = require("mongoose-unique-validator");

const usersSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true, validate: [isEmail] },
    password: { type: String, required: true },
    }
);

usersSchema.plugin(uniqueValidator); // permet d'avoir un double contole grace au module unique-validator

module.exports = mongoose.model("Users", usersSchema);