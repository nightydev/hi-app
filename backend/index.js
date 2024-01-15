import express from 'express';
import http from 'http';
import { Server as SocketServer } from 'socket.io';

const app = express();
const port = 4000;
const server = http.createServer(app);
const io = new SocketServer(server);

const users = {};

io.on('connection', socket => {
  console.log(`[Server] User logged in: ${socket.id}`);

  socket.on('message', (body) => {
    const from = users[socket.id] ? users[socket.id].username : socket.id;
    socket.broadcast.emit('message', { body, from });
    console.log(`[Server] ${from}: ${body}`);
  });

  socket.on('username', (username) => {
    console.log(`[Server] Assigned username: ${username}`);
    users[socket.id] = { username };
    socket.broadcast.emit('username', username);
  });

  socket.on('disconnect', () => {
    const disconnectedUser = users[socket.id];
    const disconnectedUsername = disconnectedUser ? disconnectedUser.username : null;
    console.log(`User logged out: ${disconnectedUsername || socket.id}`);
    delete users[socket.id];
  });
});

server.listen(port);
console.log(`Hi Nighty/Luxtar, your server is listening on http://localhost:${port}/`);
