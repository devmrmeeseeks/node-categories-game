const users = []

class User {
    constructor({ id, username, room } = {}) {
        this.id = id
        this.username = username
        this.room = room
        this.isAdmin = false
        Object.seal(this);
    }

    getById(id) {
        if (!id)
            throw new Error('id es requerido')

        const user = users.find((user) => user.id === id)
        return user
    }

    getUsersByRoom(room) {
        if (!room && !this.room)
            throw new Error("room es requerido")

        if (!room)
            room = this.room

        return users.filter((user) => user.room === room)
    }
    
    create() {
        let { username, room } = this
        if (!username || !room)
            throw new Error('Nombre de usuario y salón son requeridos')

        username = username.trim().toLowerCase()
        room = room.trim().toLowerCase()
        const existingUser = users.find((user) => user.username === username && room === user.room)
        if (existingUser)
            throw new Error('El nombre de usuario se encuentra en uso')

        const existRoom = users.filter((user) => user.room === room).length
        this.isAdmin = existRoom == 0? true : false
        this.username = username
        this.room = room
        users.push(this)

        return this
    }

    delete() {
        const index = users.findIndex((user) => user.id === this.id)
        if (index !== -1)
            return users.splice(index, 1)[0]
    }
}

module.exports = User