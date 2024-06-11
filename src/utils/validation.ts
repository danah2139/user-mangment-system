import Joi from 'joi';

// User registration validation schema
const registerSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().min(6).pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required(),
});

// User login validation schema
const loginSchema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().min(6).pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required(),
});

// Function to validate registration data
export const validateRegister = (data: any) => {
    return registerSchema.validate(data);
};

// Function to validate login data
export const validateLogin = (data: any) => {
    return loginSchema.validate(data);
};