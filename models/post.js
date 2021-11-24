const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({

    author: {
        type: String,
        required: true
    },
    liked_count: Number,
    liked_username: [String],
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    activity: String,
    workout: String,
    duration: String,
    time: String,
    contact: {
        type: String,
        required: true
    },
    date: String,
    days: [String]
});


module.exports = mongoose.model("Post", postSchema);