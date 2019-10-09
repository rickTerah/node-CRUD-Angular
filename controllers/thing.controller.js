const { Thing, validate } = require('../models/thing');

class ThingController {
    static async getAllThings (req, res) {
        const things = await Thing.find();
        res.status(200).json(things);
    }

    static async getSingleThing (req, res) {
        const thing = await Thing.findById(req.params.id);
        if (!thing) return res.status(404).send('Invalid thing ID');
    
        res.status(200).json(thing);
    }

    static async addOneThing (req, res){
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
    
        const thing = new Thing({
            title:req.body.title,
            description:req.body.description,
            imageUrl:req.body.imageUrl,
            price:req.body.price,
            userId:req.body.userId,
        });
        await thing.save();
        res.status(201).json({message:'Thing created Successfully.'});
    }

    static async updateSingleThing (req, res){
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
    
        const thing = await Thing.updateOne({_id:req.params.id}, {
            $set:{
                title:req.body.title,
                description:req.body.description,
                imageUrl:req.body.imageUrl,
                price:req.body.price,
                userId:req.body.userId,
            }
        });
        if (!thing) return res.status(404).send('Invalid thing ID');
        res.status(201).json({message:'Thing successfully updated.'});
    }

    static async deleteSingleThing (req, res){
        const thing = await Thing.findByIdAndRemove(req.params.id);
        if (!thing) return res.status(404).send('Invalid thing ID');
    
        res.status(204).json({message:'Thing successfully deleted'});
    }
}

module.exports = ThingController;