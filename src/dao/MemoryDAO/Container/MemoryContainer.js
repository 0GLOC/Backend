import logger from "../../../logger/logger.winston.js";

let date = new Date();
let output = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear();

export default class MemoryContainer{
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
            let randomCalculator = Date.now();
            let random = Math.round(Math.random()*randomCalculator);
            if (objects.length === 0) {
                object.id = 1;
                object.code = random;
                object.timestamp = Date.now();
                this.data.push(object);
            } else {
                object.id = objects[objects.length - 1].id + 1;
                object.code = random;
                object.timestamp = Date.now();
                this.data.push(object);
            };

        } catch (error) {
            console.log(error)
        };
    };
    replaceObject = async(position, object) => {
        try {
            let sumId = position - 1;
            let objects = await this.getAll();
            objects.splice(sumId, 1, object)
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
            objects.splice(realnum, 1,);
            logger.log('info',`${output} - POST - File removed`);
        } catch (error) {
            console.log(error)
        }
    };
}