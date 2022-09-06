import mongoose from "mongoose";

export default class MongoDBContainerMessages{
    constructor(collection, schema){
        //Password is missing
        mongoose.connect('mongodb+srv://0GLOC:gabimaidana15@ecommerce.ampswjk.mongodb.net/ecommerceDB')
        this.model = mongoose.model(collection, schema);
    }
    getAll = async() => {
        try {
            let objects = await this.model.find();
            return objects;
        } catch (error) {
            console.log(error);
        }
    };
    getAllExceptId = async() => {
        try {
            let objects = await this.model.find({},{_id:0, __v:0});
            return objects;
        } catch (error) {
            console.log(error);
        }
    };
    save = async(object) => {
        try {
            let newObj = {
                id: 666,
                comments: [
                    {
                        author: {
                            id: object.author.id,
                            name: object.author.name,
                            lastName: object.author.lastName,
                            age: object.author.age,
                            nickname: object.author.nickname,
                            avatar: object.author.avatar,
                            date: object.author.date
                        }, 
                        text: object.text,
                        id: 1
                    }
                ]
            };
            let objects = await this.model.find();
            delete object.author.text;          
            if (objects.length === 0) {
                await this.model.create(newObj);
            } else {
                let findId = await this.model.findOne({id:666});
                let onlyObject = findId.comments; 
                let lengthObj = parseInt(onlyObject.length) + 1;
                let set = await this.model.updateOne({},{$push:{comments: {$each: [{author: {id: object.author.id, name: object.author.name, lastName: object.author.lastName, age: object.author.age, nickname: object.author.nickname, avatar: object.author.avatar, date: object.author.date}, text: object.text, id: lengthObj}]}}});
            }
        } catch (error) {
            console.log(error)
        };
    };
}