import services from "../dao/config.js";

const returnAllProducts = async (req, res) => {
    let objects = await services.productsService.getAll();

    res.send(objects)
}

const byId = async (req, res) => {
    let idSearch = req.params.pid;
    let realNumber = parseInt(idSearch)

    const admin = false;

    let objects = await services.productsService.getAll();
    let exist = objects.find(nickname => nickname.id == realNumber );

    if(isNaN(idSearch)) return res.status(400).send({error: 'Please insert a number instead'})
    if (exist === undefined) return res.status(400).send({error: 'This product does not exist'})

    let objectById = await services.productsService.getById(idSearch);

    res.send(objectById)
}

const addAndReturnId = async (req, res) => {
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
}

const returnAndRefresh = async (req, res) => {
    let newObject = req.body;
    let idSearch = req.params.pid;
    let realNumber = parseInt(idSearch)

    const objects = await services.productsService.getAll();

    let randomCalculator = Date.now();
    let random = Math.round(Math.random()*randomCalculator);
    newObject.timestamp = randomCalculator;
    newObject.code = random;

    let exist = objects.find(nickname => nickname.id == realNumber );

    const admin = true;

    //Validations (isNaN / Not modified id / All fields complete / Admin)
    if(!admin) return res.status(400).send({status:"error", message:"You do not have the required permissions"})
    if(isNaN(idSearch)) return res.status(400).send({error: 'Please insert a number instead'});
    if(realNumber !== newObject.id) return res.status(400).send({error: 'The id must not be modified or missing'});
    if (exist === undefined) return res.status(400).send({error: 'This product does not exist'})
    if(!newObject.title || !newObject.price || !newObject.thumbnail || !newObject.descripcion) return res.status(400).send({error: 'Please add the missing fields'});

    await services.productsService.replaceObject(realNumber, newObject);

    res.send({status: 'New object add succesfully'});
}

const deleteById = async (req, res) => {
    let idDelete = req.params.pid;
    let realNumber = parseInt(idDelete)

    const objects = await services.productsService.getAll();
    const admin = true;

    let exist = objects.find(nickname => nickname.id == realNumber );

    //Validations (isNaN / Product id exist/ Admin)
    if(!admin) return res.status(400).send({status:"error", message:"You do not have the required permissions"})
    if(isNaN(idDelete)) return res.status(400).send({error: 'Please insert a number instead'})
    if (exist === undefined) return res.status(400).send({error: 'This product does not exist'})
    if(realNumber < 0) return res.status(400).send({error: 'This product does not exist'});
    
    let deleteProductById = await services.productsService.deleteById(idDelete);

    res.send('Product deleted succesfully')
}

export default {
    returnAllProducts,
    byId,
    addAndReturnId,
    returnAndRefresh,
    deleteById
};