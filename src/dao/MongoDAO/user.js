import mongoose from "mongoose";

const collection = "Users";

const usersSchema = new mongoose.Schema({
    name: String,
    password: String,
    userName: String,
    direction: String,
    age: Number,
    phone: Number,
    avatar: String,
});

const userService = mongoose.model(collection, usersSchema);

export default userService;