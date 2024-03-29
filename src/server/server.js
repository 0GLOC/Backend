import express from 'express';
import __dirname from '../utils.js';
import productsRouter from '../router/productos.router.js';
import cartRouter from '../router/cart.router.js';
import viewsRouter from '../router/views.router.js';
import mailRouter from '../router/mail.router.js';
import sessionRouter from '../router/session.router.js'
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import MessageLibrary from '../container/ReadMessage.js';
import MessageService from '../services/messageService.js';
import session from "express-session";
import MongoStore from "connect-mongo";
import initializePassport from '../config/passport.config.js';
import passport from 'passport';
import configMinimist from '../utils/minimistArgs.js';
import config from '../config/config.js';
import logger from '../logger/logger.winston.js';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from '../graphql/typeDefs.js';
import resolvers from '../graphql/resolvers.js';

const app = express();

const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: "API Swagger",
            description: "API Testing with Swagger"
        }
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
}

const specs = swaggerJSDoc(swaggerOptions);

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
});
await apolloServer.start();
apolloServer.applyMiddleware({app})

let date = new Date();
let output = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear();

const messagesService = new MessageService();

const PORT = process.env.PORT ||configMinimist.port;

const server = app.listen(PORT, () => {
    logger.log('info', `${output} - Listening on port ${PORT} - http://localhost:${PORT}/`)
});

const io = new Server(server);

const ContainerMessagesSaves = new MessageLibrary();

const url = config.mongo.MONGO_URL + "";

function error404(req, res, next) {
    let error = new Error(),
        locals = {
            title: 'Error 404',
            description: 'Not Found',
            error: error
        }
    
    res.render('error', locals);
    if (error) {
        //logger.log('warn', `${output} - GET - http://localhost:${PORT}/nonexistentroute`);
    }
}

app.use(express.json());
app.use(session({
    store: MongoStore.create({
        mongoUrl: url,
        ttl: 300
    }),
    secret: "UserSessi0n",
    resave: false,
    saveUninitialized: false
}));
initializePassport();
app.use(passport.initialize());
app.use(passport.session());
app.set('view engine', 'ejs');
app.set('view engine', 'pug');
app.engine('handlebars', handlebars.engine());
app.set('views',__dirname+'/views');
app.set('view engine', 'handlebars');
app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);
app.use('/api/mail', mailRouter);
app.use('/api/session', sessionRouter);
app.use('/', viewsRouter);
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));
app.use(express.static(__dirname+'/public'));
app.use(error404);

io.on('connection',socket => {
    logger.log('info', `${output} - Socket connected`)

    socket.broadcast.emit('newUser')
    socket.on('message', async data => {
        const newObject = {author: data, text: data.text}
        const saveObject = await messagesService.save(newObject);
        let read = await ContainerMessagesSaves.readFile();
        logger.log('info', `${output} - Denormalized, ${read}`)
        let arr = [];
        arr.push(read)
        let messages = arr[0].comments;
        io.emit('log', messages)
    })
    socket.on('listener', (data) => {
        io.emit('listener', data)
    })
})