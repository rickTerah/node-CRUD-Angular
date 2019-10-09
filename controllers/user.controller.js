const { User, validate} = require('../models/user');
const bcrypt = require('bcrypt');

class UserController {
    static async registerUser(req, res){
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.detail[0].message);
    
        let user = await User.findOne({email:req.body.email});
        if (user) return res.status(400).json({message:'User is already registered'});
    
        user = new User({
            username:req.body.username,
            email:req.body.email,
            password:req.body.password
        });
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(user.password, salt);
        user.password = hashPassword;
        await user.save();
        const token = user.generateAuthToken();
        res.status(201).header('x-auth-token', token).json({message: 'User successfully created'});
    }
}

module.exports = UserController;