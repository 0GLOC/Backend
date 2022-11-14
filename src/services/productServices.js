import services from '../dao/config.js';

export default class ProductService {
    constructor(){
        this.dao = services.productsService;
    }
    getAll = async() => {
        return this.dao.getAll();
    };
    save = async(object) => {
        return this.dao.save(object);
    };
    replaceObject = async(position, object) => {
        return this.dao.replaceObject(position, object);
    };
    getById = async(object) => {
        return this.dao.getById(object);
    };
    deleteById = async(object) => {
        return this.dao.deleteById(object);
    };
}