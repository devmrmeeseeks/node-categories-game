const User = require('../models/users')
const Room = require('../models/rooms')

const init = (io) => {
    io.on('connection', (socket) => {
        socket.on('join', (options, cb) => {
            // add user to room
            const user = new User({ id: socket.id, ...options })
            try {
                user.create()
            } catch (e) {
                return cb(e.message)
            }
            socket.join(user.room)
            
            // notify room
            let room = new Room().getByName(user.room)
            if (!room) {
                room = new Room(user.room)
                try {
                    room.create()
                } catch (e) {
                    return cb(e.message)
                }
            }
            
            if (room.status)
                return cb('El juego ya ha iniciado')

            io.to(user.room).emit('roomData', { 
                room: user.room,
                users: user.getUsersByRoom()
            })

            if (!user.isAdmin)
                return
            
                socket.emit('showConfiguration', { 
                categories: room.getAvailableCategories(), 
                rounds: room.getAvailableRounds() 
            })
        })
    })
}

module.exports = {
    init
}