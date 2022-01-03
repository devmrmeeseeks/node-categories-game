const path = require('path')
const express = require('express')
const hbs = require('hbs')
const http = require('http')

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectoryPath));
const server = http.createServer(app)

module.exports = {
    app,
    server
}

