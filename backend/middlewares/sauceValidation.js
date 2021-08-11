const validate = require('mongoose-validator');

exports.nameValidator = [
  validate({
    validator: 'isLength',
    arguments: [15, 60],
    message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters',
  }),
  validate({
    validator: 'matches',
    arguments: /^[a-z\d\-_\s]+$/i,
    message: "Vous ne pouvez utiliser que des chiffres et des lettres",
  }),
];