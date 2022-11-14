import services from '../dao/config.js';

export default class CartService {
    constructor(){
        this.dao = services.cartService;
    }
    getAll = async() => {
        return this.dao.getAll();
    };
    save = async(object, user) => {
        return this.dao.save(object, user);
    };
    replaceObject = async(object, position, positionCart) => {
        return this.dao.replaceObject(object, position, positionCart);
    };
    getById = async(object) => {
        return this.dao.getById(object);
    };
    getByUser = async(object) => {
        return this.dao.getByUser(object);
    };
    deleteById = async(object) => {
        return this.dao.deleteById(object);
    };
    refresh = async(position, object) => {
        return this.dao.refresh(position, object);
    };
    showProducts = async(position) => {
        return this.dao.showProducts(position);
    };
    showQuantity = async(position) => {
        return this.dao.showQuantity(position);
    };
    deleteAllProductsInCarts = async(object) => {
        return this.dao.deleteAllProductsInCarts(object);
    };
}