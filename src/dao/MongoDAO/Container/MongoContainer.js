import mongoose from "mongoose";
import config from "../../../config/config.js";
import logger from "../../../logger/logger.winston.js";

const url = config.mongo.MONGO_URL + "";

let date = new Date();
let output = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear();

export default class MongoDBContainer{
    constructor(collection, schema){
        //Password is missing
        mongoose.connect(url)
        this.model = mongoose.model(collection, schema);
    }
    getAll = async() => {
        try {
            let objects = await this.model.find();
            return objects;
        } catch (error) {
            logger.log('error',`${output} - POST - ${error}`);
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
            logger.log('error',`${output} - POST - ${error}`);
        };
    };
    replaceObject = async(position, object) => {
        try {
            await this.model.updateOne({_id: position}, {$set: {title: object.title, price: object.price, thumbnail: object.thumbnail, descripcion: object.descripcion, code: object.code, timestamp: object.timestamp}});
        } catch (error) {
            logger.log('error',`${output} - POST - ${error}`);
        };
    };
    getById = async(object) => {
        try {
            let objects = await this.model.findOne({_id:object});
            return objects;
        } catch (error) {
            logger.log('error',`${output} - POST - ${error}`);
        };
    };
    deleteById = async(object) => {
        try {
            let objects = await this.model.deleteOne({_id:object});
            logger.log('info',`${output} - POST - File removed`);
        } catch (error) {
            logger.log('error',`${output} - POST - ${error}`);
        }
    };
}