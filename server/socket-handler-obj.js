var md5 = require('md5');

var rooms = {};

module.exports = (socket) => {

    var roomId = null,
        opponent = null;

    socket.on('createRoom', function () {

        console.log('on createRoom');

        roomId = md5((new Date()).toDateString() + 'G7b*sT5#' + Math.random());

        rooms[roomId] = {
            socket1: socket,
            socket2: null
        };

        opponent = 'socket2';

        console.log('emit roomCreated');
        socket.emit('roomCreated', {roomId: roomId});
    });

    socket.on('connectTo', function (data) {

        console.log('on connectTo', data);

        if (data.hasOwnProperty('roomId') && rooms.hasOwnProperty(data.roomId) && rooms[data.roomId].socket2 == null) {

            roomId = data.roomId;

            rooms[roomId].socket2 = socket;
            opponent = 'socket1';

            console.log('emit successConnection', data);
            socket.emit('successConnection');
            rooms[roomId].socket1.emit('successConnection');
        }
        else {
            console.log('emit roomDoesNotExists');
            socket.emit('roomDoesNotExists');
        }
    });

    socket.on('action', function (data) {

        console.log('on action', data);

        console.log('emit action', data);
        rooms[roomId][opponent].emit('action', data);
    });

    socket.on('disconnect', function () {

        console.log('on disconnect');

        if (rooms.hasOwnProperty(roomId) && rooms[roomId].hasOwnProperty(opponent) && rooms[roomId][opponent] != null) {
            console.log('emit roomIsClosed');
            rooms[roomId][opponent].emit('roomIsClosed');
            rooms[roomId][opponent] = null;
        }

    });
};