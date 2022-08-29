import mongoose from "mongoose";
import MongoDBContainerCarts from "./Container/MongoContainerCarts.js";

const collection = 'carts';
const cartsSchema = mongoose.Schema({
    timestamp: Number,
    products: [{
        product: Number,
        quantity: Number
    }],
})
export default class CartsMongo extends MongoDBContainerCarts{
    constructor(){
        super(collection, cartsSchema);
    }
};