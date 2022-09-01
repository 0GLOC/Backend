import mongoose from "mongoose";

export default class MongoDBContainerCarts{
    constructor(collection, schema){
        //Password is missing
        mongoose.connect('mongodb+srv://0GLOC:(password)@ecommerce.ampswjk.mongodb.net/ecommerceDB')
        this.model = mongoose.model(collection, schema);
    }
    getAll = async() => {
        try {
            let objects = await this.model.find();
            console.log(objects)
            return objects;
        } catch (error) {
            console.log(error);
        }
    };
    save = async(object) => {
        try {
            let objects = await this.model.find();
            object.timestamp = Date.now();
            object.products = [];
            let saveObject = await this.model.create(object);

        } catch (error) {
            console.log(error)
        };
    };
    replaceObject = async(object, position, positionCart) => {
        try {
            let replace = await this.model.updateOne({}, {$pull: {products: {product: position}}});
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
            let objects = await this.model.deleteMany({_id:object});
            console.log('File removed');
        } catch (error) {
            console.log(error)
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
            console.log(error)
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
            console.log(error)
        };
    };
}