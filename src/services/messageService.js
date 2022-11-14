import services from '../dao/config.js';

export default class MessageService {
    constructor(){
        this.dao = services.messagesService;
    }
    getAll = async() => {
        return this.dao.getAll();
    };
    getAllExceptId = async() => {
        return this.dao.getAllExceptId();
    };
    save = async(object) => {
        return this.dao.save(object);
    };
}