const ChatRoom = require('../models/chat_rooms');

exports.listRooms = function(req, res){
    //query should find the names of all chat rooms in the database
    const query = ChatRoom.find().select('name');

    query.exec(function(err, rooms){

        console.log('Rooms', rooms);

        res.send(rooms);
    });
};

exports.addRoom = function(req, res){
    const room = new ChatRoom({
        name: req.query.name,
        chatLog:[]
    });

    room.save().then( err => {
        res.send(`New room created named: ${req.query.name}`)
    });
};