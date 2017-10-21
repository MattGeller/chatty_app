const mongoose = require('mongoose');
const Schema = mongoose.Schema;

chatRoomSchema = new Schema({
    name: String,
    chatLog: Array
});

const ModelClass = mongoose.model('chatRoom', chatRoomSchema);

module.exports = ModelClass;