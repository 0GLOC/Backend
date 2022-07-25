import { Router } from "express";
import Container from "../container/ObjectContainer.js";
import uploader from "../utils/utils.js";

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
/*router.post('/', uploader.single('file'), async (req, res) => {
    let product = req.body;
    product.thumbnail = req.file.filename;
    console.log(product)

    if(!product.title) return res.status(400).send({status:"error", message:"Invalid Title"})
    if(!product.price) return res.status(400).send({status:"error", message:"Invalid Price"})

    const saveObject = await ContainerService.save(product);
    const objects = await ContainerService.getAll();

    let returnId = objects[objects.length - 1].id;
    let sum = returnId + '';

    res.send({status:"success", message:"product added", id:sum })
});*/

//Return and refresh object by id
router.put('/:id', async (req, res) => {
    let newObject = req.body;
    let idSearch = req.params.id;
    let realNumber = parseInt(idSearch)

    let newArray = [];

    newArray.push(newObject);

    const error = 'Please insert a number instead';
    if(isNaN(idSearch)) return res.status(400).send({error})

    let objectById = await ContainerService.getById(realNumber);

    objectById = newArray;

    res.send({status: 'New object add succesfully', 'New object': newArray});
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