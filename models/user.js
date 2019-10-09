
const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
    username:{type:String, minlength:3, maxlength:20, required:true},
    email:{type:String, minlength:3, maxlength:255, required:true, unique:true},
    password:{type:String, maxlength: 1024, required:true}
});
userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id}, config.get('jwtPrivateKey'));
    return token;
}
const User = mongoose.model('User', userSchema);

const validateUser = user => {
    const schema = Joi.object().keys({
        username:Joi.string().min(3).max(20).required(),
        email:Joi.string().min(3).max(255).required(),
        password:Joi.string().max(1024).required()
    });
    return Joi.validate(user, schema);
}

module.exports.User = User;
module.exports.validate = validateUser;