import { Router } from "express";
import Container from "../container/ObjectContainer.js";
import uploader from "../utils/utils.js";

const router = Router();

const ContainerService = new Container();

let objects = await ContainerService.getAll();

router.get('/',async (req, res) => {
    res.render('form', {objects})
});

router.post('/products', uploader.single('file'), async (req, res) => {
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
});

router.get('/products',async (req, res) => {
    res.render('products', {objects})
});

export default router;