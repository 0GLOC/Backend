import * as fs from 'fs';
import logger from '../../../logger/logger.winston.js';

const path = 'src/files/carts.json'

let date = new Date();
let output = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear();

class CartContainer {
    getAll = async() => {
        try {
            if(fs.existsSync(path)){
                let fileData = await fs.promises.readFile(path, 'utf-8',);
                let carts = JSON.parse(fileData);
                return carts;
            } else {
                return [];
            }
        } catch (error) {
            logger.log('error',`${output} - POST - ${error}`);
        }
    };
    save = async(object) => {
        try {
            let carts = await this.getAll();
            if (carts.length === 0) {
                object.id = 1;
                object.timestamp = Date.now();
                object.products = [];
                carts.push(object);
                await fs.promises.writeFile(path, JSON.stringify(carts, null, '\t'));
            } else {
                object.id = carts[carts.length - 1].id + 1;
                object.timestamp = Date.now();
                object.products = [];
                carts.push(object);
                await fs.promises.writeFile(path, JSON.stringify(carts, null, '\t'));
            };

        } catch (error) {
            logger.log('error',`${output} - POST - ${error}`);
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
            logger.log('error',`${output} - POST - ${error}`);
        };
    };
    replaceProduct = async(object) => {
        try {
            await fs.promises.writeFile(path, JSON.stringify(object, null, '\t'));
        } catch (error) {
            logger.log('error',`${output} - POST - ${error}`);
        };
    };
    getById = async(object) => {
        try {
            let realNumber = parseInt(object)
            const error = 'This cart does not exist'
            let carts = await this.getAll();
            const result = carts.filter(function (nickname) { return nickname.id == realNumber });
            if (object > result) {
                console.log({error})
                return {error}
            } else {
                console.log(result);
                return result
            };
        } catch (error) {
            logger.log('error',`${output} - POST - ${error}`);
        };
    };
    deleteById = async(object) => {
        try {
            let realNumber = parseInt(object)
            let carts = await this.getAll();
            const result = carts.filter(function (nickname) { return nickname.id !== realNumber });
            await fs.promises.writeFile(path, JSON.stringify(result.splice({}), null, '\t'));
            logger.log('info',`${output} - POST - File removed`);
        } catch (error) {
            logger.log('error',`${output} - POST - ${error}`);
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

            return findProduct;
        } catch (error) {
            logger.log('error',`${output} - POST - ${error}`);
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
            logger.log('error',`${output} - POST - ${error}`);
        };
    };
    showQuantity = async(position) => {
        try {
            let CartById = await this.getById(position);
            let objectOfArray = CartById[0];
            let productsCheck = objectOfArray.products;
            let findProduct = productsCheck.map(function(x) {
                return x.quantity;
            });

            return findProduct;
        } catch (error) {
            logger.log('error',`${output} - POST - ${error}`);
        };
    };
};

export default CartContainer;