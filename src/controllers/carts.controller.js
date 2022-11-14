import ProductService from "../services/productServices.js";
import CartService from "../services/cartServices.js";

const productsService = new ProductService();
const cartService = new CartService();

const addCartAndReturnId = async (req, res) => {
    let obj = req.body;
    let cart = {};
    
    const cartsUser = await cartService.getByUser(obj.user);

    if (cartsUser) {
        console.log('Existent cart');
    } else {
        const saveCart = await cartService.save(cart, obj.user);
        const carts = await cartService.getAll();
    
        let returnId = carts[carts.length - 1].id;
        let sum = returnId + '';
    
        res.send({status:"success", message:"cart added", id:sum })
    }
}

const deleteCartById = async (req, res) => {
    let idDelete = req.params.cid;
    let realNumber = parseInt(idDelete)

    let allCarts = await cartService.getAll();

    //Validations
    //if(isNaN(idDelete)) return res.status(400).send({error: 'Please insert a number instead'});
    let exist = allCarts.find(nickname => nickname.id == idDelete );
    if (exist === undefined) return res.status(400).send({error: 'This cart does not exist'})
    
    let deleteCartById = await cartService.deleteById(idDelete);
    
    res.send('Cart deleted succesfully')
}

const returnAllProductsInCartById = async (req, res) => {
    let idSearch = req.params.cid;
    let realNumber = parseInt(idSearch)
    let sumId = realNumber - 1;

    let allCarts = await cartService.getAll();
    let CartLength = allCarts.length;

    //Validations
    //if(isNaN(idSearch)) return res.status(400).send({error: 'Please insert a number instead'});
    let exist = allCarts.find(nickname => nickname.id == idSearch );
    if (exist === undefined) return res.status(400).send({error: 'This cart does not exist'})
    if(realNumber < 1) return res.status(400).send({error: 'This cart does not exist'});    

    let returnProducts = await cartService.showProducts(idSearch);
    console.log('RETURN', returnProducts);

    let arrProducts = [];

    for(let i=0; i<returnProducts.length; i++){
        let objects = await productsService.getById(returnProducts[i]);
        arrProducts.push(objects);
    }

    console.log(arrProducts);
        
    res.send(arrProducts);
}

const addProductsInCartById = async (req, res) => {
    let newObject = req.body;
    let idSearch = req.params.cid;
    let realNumber = parseInt(idSearch)
    let sumId = realNumber - 1;

    //Check if the id exist
    let objects = await productsService.getAll();
    let carts = await cartService.getAll();
    let exist = carts.find(nickname => nickname.id == idSearch );
    let existProduct = objects.find(nickname => nickname.id == newObject.product );

    //Validations
    //if(isNaN(idSearch)) return res.status(400).send({error: 'Please insert a number instead'});
    if(isNaN(!newObject.product || !newObject.quantity)) return res.status(400).send({error: 'Please insert a number instead in the fields'});
    if (exist === undefined) return res.status(400).send({error: 'This cart does not exist'})
    if (existProduct === undefined) return res.status(400).send({error: 'This product does not exist'})
    if(newObject.product < 1) return res.status(400).send({error: 'The value of the fields must not be less than 0'});
    if(newObject.quantity < 1) return res.status(400).send({error: 'The value of the fields must not be less than 0'});
    if(!newObject.product || !newObject.quantity) return res.status(400).send({error: 'Please add the missing fields'});


    await cartService.refresh(idSearch, newObject);

    res.send({status: 'New product add succesfully'});
}

const deleteProductsInCartById = async (req, res) => {
    let idSearchCart = req.params.cid;
    let idSearchProduct = req.params.pid;
    let realNumberProduct = parseInt(idSearchProduct);


    //Check if the id exist
    let carts = await cartService.getAll();
    let objects = await productsService.getAll();

    let existCart = carts.find(nickname => nickname.id == idSearchCart );
    let existProduct = objects.find(nickname => nickname.id == realNumberProduct );

    //Validations
    //if(isNaN(idSearchCart)) return res.status(400).send({error: 'Please insert a number instead'});
    if(isNaN(idSearchProduct)) return res.status(400).send({error: 'Please insert a number instead'});
    if (existCart === undefined) return res.status(400).send({error: 'This cart does not exist'})
    if (existProduct === undefined) return res.status(400).send({error: 'This product does not exist'})
    if(realNumberProduct < 0) return res.status(400).send({error: 'This product does not exist'});

    await cartService.replaceObject(carts, idSearchProduct, idSearchCart);

    res.send({status: 'Product deleted succesfully'});
}

export default {
    addCartAndReturnId,
    deleteCartById,
    returnAllProductsInCartById,
    addProductsInCartById,
    deleteProductsInCartById
}