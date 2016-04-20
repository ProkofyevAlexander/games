var md5 = require('md5'),
    log = require('./logger');

module.exports = (io) => {

    return (socket) => {

        var roomId = null;

        socket.on('createRoom', function () {

            //console.log('on createRoom');

            roomId = md5((new Date()).toDateString() + 'G7b*sT5#' + Math.random());

            socket.join(roomId, function (err) {
                if (err) {
                    log.error({
                        type: 'socketJoin',
                        error_description: err
                    }, 'Socket join error');
                }
            });

            //console.log('emit roomCreated');
            socket.emit('roomCreated', {roomId: roomId});
        });

        socket.on('connectTo', function (data) {

            //console.log('on connectTo', data);

            if (data.hasOwnProperty('roomId') && io.nsps['/'].adapter.rooms[data.roomId].length == 1) {

                roomId = data.roomId;

                socket.join(roomId, function (err) {
                    if (err) {
                        log.error({
                            type: 'socketJoin',
                            error_description: err
                        }, 'Socket join error');
                    }
                });

                //console.log('emit successConnection', data);
                io.to(roomId).emit('successConnection');
            }
            else {
                //console.log('emit roomDoesNotExists');
                socket.emit('roomDoesNotExists');
            }
        });

        socket.on('action', function (data) {

            //console.log('on action', data);

            //console.log('emit action', data);
            socket.broadcast.to(roomId).emit('action', data);
        });

        socket.on('disconnect', function () {

            //console.log('on disconnect');

            //console.log('emit roomIsClosed');
            socket.broadcast.to(roomId).emit('roomIsClosed');
        });
    }
};