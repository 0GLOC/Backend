import express from 'express';
import __dirname from '../utils.js';
import productsRouter from '../router/productos.router.js';
import cartRouter from '../router/cart.router.js';
import viewsRouter from '../router/views.router.js';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import ContainerMessage from '../container/MessageContainer.js';

const app = express();

const port = 8080;

const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

const io = new Server(server);

const ContainerMessagesSaves = new ContainerMessage();

app.use(express.json());
app.set('view engine', 'ejs');
app.set('view engine', 'pug');
app.engine('handlebars', handlebars.engine());
app.set('views',__dirname+'/views');
app.set('view engine', 'handlebars');
app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);
app.use('/', viewsRouter);
app.use(express.static(__dirname+'/public'));


io.on('connection',socket => {
    console.log("Socket connected")

    socket.broadcast.emit('newUser')
    socket.on('message', async data => {
        const saveObject = await ContainerMessagesSaves.save(data);
        let messages = await ContainerMessagesSaves.getAll();
        io.emit('log', messages)
    })
    socket.on('listener', (data) => {
        io.emit('listener', data)
    })
})