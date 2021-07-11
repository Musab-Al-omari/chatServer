require('dotenv').config();
const express = require("express");
const http = require("http");
const app = express();
const cors = require('cors')
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server, {
    cors: {
        origin: "*",
        methods: ['GET', 'POST']
    }
});
app.use(cors());

app.get('/', (req, res) => {
    res.send('serverRunning...')
})

io.on('connection', socket => {
    socket.on('chatRoom', roomID => {
        socket.join(roomID);
        socket.emit('userId-Joined');
        socket.on('message', ({ name, message }) => {
            console.log(message);
            io.to(roomID).emit('message', { name, message })
        })
    })

});

server.listen(process.env.PORT || 8000, () => console.log('server is running on port 8000'));