import { Router } from "express";
import uploader from "../utils/utils.js";
import services from "../dao/config.js";

const router = Router();

let objects = await services.productsService.getAll();

let loginpass = '';
let registerPass = '';

router.get('/',async (req, res) => {
    if (registerPass === 'success') {
        res.render('failRegister')
        registerPass = '';
    } else {
        if (req.session.user) {
            let nameView = req.session.user.name
            res.render('form', {objects, nameView});
        } else {
            res.render('register');
        }
    }
});

router.get('/login',async (req, res) => {
    if (loginpass === 'success') {
        res.render('failLogin')
        loginpass = '';
    } else {
        if (req.session.user) {
            let nameView = req.session.user.name
            res.render('form', {objects, nameView});
        } else {
            res.render('login');
        }
    }
});

router.get('/logout', async (req, res) => {
    let nameView = req.session.user.name
    req.session.destroy(err => {
        if (err) {
            return res.send("Couldn't log out, please let try again")
        } else {
            res.render('logout', {nameView});
        }
    })
});

router.post('/products', uploader.single('file'), async (req, res) => {
    let product = req.body;
    product.thumbnail = req.file.filename;
    console.log(product)

    if(!product.title) return res.status(400).send({status:"error", message:"Invalid Title"})
    if(!product.price) return res.status(400).send({status:"error", message:"Invalid Price"})

    const saveObject = await services.productsService.save(product);

    let returnId = objects[objects.length - 1].id;
    let sum = returnId + '';
    
    res.send({status:"success", message:"product added", id:sum })
});

router.get('/products',async (req, res) => {
    let obj = JSON.parse(JSON.stringify(objects));
    res.render('products', {obj})
});

router.get('/loginFail',async (req, res) => {
    loginpass = 'success'
});

router.get('/registerFail',async (req, res) => {
    registerPass = 'success'
});

export default router;