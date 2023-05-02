const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: String,
    body: String,
    device:{type: String,enum: ['PC', 'TABLET', 'MOBILE']},
    userId: String
})
const postModel = mongoose.model('post', postSchema);

module.exports = postModel;
