
const { app, server} = require('./app')
const socket = require('./utils/sockets')
const socketio = require('socket.io')
const User = require('./models/users')
const { rooms } = require('./models/rooms')
const Room = require('./models/rooms')
const io = socketio(server)
socket.init(io)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Bienvenido a categories'
    })
})

app.get('/game', (req, res) => {
    res.render('game')
})

//Get users by room
app.get('/users/:id', (req, res) => {
    const user = new User()
    const users = user.getUsersByRoom(req.params.id)
    res.status(200).send(users)
})

//Get room by name
app.get('/room/:id', (req, res) => {
    const room = new Room().getByName(req.params.id)
    res.status(200).send(room)
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Página no encontrada'
    })
})

const port = process.env.PORT || 3000
server.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})