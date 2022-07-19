import express from 'express';
import __dirname from '../utils.js';
import productsRouter from '../router/productos.router.js';

const app = express();

const port = 8080;

const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

app.use(express.json());
app.use('/api/productos', productsRouter);
app.use(express.static(__dirname+'/public'));