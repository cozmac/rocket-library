'use strict'
const express = require('express')

let app = express()

app.use(express.static('public'))

app.get('/ping', (req, res) =>
{
    res.status(200).send('pong')
})


app.listen(8080)