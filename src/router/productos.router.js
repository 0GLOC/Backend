import { Router } from "express";
import Container from "../container/ObjectContainer.js";

const router = Router();

const ContainerService = new Container();

//Return all products
router.get('/', async (req, res) => {
    let objects = await ContainerService.getAll();

    res.send(objects)
});

//Get object by id
router.get('/:id', async (req, res) => {
    let idSearch = req.params.id;

    const error = 'Please insert a number instead';
    if(isNaN(idSearch)) return res.status(400).send({error})

    let objectById = await ContainerService.getById(idSearch);

    res.send(objectById)
});

//Add object and return id
router.post('/', async (req, res) => {
    let product = req.body;

    console.log(product)

    if(!product.title) return res.status(400).send({status:"error", message:"Invalid Title"})
    if(!product.price) return res.status(400).send({status:"error", message:"Invalid Price"})

    const saveObject = await ContainerService.save(product);
    const objects = await ContainerService.getAll();

    let returnId = objects[objects.length - 1].id;
    let sum = returnId + '';

    res.send({status:"success", message:"product added", id:sum })
});

//Return and refresh object by id
router.put('/:id', async (req, res) => {
    let newObject = req.body;
    let idSearch = req.params.id;
    let realNumber = parseInt(idSearch)
    let sumId = realNumber - 1;

    //Validations (isNaN / Not modified id / All fields complete)
    if(isNaN(idSearch)) return res.status(400).send({error: 'Please insert a number instead'});
    if(realNumber !== newObject.id) return res.status(400).send({error: 'The id must not be modified'});
    if(!newObject.title || !newObject.price || !newObject.thumbnail || !newObject.descripcion || !newObject.code || !newObject.timestamp) return res.status(400).send({error: 'Please add the missing fields'});

    let objects = await ContainerService.getAll();

    objects.splice(sumId, 1, newObject)
    await ContainerService.replaceObject(objects);

    res.send({status: 'New object add succesfully'});
});

//Delete object by id
router.delete('/:id', async (req, res) => {
    let idDelete = req.params.id;
    let realNumber = parseInt(idDelete)

    const error = 'Please insert a number instead';
    if(isNaN(idDelete)) return res.status(400).send({error})
    
    let deleteProductById = await ContainerService.deleteById(realNumber);

    res.send('Product deleted succesfully')
});

export default router;