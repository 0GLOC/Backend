import express from 'express';
import __dirname from '../utils.js';
import productsRouter from '../router/productos.router.js';
import cartRouter from '../router/cart.router.js';
import viewsRouter from '../router/views.router.js';
import testRouter from '../router/test.router.js';
import sessionRouter from '../router/session.router.js'
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import MessageLibrary from '../container/ReadMessage.js';
import services from '../dao/config.js';
import session from "express-session";
import MongoStore from "connect-mongo";

const app = express();

const port = 8080;

const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

const io = new Server(server);

const ContainerMessagesSaves = new MessageLibrary();

app.use(express.json());
app.use(session({
    store: MongoStore.create({
        mongoUrl: `mongodb+srv://0GLOC:gabimaidana15@ecommerce.ampswjk.mongodb.net/ecommerceDB`,
        ttl: 60
    }),
    secret: "UserSessi0n",
    resave: false,
    saveUninitialized: false
}));
app.set('view engine', 'ejs');
app.set('view engine', 'pug');
app.engine('handlebars', handlebars.engine());
app.set('views',__dirname+'/views');
app.set('view engine', 'handlebars');
app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);
app.use('/api/products-test', testRouter);
app.use('/api/session', sessionRouter);
app.use('/', viewsRouter);
app.use(express.static(__dirname+'/public'));


io.on('connection',socket => {
    console.log("Socket connected")

    socket.broadcast.emit('newUser')
    socket.on('message', async data => {
        const newObject = {author: data, text: data.text}
        const saveObject = await services.messagesService.save(newObject);
        let read = await ContainerMessagesSaves.readFile();
        console.log('Denormalized', read)
        let arr = [];
        arr.push(read)
        let messages = arr[0].comments;
        io.emit('log', messages)
    })
    socket.on('listener', (data) => {
        io.emit('listener', data)
    })
})