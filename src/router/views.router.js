import { Router } from "express";
import Container from "../container/ObjectContainer.js";

const router = Router();

const ContainerService = new Container();

router.get('/objects.txt',async (req, res) => {
    let objects = await ContainerService.getAll();

    res.render('objects', {objects})
});

export default router;