import Joi from 'joi';
import { isValidObjectId } from 'mongoose';

export const createStudentSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  age: Joi.number().integer().min(6).max(99).required(),
  gender: Joi.string().valid('male', 'female').required(),
  avgMark: Joi.number().min(2).max(12).required(),
  onDuty: Joi.boolean(),
  parentId: Joi.string().custom((value, helper) => {
    if (value && !isValidObjectId(value)) {
      return helper.message('Parent id должен быть валидным mongo id');
    }
    return true;
  }),
  photo: Joi.string,
});
export const updateStudentSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email(),
  age: Joi.number().integer(),
  gender: Joi.string().valid('male', 'female'),
  avgMark: Joi.number().min(2).max(12),
  onDuty: Joi.boolean(),
  photo: Joi.string,
});
