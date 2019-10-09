const { User } = require('../models/user');
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');


class AuthenticationController {
    static async authenticateUser(req, res){
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.detail[0].message);

        const user = await User.findOne({email:req.body.email});
        if (!user) return res.status(400).send('Invalid email or password');

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).send('Invalid email or password');

        const token = user.generateAuthToken();
        res.send(token);
    }
}

const validate = user => {
    const schema = Joi.object().keys({
        email:Joi.string().min(3).max(255).required(),
        password:Joi.string().min(4).max(20).required()
    });
    return Joi.validate(user, schema);
}

module.exports = AuthenticationController;