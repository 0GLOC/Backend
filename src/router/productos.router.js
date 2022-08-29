import { Router } from "express";
import services from "../dao/config.js";

const router = Router();

//Return all products
router.get('/', async (req, res) => {
    let objects = await services.productsService.getAll();

    res.send(objects)
});

//Get object by id
router.get('/:pid', async (req, res) => {
    let idSearch = req.params.pid;

    const admin = false;

    const error = 'Please insert a number instead';
    if(isNaN(idSearch)) return res.status(400).send({error})

    let objectById = await services.productsService.getById(idSearch);

    res.send(objectById)
});

//Add object and return id
router.post('/', async (req, res) => {
    let product = req.body;

    const admin = true;

    //Validations (All fields complete / Admin)
    if(!admin) return res.status(400).send({status:"error", message:"You do not have the required permissions"})
    if(!product.title) return res.status(400).send({status:"error", message:"Invalid Title"})
    if(!product.price) return res.status(400).send({status:"error", message:"Invalid Price"})

    const saveObject = await services.productsService.save(product);
    const objects = await services.productsService.getAll();

    let returnId = objects[objects.length - 1].id;
    let sum = returnId + '';

    res.send({status:"success", message:"product added", id:sum })
});

//Return and refresh object by id
router.put('/:pid', async (req, res) => {
    let newObject = req.body;
    let idSearch = req.params.pid;
    let realNumber = parseInt(idSearch)

    let randomCalculator = Date.now();
    let random = Math.round(Math.random()*randomCalculator);
    newObject.timestamp = randomCalculator;
    newObject.code = random;

    const admin = true;

    //Validations (isNaN / Not modified id / All fields complete / Admin)
    if(!admin) return res.status(400).send({status:"error", message:"You do not have the required permissions"})
    if(isNaN(idSearch)) return res.status(400).send({error: 'Please insert a number instead'});
    if(realNumber !== newObject.id) return res.status(400).send({error: 'The id must not be modified or missing'});
    if(!newObject.title || !newObject.price || !newObject.thumbnail || !newObject.descripcion || !newObject.code || !newObject.timestamp) return res.status(400).send({error: 'Please add the missing fields'});

    await services.productsService.replaceObject(realNumber, newObject);

    res.send({status: 'New object add succesfully'});
});

//Delete object by id
router.delete('/:pid', async (req, res) => {
    let idDelete = req.params.pid;
    let realNumber = parseInt(idDelete)

    const objects = await services.productsService.getAll();
    const objectsLength = objects.length;
    const admin = true;

    //Validations (isNaN / Product id exist/ Admin)
    if(!admin) return res.status(400).send({status:"error", message:"You do not have the required permissions"})
    if(isNaN(idDelete)) return res.status(400).send({error: 'Please insert a number instead'})
    if(realNumber > objectsLength) return res.status(400).send({error: 'This product does not exist'});
    if(realNumber < 0) return res.status(400).send({error: 'This product does not exist'});
    
    let deleteProductById = await services.productsService.deleteById(idDelete);

    res.send('Product deleted succesfully')
});

export default router;