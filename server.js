const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

io.on('connection', (socket) => {
  socket.on('joinGroup', (groupId) => {
    socket.join(groupId);
  });

  socket.on('play', ({ groupId, time }) => {
    socket.to(groupId).emit('play', time);
  });

  socket.on('pause', ({ groupId }) => {
    socket.to(groupId).emit('pause');
  });

  socket.on('songChanged', ({ groupId, src }) => {
    socket.to(groupId).emit('songChanged', src);
  });
});

http.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
