import * as Joi from 'joi';
import { createValidator } from 'express-joi-validation';

const validator = createValidator();
const querySchema = Joi.object({
    id: Joi.string().required(),
    login: Joi.string().min(1).required(),
    password: Joi.string().alphanum().required(),
    age: Joi.number().min(4).max(130).required(),
    isDeleted: Joi.boolean().required()
});

export function validateReqBody() {
    return validator.body(querySchema);
}
