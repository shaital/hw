import Joi from 'joi';
const profileNameSchema = Joi.object({
    name: Joi.object({
      title: Joi.string().required(),
      first: Joi.string().required(),
      last: Joi.string().required()
    }).required(),
  }).options({ stripUnknown: true });;
  export default profileNameSchema;