import Joi from "joi";
export const registerSchema = Joi.object({
  fullName: Joi.string().required(),
  userName: Joi.string().required(),
  password: Joi.string().min(4).required(),
  confirmPassword: Joi.string().min(4).required(),
  gender: Joi.string().required(),
});

export const loginSchema = Joi.object({
  userName: Joi.string().required(),
  password: Joi.string().required(),
});
