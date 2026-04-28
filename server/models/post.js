const mongoose = require("mongoose");
const { post } = require("../routes/main");

const Schema = mongoose.Schema
const PostSchema = new Schema({
    title: {
        type:String,
        required: true,
    },
    body: {
        type:String,
        required: true,
    },
    createdAt: {
        type:Date,
        default: Date.now 
    },
    updatedAt: {
        type:Date,
        default: Date.now 
    }
})
console.log(post)

module.exports = mongoose.model("post", PostSchema)