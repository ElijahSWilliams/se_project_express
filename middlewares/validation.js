//Validation
const { Joi, celebrate } = require("celebrate");

const validator = require("validator");

//function to validate avatar and images
const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const validateClothing = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }), //name validation
    imageUrl: Joi.string().required().custom(validateURL).messages({
      //use validUrl for images
      "string.empty": 'The "imageUrl" field must be filled out',
      "string.uri": 'the "imageUrl" field must be a valid url ',
    }), //url validation
  }),
});

const validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    imageUrl: Joi.string().required().custom(validateURL).messages({
      //use validUrl for images
      "string.empty": 'The "imageUrl" field must be filled out',
      "string.uri": 'the "imageUrl" field must be a valid url ',
    }), //required url
    email: Joi.string().required().email(),
    password: Joi.string().required(), //password is a required string
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(), // password is a required string
  }),
});

const validateID = celebrate({
  //validate Id params
  params: Joi.object().keys({
    postId: Joi.string().hex().length(24), //hexadecimal ID
  }),
});

module.exports = {
  validateClothing,
  validateUser,
  validateLogin,
  validateID,
};
