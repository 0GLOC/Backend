const express = require('express');

const ContainerService = require('../index.js');

const app = express();

const port = 8080;

const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

app.get('/', (req, res) => {
    res.send('Página principal!')
});

app.get('/productos', async (req, res) => {
    let objects = await ContainerService.getAll();
    res.send(objects)
});

app.get('/productoRandom', async (req, res) => {
    let objectRandom = await ContainerService.getRandom();
    res.send(objectRandom)
});

app.get('/info', (req, res) => {
    let role = req.query.role;
    if(!role){ 
        return res.send('No se ha definido un rol')
    } else if(role === 'admin'){
        return res.send('Acceso denegado')
    } else {
        res.send('Acceso concebido')
    };
});