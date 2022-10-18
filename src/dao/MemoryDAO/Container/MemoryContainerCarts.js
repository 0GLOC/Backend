import logger from "../../../logger/logger.winston.js";

let date = new Date();
let output = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear();

export default class MemoryContainerCarts{
    constructor(){
        this.data = []
    }
    getAll = async() => {
        try {
            return this.data;
        } catch (error) {
            console.log(error);
        }
    };
    save = async(object) => {
        try {
            let objects = await this.getAll();
            if (objects.length === 0) {
                object.id = 1;
                object.timestamp = Date.now();
                object.products = [];
                this.data.push(object);
            } else {
                object.id = objects[objects.length - 1].id + 1;
                object.timestamp = Date.now();
                object.products = [];
                this.data.push(object);
            };

        } catch (error) {
            console.log(error)
        };
    };
    replaceObject = async(object, position, positionCart) => {
        try {
            let realNumberCart = parseInt(positionCart);
            let realNumberProduct = parseInt(position);
            let sumId = realNumberCart - 1;
            let carts = await this.getAll();

            //Find product
            let CartById = await this.getById(realNumberCart);
            let objectOfArray = CartById[0];
            let productsCheck = objectOfArray.products;
            let findProduct = productsCheck.map(function(x) {
                return x.product;
            });
            let result = findProduct.indexOf(realNumberProduct);
            productsCheck.splice(result, 1,);


            //Refresh product
            carts.splice(sumId, 1, objectOfArray);
            await this.replaceProduct(carts);
        } catch (error) {
            console.log(error)
        };
    };
    replaceProduct = async(object) => {
        try {
            this.data.push(object);
        } catch (error) {
            console.log(error)
        };
    };
    getById = async(object) => {
        try {
            let objects = await this.getAll();
            const result = objects.filter(function (nickname) { return nickname.id == object });
            return result
        } catch (error) {
            console.log(error)
        };
    };
    deleteById = async(object) => {
        try {
            let realnum = object - 1;
            let objects = await this.getAll();
            const result = objects.filter(function (nickname) { return nickname.id !== object });
            objects.splice(realnum, 1,);
            logger.log('info',`${output} - POST - File removed`);
        } catch (error) {
            console.log(error)
        }
    };
    showProducts = async(position) => {
        try {
            let CartById = await this.getById(position);
            let objectOfArray = CartById[0];
            let productsCheck = objectOfArray.products;
            let findProduct = productsCheck.map(function(x) {
                return x.product;
            });

            console.log(findProduct);
            return findProduct;
        } catch (error) {
            console.log(error)
        };
    };
    refresh = async(position, object) => {
        try {
            let sumId = position - 1;
            let carts = await this.getAll();
            let CartById = await this.getById(position);
            let objectOfArray = CartById[0];
            let productsCheck = objectOfArray.products;
            let findProduct = productsCheck.map(function(x) {
                return x.product;
            });
            let findQuantity = productsCheck.map(function(x) {
                return x.quantity;
            });
            const resultFilter = productsCheck.filter(function (nickname) { return nickname.product == object.product });
            let quantityResult = resultFilter.map(function(x) {
                return x.quantity;
            });
            let searchProduct = findProduct.includes(object.product);

            //Validation and return new quantity
            if (searchProduct){
                object.quantity = parseInt(object.quantity) + parseInt(quantityResult);
                let result = findProduct.indexOf(object.product);
                productsCheck.splice(result, 1, object);
            } else {
                productsCheck.push(object);
            }

            carts.splice(sumId, 1, objectOfArray);
            await this.replaceProduct(carts);
        } catch (error) {
            console.log(error)
        };
    };
}