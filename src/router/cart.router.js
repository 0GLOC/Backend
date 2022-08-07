import { Router } from "express";
import CartContainer from "../container/CartContainer.js";
import Container from "../container/ObjectContainer.js";

const router = Router();

const newContainerCart = new CartContainer();
const ContainerService = new Container();

//Add cart and return id
router.post('/', async (req, res) => {
    let cart = {};

    const saveCart = await newContainerCart.saveCart(cart);
    const carts = await newContainerCart.getAllCarts();

    let returnId = carts[carts.length - 1].id;
    let sum = returnId + '';

    res.send({status:"success", message:"cart added", id:sum })
});

//Delete cart by id
router.delete('/:cid', async (req, res) => {
    let idDelete = req.params.cid;
    let realNumber = parseInt(idDelete)

    let allCarts = await newContainerCart.getAllCarts();
    let CartLength = allCarts.length;

    //Validations
    if(isNaN(idDelete)) return res.status(400).send({error: 'Please insert a number instead'});
    if(realNumber > CartLength) return res.status(400).send({error: 'This product does not exist'});
    if(realNumber < CartLength) return res.status(400).send({error: 'This product does not exist'});
    
    let deleteCartById = await newContainerCart.deleteCartById(realNumber);

    res.send('Cart deleted succesfully')
});

//Return all products in cart by id
router.get('/:cid/products', async (req, res) => {
    let idSearch = req.params.cid;
    let realNumber = parseInt(idSearch)
    let sumId = realNumber - 1;

    let allCarts = await newContainerCart.getAllCarts();
    let CartLength = allCarts.length;

    //Validations
    if(isNaN(idSearch)) return res.status(400).send({error: 'Please insert a number instead'});
    if(realNumber < 1) return res.status(400).send({error: 'This cart does not exist'});
    if(realNumber > CartLength) return res.status(400).send({error: 'This cart does not exist'});

    //Show the products
    let CartById = await newContainerCart.getCartById(realNumber);
    let objectOfArray = CartById[0];
    let productsCheck = objectOfArray.products;
    let findProduct = productsCheck.map(function(x) {
        return x.product;
    });

    let arrProducts = [];

    for(let i=0; i<findProduct.length; i++){
        let objects = await ContainerService.getById(findProduct[i]);
        arrProducts.push(objects);
    }
        
    res.send(arrProducts);
});

//Add products in cart by products id
router.post('/:cid/products', async (req, res) => {
    let newObject = req.body;
    let idSearch = req.params.cid;
    let realNumber = parseInt(idSearch)
    let sumId = realNumber - 1;

    //Check if the id exist
    let objects = await ContainerService.getAll();
    let objectsLength = objects.length;
    let carts = await newContainerCart.getAllCarts();

    //Validations
    if(isNaN(idSearch)) return res.status(400).send({error: 'Please insert a number instead'});
    if(isNaN(!newObject.product || !newObject.quantity)) return res.status(400).send({error: 'Please insert a number instead in the fields'});
    if(newObject.product > objectsLength) return res.status(400).send({error: 'This product does not exist'});
    if(newObject.product < 1) return res.status(400).send({error: 'The value of the fields must not be less than 0'});
    if(newObject.quantity < 1) return res.status(400).send({error: 'The value of the fields must not be less than 0'});
    if(!newObject.product || !newObject.quantity) return res.status(400).send({error: 'Please add the missing fields'});

    //Find products
    let CartById = await newContainerCart.getCartById(realNumber);
    let objectOfArray = CartById[0];
    let productsCheck = objectOfArray.products;
    let findProduct = productsCheck.map(function(x) {
        return x.product;
    });
    let findQuantity = productsCheck.map(function(x) {
        return x.quantity;
    });
    const resultFilter = productsCheck.filter(function (nickname) { return nickname.product == newObject.product });
    let quantityResult = resultFilter.map(function(x) {
        return x.quantity;
    });
    let searchProduct = findProduct.includes(newObject.product);

    //Validation and return new quantity
    if (searchProduct){
        newObject.quantity = parseInt(newObject.quantity) + parseInt(quantityResult);
        let result = findProduct.indexOf(newObject.product);
        productsCheck.splice(result, 1, newObject);
    } else {
        productsCheck.push(newObject);
    }
    console.log('newObject', newObject);
    console.log('newObject.quantity', newObject.quantity);
    console.log('searchProduct', searchProduct);
    console.log('findProduct', findProduct);
    carts.splice(sumId, 1, objectOfArray);
    await newContainerCart.saveProductsInCart(carts);

    res.send({status: 'New product add succesfully', products: productsCheck});
});

//Delete product in cart by id
router.delete('/:cid/products/:pid', async (req, res) => {
    let idSearchCart = req.params.cid;
    let realNumberCart = parseInt(idSearchCart);
    let idSearchProduct = req.params.pid;
    let realNumberProduct = parseInt(idSearchProduct);
    let sumId = realNumberCart - 1;

    //Check if the id exist
    let carts = await newContainerCart.getAllCarts();
    let CartLength = carts.length;
    let objects = await ContainerService.getAll();
    let objectsLength = objects.length;

    //Validations
    if(isNaN(idSearchCart)) return res.status(400).send({error: 'Please insert a number instead'});
    if(isNaN(idSearchProduct)) return res.status(400).send({error: 'Please insert a number instead'});
    if(realNumberCart > CartLength) return res.status(400).send({error: 'This cart does not exist'});
    if(realNumberCart < CartLength) return res.status(400).send({error: 'This cart does not exist'});
    if(realNumberProduct > objectsLength) return res.status(400).send({error: 'This product does not exist'});
    if(realNumberProduct < 0) return res.status(400).send({error: 'This product does not exist'});

    //Find product
    let CartById = await newContainerCart.getCartById(realNumberCart);
    let objectOfArray = CartById[0];
    let productsCheck = objectOfArray.products;
    let findProduct = productsCheck.map(function(x) {
        return x.product;
    });
    let result = findProduct.indexOf(realNumberProduct);
    productsCheck.splice(result, 1,);


    //Refresh product
    carts.splice(sumId, 1, objectOfArray);
    await newContainerCart.saveProductsInCart(carts);

    res.send({status: 'Product deleted succesfully', products: productsCheck});
});

export default router;