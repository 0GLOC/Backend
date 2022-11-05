import { Router } from "express";
import uploader from "../utils/utils.js";
import viewsController from "../controllers/views.controller.js";

const router = Router();

router.get('/', viewsController.viewRegister);

router.get('/login', viewsController.viewLogin);

router.get('/logout', viewsController.viewLogout);

router.post('/products', uploader.single('file'), viewsController.postProducts);

router.get('/products', viewsController.getProducts);

router.get('/loginFail', viewsController.viewLoginFail);

router.get('/registerFail', viewsController.viewRegisterFail);

router.get('/info', viewsController.viewInfo);

export default router;