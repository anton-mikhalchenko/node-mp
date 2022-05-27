import * as Joi from 'joi';
import { createValidator } from 'express-joi-validation';

const validator = createValidator({ passError: true });
const querySchema = Joi.object({
    login: Joi.string().min(1).required(),
    password: Joi.string().alphanum().required(),
    age: Joi.number().min(4).max(130).required(),
    isDeleted: Joi.boolean()
});

export function validateReqBody() {
    return validator.body(querySchema);
}
