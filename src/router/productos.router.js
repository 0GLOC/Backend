import { Router } from "express";
import productsController from "../controllers/products.controller.js";

const router = Router();

//Return all products
router.get('/', productsController.returnAllProducts);

//Get object by id
router.get('/:pid', productsController.byId);

//Add object and return id
router.post('/', productsController.addAndReturnId);

//Return and refresh object by id
router.put('/:pid', productsController.returnAndRefresh);

//Delete object by id
router.delete('/:pid', productsController.deleteById);

export default router;