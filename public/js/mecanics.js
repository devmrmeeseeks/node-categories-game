const socket = io()

// Get user
const { username, room} = Qs.parse(location.search, { ignoreQueryPrefix: true })

// Events
socket.on('roomData', async ({ room, users }) => {
    const res = await fetch('/_room.html')
    res.text().then(data => {
        const html = Mustache.render(data, { users })
        document.querySelector('#users-lobby').innerHTML = html
    })
})

socket.on('showConfiguration', async ({ categories, rounds }) => {
    const res = await fetch('/_configuration.html')
    res.text().then(data => {
        const html = Mustache.render(data, { categories, rounds })
        document.querySelector('#game').innerHTML = html
        initConfiguration()
    })
})

// Listeners
const initConfiguration = () => {
    const $configurationForm = document.querySelector('#game')
    const $configurationFormButton = $configurationForm.querySelector('button')

    $configurationForm.addEventListener('submit', (e) => {
        e.preventDefault()
        $configurationFormButton.setAttribute('disabled', 'disabled')
        // TODO: logic to store configuration
    })
}


socket.emit('join', { username, room }, (err) => {
    if (err) {
        alert(err)
        location.href = '/'
    }
})