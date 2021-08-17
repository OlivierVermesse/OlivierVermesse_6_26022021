const validate = require('mongoose-validator');

exports.nameValidator = [
  validate({
    validator: 'isLength',
    arguments: [3, 50],
    message: "Le nom doit etre compris entre {ARGS[0]} et {ARGS[1]} caractères",
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
    message: "Le nom doit etre compris entre {ARGS[0]} et {ARGS[1]} caractères",
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
    message: "La description est au moins faire {ARGS[0]} caractères",
  }),
  validate({
    validator: 'matches',
    arguments: /^[a-zA-Z0-9 \]\[!"#$%&'()*+,./:;<>?@\^_`{|}~-]+$/,
    message: "Vous ne pouvez pas utiliser certains caractères spéciaux",
  }),
];

exports.pepperValidator = [
  validate({
    validator: 'isLength',
    arguments: [3, 50],
    message: "Vous ne pouvez utiliser que des chiffres et des lettres",
  }),
  validate({
    validator: 'matches',
    arguments: /^[a-zA-Z0-9 -]+$/,
    message: "Vous ne pouvez utiliser que des chiffres et des lettres",
  }),
];
