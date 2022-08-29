import mongoose from "mongoose";

export default class MongoDBContainer{
    constructor(collection, schema){
        mongoose.connect('mongodb://127.0.0.1/ecommerceDB')
        this.model = mongoose.model(collection, schema);
    }
    getAll = async() => {
        try {
            let objects = await this.model.find();
            return objects;
        } catch (error) {
            console.log(error);
        }
    };
    save = async(object) => {
        try {
            let objects = await this.model.find();
            let randomCalculator = Date.now();
            let random = Math.round(Math.random()*randomCalculator);
            if (objects.length === 0) {
                object._id = 1;
                object.code = random;
                object.timestamp = Date.now();
                await this.model.create(object);
            } else {
                object._id = objects.length + 1;
                object.code = random;
                object.timestamp = Date.now();
                await this.model.create(object);
            };
        } catch (error) {
            console.log(error)
        };
    };
    replaceObject = async(position, object) => {
        try {
            await this.model.updateOne({_id: position}, {$set: {title: object.title, price: object.price, thumbnail: object.thumbnail, descripcion: object.descripcion, code: object.code, timestamp: object.timestamp}});
        } catch (error) {
            console.log(error)
        };
    };
    getById = async(object) => {
        try {
            let objects = await this.model.findOne({_id:object});
            return objects;
        } catch (error) {
            console.log(error)
        };
    };
    deleteById = async(object) => {
        try {
            let objects = await this.model.deleteOne({_id:object});
            console.log('File removed');
        } catch (error) {
            console.log(error)
        }
    };
}