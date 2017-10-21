const io = require('socket.io')();

io.on('connection',client => {
    //event for when a client joins a room
    client.on('room', room => {
        client.join(room);
        io.in(room).emit('message', 'Welcome to the room');

        //event listener for when the client triggers a message event
        client.on('message', msg => {
            io.in(room).emit('message', msg)
        })
    });

    //event listener for when a user leaves a rom
    client.on('leave room', (room) => {
        console.log('Client left');
        client.leave(room);
    })
});

io.listen(3500);

console.log('Chat Server Running On PORT: 3500');