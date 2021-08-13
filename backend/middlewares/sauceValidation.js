const validate = require('mongoose-validator');

exports.nameValidator = [
  validate({
    validator: 'isLength',
    arguments: [3, 50],
    message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters',
  }),
  validate({
    validator: 'matches',
    arguments: /^[a-zA-Z0-9 -]+$/,
    message: "Vous ne pouvez utiliser que des chiffres et des lettres",
  }),
];

exports.manufacturerValidator = [
  validate({
    validator: 'isLength',
    arguments: [3, 50],
    message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters',
  }),
  validate({
    validator: 'matches',
    arguments: /^[a-zA-Z0-9 -]+$/,
    message: "Vous ne pouvez utiliser que des chiffres et des lettres",
  }),
];

exports.descriptionValidator = [
  validate({
    validator: 'isLength',
    arguments: [3],
    message: 'Name should be between {ARGS[0]} characters',
  }),
];

exports.pepperValidator = [
  validate({
    validator: 'isLength',
    arguments: [3, 50],
    message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters',
  }),
  validate({
    validator: 'matches',
    arguments: /^[a-zA-Z0-9 -]+$/,
    message: "Vous ne pouvez utiliser que des chiffres et des lettres",
  }),
];
