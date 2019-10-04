const express = require('express'),
      app = express(),
      server = require('http').createServer(app);
      io = require('socket.io')(server);
      const bodyParser = require('body-parser');

      app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use(bodyParser.json())
let timerId = null
    sockets = new Set();
    stocksarr = [
        {symbol: "GM", open: 38.87},
        {symbol: "GE", open: 25.40},
        {symbol: "MCD", open: 97.05},
        {symbol: "UAL", open: 69.45},
        {symbol: "WMT", open: 83.24},
        {symbol: "AAL", open: 55.76},
        {symbol: "LLY", open: 76.12},
        {symbol: "JPM", open: 61.75},
        {symbol: "BAC", open: 15.84},
        {symbol: "BA", open: 154.50}
    ];


//This example emits to individual sockets (track by sockets Set above).
//Could also add sockets to a "room" as well using socket.join('roomId')
//https://socket.io/docs/server-api/#socket-join-room-callback

app.use(express.static(__dirname + '/dist')); 

io.on('connection', socket => {

  sockets.add(socket);
  console.log(`Socket ${socket.id} added`);

  if (!timerId) {
    startTimer();
  }

  socket.on('clientdata', data => {
    console.log(data);
  });

  socket.on('disconnect', () => {
    console.log(`Deleting socket: ${socket.id}`);
    sockets.delete(socket);
    console.log(`Remaining sockets: ${sockets.size}`);
  });

});

function startTimer() {
  //Simulate stock data received by the server that needs 
  //to be pushed to clients
  timerId = setInterval(() => {
    if (!sockets.size) {
      clearInterval(timerId);
      timerId = null;
      console.log(`Timer stopped`);
    }
    let value = stocksarr;
    //See comment above about using a "room" to emit to an entire
    //group of sockets if appropriate for your scenario
    //This example tracks each socket and emits to each one
    for (const s of sockets) {
      console.log(`Emitting value: ${value}`);
      s.emit('data', { data: value });
    }

  }, 2000);
}

server.listen(8000);
console.log('Visit http://localhost:8000 in your browser');