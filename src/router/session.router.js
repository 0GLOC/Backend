import { Router } from "express";
import userService from "../public/js/user.js";

const router = Router();

router.post('/register',async (req, res) => {
    const {name, password} = req.body;
    if(!name || !password) return res.status(400).send({status: "error", error: "Incomplete values"});

    const exist = await userService.findOne({name: name});
    if(exist) return res.status(400).send({status: "error", error: "User already exist"})

    const newUser = {
        name,
        password
    }

    let result = await userService.create(newUser);

    req.session.user = {
        name: result.name,
        role: "user"
    }

    res.send(result);
});

export default router;