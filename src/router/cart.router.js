import { Router } from "express";
import cartsController from "../controllers/carts.controller.js";

const router = Router();

//Add cart and return id
router.post('/', cartsController.addCartAndReturnId);

//Delete cart by id
router.delete('/:cid', cartsController.deleteCartById);

//Return all products in cart by id
router.get('/:cid/products', cartsController.returnAllProductsInCartById);

//Add products in cart by products id
router.post('/:cid/products', cartsController.addProductsInCartById);

//Delete product in cart by id
router.delete('/:cid/products/:pid', cartsController.deleteProductsInCartById);

export default router;