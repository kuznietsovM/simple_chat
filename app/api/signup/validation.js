const { celebrate, Joi, Segments } = require('celebrate');

const createUserValidation = celebrate({
    [Segments.BODY]: Joi.object({
        email: Joi.string().
            email().
            required(),

        name: Joi.string().
            required(),

        DoB: Joi.date().
            min('1-1-1920').
            required(),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

        passwordConfirm: Joi.ref('password'),
    })
});

module.exports = {
    createUserValidation,
};