import Joi from 'joi';
const profileSchema = Joi.object({
    name: Joi.object({
      title: Joi.string().required(),
      first: Joi.string().required(),
      last: Joi.string().required()
    }).required(),
    gender: Joi.string().valid('male', 'female').required(),
    phone: Joi.string().required(),
    email: Joi.string().email().required(),
    dob: Joi.object({
      age: Joi.number().required(),
      date: Joi.string().isoDate().required()
    }).required(),
    login: Joi.object({
      uuid: Joi.string().required()
    }).required(),
    location: Joi.object({
      street: Joi.object({
        number: Joi.number().required(),
        name: Joi.string().required()
      }).required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      country: Joi.string().required()
    }).required(),
    picture: Joi.object({
      large: Joi.string().uri().required(),
      thumbnail: Joi.string().uri().required()
    }).required()
  }).options({ stripUnknown: true });;
  export default profileSchema;