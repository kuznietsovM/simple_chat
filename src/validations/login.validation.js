const { celebrate, Joi, Segments } = require('celebrate');

const scheme = Joi.object({
        email: Joi.string().
            email().
            required(),

        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    });

const apiValidator = celebrate({
    [Segments.BODY]: scheme
});

const appValidator = (req, res, next) => {
    const { body } = req;
    req.validation = scheme.validate(body);
    next();
};

module.exports = {
    scheme,
    apiValidator,
    appValidator
};