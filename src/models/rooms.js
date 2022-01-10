const rooms = []
const alphabet = "abcdefghijklmnopqrstuvwxyz"
const categories = ['Nombre', 'Apellido', 'Ciudad o país', 'Animal', 'Color', 
'Profesión', 'Verbo', 'Parte del cuerpo', 'Comida', 'Deporte o juego', 'Adjetivó', 'Fruta', 'Vegetal', 'Cosa']
const rounds = [3, 5, 10, 12]

class Room {
    constructor(name = undefined) {
        this.name = name
        this.categoriesSelected = []
        this.rounds = 0
        this.roundsLeft = 0
        this.status = false
        Object.seal(this);
    }
    
    getByName(name) {
        const room = rooms.find(room => room.name === name)
        return room
    }

    create() {
        if (!this.name)
            throw new Error('Invalid model');

        const { name } = this
        const room = rooms.find(room => room.name === name)
        if (room)
            throw new Error('La sala de juego ya existe')

        rooms.push(this)
    }

    createRoomConfiguration({ categoriesSelected, roundsSelected} = {}) {
        if (!this.name)
            throw new Error('Invalid model')

        if (this.status)
            throw new Error('No es posible configurar una sala, la partida ya ha comenzado')

        if (!categoriesSelected)
            throw new Error('Categorías requeridas')

        if (!roundsSelected)
            throw new Error('Cantidad de rondas requerida')

        if (categoriesSelected.length < 5)
            throw new Error('Debe seleccionar por lo menos 5 categorías')

        if (roundsSelected < 3 && roundsSelected > 12)
            throw new Error('Cantidad de rondas inválida')

        this.categoriesSelected = categoriesSelected
        this.rounds = roundsSelected
        this.roundsLeft = roundsSelected

        const index = rooms.findIndex(room => room.name === this.name)
        if (index === -1)
            throw new Error('Sala de juego inválida')

        rooms[index] = this
    }

    createStartGame() {
        if (!this.name)
            throw new Error('Invalid model')

        if (this.categoriesSelected.length === 0 || this.rounds === 0)
            throw new Error('Debe configurar la sala de juego antes de comenzar')

        const index = rooms.findIndex(room => room.name === this.name)
        if (index === -1)
            throw new Error('Sala inválida')

        this.status = true
        rooms[index] = this
    }

    getAvailableCategories() {
        return categories
    }

    getAvailableRounds() {
        return rounds
    }
}

module.exports = Room