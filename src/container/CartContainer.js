/*import * as fs from 'fs';

const path = 'src/files/carts.json'

class CartContainer {
    getAllCarts = async() => {
        try {
            if(fs.existsSync(path)){
                let fileData = await fs.promises.readFile(path, 'utf-8',);
                let carts = JSON.parse(fileData);
                return carts;
            } else {
                return [];
            }
        } catch (error) {
            console.log(error);
        }
    };
    saveCart = async(object) => {
        try {
            let carts = await this.getAllCarts();
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
            console.log(error)
        };
    };
    saveProductsInCart = async(object) => {
        try {
            await fs.promises.writeFile(path, JSON.stringify(object, null, '\t'));
        } catch (error) {
            console.log(error)
        };
    };
    getCartById = async(object) => {
        try {
            const error = 'This cart does not exist'
            let carts = await this.getAllCarts();
            const result = carts.filter(function (nickname) { return nickname.id == object });
            if (object > result) {
                console.log({error})
                return {error}
            } else {
                console.log(result);
                return result
            };
        } catch (error) {
            console.log(error)
        };
    };
    deleteCartById = async(object) => {
        try {
            let carts = await this.getAllCarts();
            const result = carts.filter(function (nickname) { return nickname.id !== object });
            await fs.promises.writeFile(path, JSON.stringify(result.splice({}), null, '\t'));
            console.log('File removed')
        } catch (error) {
            console.log(error)
        }
    };
};

export default CartContainer;*/