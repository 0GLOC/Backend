import mongoose from "mongoose";
import MongoDBContainerMessages from "./Container/MongoContainerMessages.js";

const collection = 'messages';
const messagesSchema = mongoose.Schema({
    id: Number,
    comments: [{
        author: {
            id: String,
            name: String,
            lastName: String,
            age: Number,
            nickname: String,
            avatar: String,
            date: Date
        },
        text: String,
        id: Number
    }],
})
export default class MessageMongo extends MongoDBContainerMessages{
    constructor(){
        super(collection, messagesSchema);
    }
};