import mongoose from "mongoose";
import MongoDBContainer from "./Container/MongoContainer.js";

const collection = 'products';
const productSchema = mongoose.Schema({
    title: String,
    price: Number,
    thumbnail: String,
    descripcion: String,
    code: Number,
    _id: Number,
    timestamp: Number
})
export default class ProductsMongo extends MongoDBContainer{
    constructor(){
        super(collection, productSchema);
    }
};