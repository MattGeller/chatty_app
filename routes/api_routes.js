const {requireAuth} = require('./auth');
const {listRooms, addRoom} = require('../controllers/chat_rooms');

module.exports = app => {
    app.get('/api/room-list', requireAuth, (req, res) =>{
        console.log('/api/room-list hit');
        listRooms(req, res);
    });

    app.get('/api/add-room', (req, res) => {
        console.log(req.query);
        addRoom(req, res);
    });
};