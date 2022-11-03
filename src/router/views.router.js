import { Router } from "express";
import uploader from "../utils/utils.js";
import services from "../dao/config.js";
import userService from "../public/js/user.js";
import config from "../config/config.js";

const router = Router();

let objects = await services.productsService.getAll();

let HOST = config.host.HOST_URL + '';
let loginpass = '';
let registerPass = '';

router.get('/',async (req, res) => {
    if (registerPass === 'success') {
        res.render('failRegister', {HOST})
        registerPass = '';
    } else {
        if (req.session.user) {
            let nameView = req.session.user.name
            let carts = await services.cartService.getByUser(nameView);
            let extractID = carts._id;
            let realValue = extractID.valueOf();
            let processProducts = await services.cartService.showProducts(realValue);
            let arrProducts = [];
            for(let i=0; i<processProducts.length; i++){
                let objects = await services.productsService.getById(processProducts[i]);
                arrProducts.push(objects);
            }
            let searchAvatar = await userService.find({name:nameView});
            let user = searchAvatar[0];
            let users = JSON.parse(JSON.stringify(user));
            let avatar = searchAvatar[0].avatar;
            let showQuantity = await services.cartService.showQuantity(realValue);
            let total = showQuantity.reduce((a, b) => a + b, 0);
            let arrPrices = [];
            for(let i=0; i<arrProducts.length; i++){
                let objects = (arrProducts[i].price);
                arrPrices.push(objects);
            }
            let sumQuantityProdcut = [];
            for(let i=0; i< arrPrices.length; i++){
                let objects = (carts.products[i].quantity * arrPrices[i]);
                sumQuantityProdcut.push(objects);
            }
            let newObj = arrProducts.map(fruit => ({
                _id: fruit._id,
                title: fruit.title,
                price: fruit.price,
                thumbnail: fruit.thumbnail,
                descripcion: fruit.descripcion,
                code: fruit.code,
                timestamp: fruit.timestamp,
                quantity: showQuantity[0]
            }));
            for(let i=0; i< newObj.length; i++){
                newObj[i].quantity = showQuantity[i];
            }
            let totalPrice = sumQuantityProdcut.reduce((a, b) => a + b, 0);
            let obj = JSON.parse(JSON.stringify(arrProducts));
            res.render('form', {nameView, arrProducts, avatar, total, HOST, realValue, totalPrice, showQuantity, newObj, users});
        } else {
            res.render('register', {HOST});
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
            let carts = await services.cartService.getByUser(nameView);
            let extractID = carts._id;
            let realValue = extractID.valueOf();
            let processProducts = await services.cartService.showProducts(realValue);
            let arrProducts = [];
            let showQuantity = await services.cartService.showQuantity(realValue);
            let total = showQuantity.reduce((a, b) => a + b, 0);
            for(let i=0; i<processProducts.length; i++){
                let objects = await services.productsService.getById(processProducts[i]);
                arrProducts.push(objects);
            }
            let searchAvatar = await userService.find({name:nameView});
            let user = searchAvatar[0];
            let users = JSON.parse(JSON.stringify(user));
            let avatar = searchAvatar[0].avatar;
            let obj = JSON.parse(JSON.stringify(arrProducts));
            let arrPrices = [];
            for(let i=0; i<arrProducts.length; i++){
                let objects = (arrProducts[i].price);
                arrPrices.push(objects);
            }
            let sumQuantityProdcut = [];
            for(let i=0; i< arrPrices.length; i++){
                let objects = (carts.products[i].quantity * arrPrices[i]);
                sumQuantityProdcut.push(objects);
            }
            let newObj = arrProducts.map(fruit => ({
                _id: fruit._id,
                title: fruit.title,
                price: fruit.price,
                thumbnail: fruit.thumbnail,
                descripcion: fruit.descripcion,
                code: fruit.code,
                timestamp: fruit.timestamp,
                quantity: showQuantity[0]
            }));
            for(let i=0; i< newObj.length; i++){
                newObj[i].quantity = showQuantity[i];
            }
            let totalPrice = sumQuantityProdcut.reduce((a, b) => a + b, 0);
            
            res.render('form', {nameView, avatar, total, showQuantity, newObj, HOST, users, realValue, totalPrice});
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
    
    if(!product.title) return res.status(400).send({status:"error", message:"Invalid Title"})
    if(!product.price) return res.status(400).send({status:"error", message:"Invalid Price"})

    const saveObject = await services.productsService.save(product);

    let returnId = objects[objects.length - 1].id;
    let sum = returnId + '';
    
    res.send({status:"success", message:"product added", id:sum })
});

router.get('/products',async (req, res) => {
    if (loginpass === 'success') {
        res.render('failLogin')
        loginpass = '';
    } else if (registerPass === 'success') {
        res.render('failRegister', {HOST})
        registerPass = '';
    }
     else {
        if (req.session.user) {
            let nameView = req.session.user.name
            let carts = await services.cartService.getByUser(nameView);
            let extractID = carts._id;
            let realValue = extractID.valueOf();
            let processProducts = await services.cartService.showProducts(realValue);
            let arrProducts = [];
            for(let i=0; i<processProducts.length; i++){
                let objects = await services.productsService.getById(processProducts[i]);
                arrProducts.push(objects);
            }
            let obj = JSON.parse(JSON.stringify(arrProducts));
            let searchAvatar = await userService.find({name:nameView});
            let avatar = searchAvatar[0].avatar;
            let showQuantity = await services.cartService.showQuantity(realValue);
            let total = showQuantity.reduce((a, b) => a + b, 0);
            let products = await services.productsService.getAll();
            let prods = JSON.parse(JSON.stringify(products));
            let arrPrices = [];
            for(let i=0; i<arrProducts.length; i++){
                let objects = (arrProducts[i].price);
                arrPrices.push(objects);
            }
            let sumQuantityProdcut = [];
            for(let i=0; i< arrPrices.length; i++){
                let objects = (carts.products[i].quantity * arrPrices[i]);
                sumQuantityProdcut.push(objects);
            }
            let newObj = arrProducts.map(fruit => ({
                _id: fruit._id,
                title: fruit.title,
                price: fruit.price,
                thumbnail: fruit.thumbnail,
                descripcion: fruit.descripcion,
                code: fruit.code,
                timestamp: fruit.timestamp,
                quantity: showQuantity[0]
            }));
            for(let i=0; i< newObj.length; i++){
                newObj[i].quantity = showQuantity[i];
            }
            let totalPrice = sumQuantityProdcut.reduce((a, b) => a + b, 0);
            res.render('products', {nameView, newObj, avatar, realValue, total, HOST, prods, totalPrice});
        } else {
            res.render('login', {HOST});
        }
    }
});

router.get('/loginFail',async (req, res) => {
    loginpass = 'success'
});

router.get('/registerFail',async (req, res) => {
    registerPass = 'success'
});

router.get('/wtv',async (req, res) => {
    let carts = await services.cartService.getByUser('sss@hotmail.com');

    console.log(carts);
});


router.get('/info', async (req, res) => {
    let argv = process.argv.slice(1);
    let execPath = process.execPath;
    let memory = process.memoryUsage.rss();
    let platform = process.platform;
    let version = process.version;
    let execArg = process.execArgv;
    let processId = process.pid;

    res.render('info', {argv, execPath, memory, platform, version, execArg, processId});
});

export default router;