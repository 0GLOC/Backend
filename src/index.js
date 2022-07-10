const Container = require('./container/ObjectContainer.js');

const ContainerService = new Container();
const environment = async() => {
    //console.log('Getting objects');
    //let objects = await ContainerService.getAll();
    //console.log(objects);

    let obj = {
       title: 'Sonic Origins',
       price: 456,
       thumbnail: 'https://cdn.akamai.steamstatic.com/steam/apps/1794960/header.jpg?t=1655826371',
    }

    //Add object
    //await ContainerService.save(obj);

    let idSearch = 2;
    //Get object by id
    //await ContainerService.getById(idSearch);

    //await ContainerService.getRandom();

    //Delete all objects
    //await ContainerService.deleteAll();

    let idDelete = 3;
    //Delete object by id
    //await ContainerService.deleteById(idDelete);
};

environment();
module.exports = ContainerService;