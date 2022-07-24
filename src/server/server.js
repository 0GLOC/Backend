import express from 'express';
import __dirname from '../utils.js';
import productsRouter from '../router/productos.router.js';
import viewsRouter from '../router/views.router.js';
import handlebars from 'express-handlebars';

const app = express();

const port = 8080;

const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

app.use(express.json());
app.engine('handlebars', handlebars.engine());
app.set('views',__dirname+'/views');
app.set('view engine', 'handlebars');
app.use('/api/productos', productsRouter);
app.use('/productos', viewsRouter);
app.use(express.static(__dirname+'/public'));