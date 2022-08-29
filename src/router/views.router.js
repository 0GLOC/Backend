import { Router } from "express";
import uploader from "../utils/utils.js";
import services from "../dao/config.js";

const router = Router();


let objects = await services.productsService.getAll();

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