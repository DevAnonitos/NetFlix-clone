import { validatorResult } from "express-validator "

const validate = (req, res, next) => {
    const errors = validatorResult(req);

    if(!errors.isEmpty())
        return res.status(400).json(errors.array()[0].msg);

    res.setHeader('X-Status-Code', res.statusCode);
    next();
};

export default { validate };
