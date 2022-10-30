import mongoose from "mongoose";
import config from "../../../config/config.js";
import logger from "../../../logger/logger.winston.js";

const url = config.mongo.MONGO_URL + "";

let date = new Date();
let output = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear();

export default class MongoDBContainerCarts{
    constructor(collection, schema){
        //Password is missing
        mongoose.connect(url)
        this.model = mongoose.model(collection, schema);
    }
    getAll = async() => {
        try {
            let objects = await this.model.find();
            logger.log('info',`${output} - POST - ${objects}`);
            return objects;
        } catch (error) {
            logger.log('error',`${output} - POST - ${error}`);
        }
    };
    save = async(object, user) => {
        try {
            let objects = await this.model.find();
            object.timestamp = Date.now();
            object.products = [];
            object.user = user;
            let saveObject = await this.model.create(object);
            logger.log('info',`${output} - POST - ${saveObject}`);
        } catch (error) {
            logger.log('error',`${output} - POST - ${error}`);
        };
    };
    replaceObject = async(object, position, positionCart) => {
        try {
            let replace = await this.model.updateOne({_id:positionCart}, {$pull: {products: {product: position}}});
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
    getByUser = async(object) => {
        try {
            let objects = await this.model.findOne({user:object});
            return objects;
        } catch (error) {
            logger.log('error',`${output} - POST - ${error}`);
        };
    };
    deleteById = async(object) => {
        try {
            let objects = await this.model.deleteMany({_id:object});
            logger.log('info',`${output} - POST - File removed`);
        } catch (error) {
            logger.log('error',`${output} - POST - ${error}`);
        }
    };
    refresh = async(position, object) => {
        try {
            let sumId = position - 1;
            let carts = await this.model.find();
            let objects = await this.model.findOne({_id:position});
            let onlyObject = objects.products;

            let findProduct = onlyObject.map(function(x) {
                return x.product;
            });

            
            let findQuantity = onlyObject.map(function(x) {
                return x.quantity;
            });
            const resultFilter = onlyObject.filter(function (nickname) { return nickname.product == object.product });
            let quantityResult = resultFilter.map(function(x) {
                return x.quantity;
            });
            let searchProduct = findProduct.includes(object.product);

            if (searchProduct){
                await this.model.updateMany({},{$pull: {products: {product: object.product}}});
                object.quantity = parseInt(object.quantity) + parseInt(quantityResult);
                let result = findProduct.indexOf(object.product);
                let realResult = parseInt(result);
                let set = await this.model.updateOne({_id:position},{$push:{products: {$each: [{product: object.product, quantity: object.quantity}], $position: realResult}}});
            } else {
                let set = await this.model.updateOne({_id:position},{$push:{products: {$each: [{product: object.product, quantity: object.quantity}]}}});
            }
        } catch (error) {
            logger.log('error',`${output} - POST - ${error}`);
        };
    };
    showProducts = async(position) => {
        try {
            let objects = await this.model.findOne({_id:position});
            let onlyObject = objects.products;
            let findProduct = onlyObject.map(function(x) {
                return x.product;
            });            

            return findProduct;
        } catch (error) {
            logger.log('error',`${output} - POST - ${error}`);
        };
    };
    showQuantity = async(position) => {
        try {
            let objects = await this.model.findOne({_id:position});
            let onlyObject = objects.products;
            let findQuantity = onlyObject.map(function(x) {
                return x.quantity;
            });        

            return findQuantity;
        } catch (error) {
            logger.log('error',`${output} - POST - ${error}`);
        };
    };
}