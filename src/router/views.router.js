import { Router } from "express";
import Container from "../container/ObjectContainer.js";

const router = Router();

const ContainerService = new Container();

let objects = await ContainerService.getAll();

router.get('/',async (req, res) => {
    res.render('products', {objects})
});

router.get('/pug',async (req, res) => {
    res.render('productsPug.pug', {objects})
});

router.get('/ejs',async (req, res) => {
    res.render('productsEjs.ejs', {objects})
});

export default router;