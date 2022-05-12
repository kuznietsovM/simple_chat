const { celebrate, Joi, Segments } = require('celebrate');

const loginValidation = celebrate({
    [Segments.BODY]: Joi.object({
        email: Joi.string().
            email().
            required(),

        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    })
});

module.exports = {
    loginValidation,
};