import express from 'express';
import http from 'http';
import { Server as SocketServer } from 'socket.io';

const app = express();
const port = 4000;
const server = http.createServer(app);
const io = new SocketServer(server);

io.on('connection', socket => {
  socket.on('message', (body) => {
    console.log(body);
    socket.broadcast.emit('message', {
      body,
      from: socket.id.slice(6)
    });
  });
});

server.listen(port);
console.log(`Hi Nighty, your server is listening on http://localhost:${port}/`);
