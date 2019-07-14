const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.get('/chat', (req, res) => {
    res.sendFile(`${__dirname}/chat.html`)
})

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`)
})

io.on('connection', socket => {
    console.log('a user connected')
    io.emit('user connect')
    socket.on('disconnect', _ => {
        console.log('user disconnected')
    })
    socket.on('chat message', msg => {
        io.emit('chat message', msg)
    })
})

http.listen(3002, _ => {
    console.log('Listening on port 3002')
})