
const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const thingSchema = new mongoose.Schema({
    title:{type:String, minlength:3, maxlength:50, required:true},
    description:{type:String, maxlength:1024, required:true},
    imageUrl:{type:String, required:true},
    price:{type:Number, required:true},
    userId:{type:String, required:true}
});

const Thing = mongoose.model('Thing', thingSchema);

const validateThing = thing => {
    const schema = Joi.object().keys({
        title:Joi.string().min(3).max(50).required(),
        description:Joi.string().max(1024).required(),
        imageUrl:Joi.string().required(),
        price:Joi.number().required(),
        userId:Joi.string().required()
    });
    return Joi.validate(thing, schema);
}

module.exports.Thing = Thing;
module.exports.validate = validateThing;