
const express = require('express');
const database = require("./database");
const cors = require('cors');


const bodyParser = require('body-parser');

const app = express();
const port = 8080

const http = require('http');
const socketIo = require('socket.io');



const server = http.createServer(app);
const io = socketIo(server, {
 
    cors: {
      origin: /^http:\/\/localhost:\d+$/,
      methods: ["GET", "POST"]
    }
  });

let users = [];


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))
let messages = [];

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('sendMessage', (message) => {
    messages.push(message);
    io.emit('receiveMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});




app.use(express.json());


// Si vous utilisez express.static, placez-le avant vos autres routes
app.use("/storages", express.static("storages"));
app.use(cors({
    origin: /^http:\/\/localhost:\d+$/,
  }));
  


const categoryRoute = require("./Router/categoryRouter");
const expertRoute = require('./Router/ExpertRouter');
const expertsRoute = require('./Router/expertsRouter');
const carRoute = require('./Router/carRouter');
const buyerRoute = require('./Router/BuyerRouter');
const sellerRoute = require('./Router/SellerRouter');
const adminRoute = require('./Router/adminRouter');
const userRoute = require('./Router/userRouter');
const contactRoute = require('./Router/contactRouter');
const demandeRoute = require('./Router/DemandeRouter');
const paiementRoute = require('./Router/paiementRouter');
const messagerieRoute = require('./Router/MessagerieRouter');
const sposorshipRoute = require('./Router/SponsorshipRouter');
const annonceRoute = require('./Router/annonceRouter');

const notifRoute=require('./Router/notifRouter');
const rapportExRoute=require('./Router/expertiseRouter');
const commentsRoute=require('./Router/commentsRouter');

app.use('/category', categoryRoute)
app.use('/expert', expertRoute)
app.use('/experts', expertsRoute)
app.use('/car', carRoute)
app.use('/buyer', buyerRoute)
app.use('/seller', sellerRoute)
app.use('/admin', adminRoute)
app.use('/users', userRoute)
app.use('/messagerie', messagerieRoute)
app.use('/contact', contactRoute)
app.use('/demande', demandeRoute)
app.use('/paiement', paiementRoute)
app.use('/sponsorship', sposorshipRoute)
app.use('/annonce', annonceRoute)

app.use('/notification', notifRoute)
app.use('/expertise', rapportExRoute)
app.use('/comments', commentsRoute)

app.use("/storages", express.static("storages"));

app.get("/", function(req, res) {
    res.send("Welcome to car_sell")
})

app.get("/getImage/:img", function(req, res) { 
    res.sendFile(__dirname + "/storages/" + req.params.img)
})


app.listen(port, function() {
    console.log("listen http://localhost:8080")
})


/* const socketIO = require('socket.io')
const http = require('http')
const config = require('config')



app.use(express.json({
    limit: '10kb'
  }))
  app.use(express.urlencoded({
    extended: true,
    limit: '10kb'
  }))
  
  mongoose
    .connect('mongodb://127.0.0.1:27017/car_sell', {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    })
  
  const server = http.createServer(app)
  const io = socketIO(server, {
    path: '/notification/'
  })
  require('./controllers/notification')(io)
  
  require('./routes')(app)
  
  const port = config.port || 8080
  server.listen(port, () => {
    console.log(`Notification Mgmt running on port ${port}.`)
  })
   */