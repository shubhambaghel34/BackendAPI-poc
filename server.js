const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// create express app
const app = express();
mongoose.connect('mongodb://localhost/stock',{ useNewUrlParser: true })
  .then(() => console.log('Now connected to MongoDB!'))
  .catch(err => console.error('Something went wrong', err));
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

let stockroute=require('./src/routes/stock')
app.use(stockroute)

function startTimer() {
  //Simulate stock data received by the server that needs 
  //to be pushed to clients
  timerId = setInterval(() => {
    if (!sockets.size) {
      clearInterval(timerId);
      timerId = null;
      console.log(`Timer stopped`);
    }
    let value = ((Math.random() * 50) + 1).toFixed(2);
    //See comment above about using a "room" to emit to an entire
    //group of sockets if appropriate for your scenario
    //This example tracks each socket and emits to each one
    for (const s of sockets) {
      console.log(`Emitting value: ${value}`);
      s.emit('data', { data: value });
    }

  }, 2000);
}

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep."});
});

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});