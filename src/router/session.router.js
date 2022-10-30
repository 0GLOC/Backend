import { Router } from "express";
import passport from 'passport';
import uploader from "../utils/utils.js";

const router = Router();

router.post('/register', uploader.single('file'), passport.authenticate('register', {failureRedirect: '/registerFail'}), async (req, res) => {
    const {name, password} = req.body;

    req.session.user = {
        name: name,
        role: "user"
    }

    res.send({status: "success", payload: req.user.name});
});

router.post('/login', passport.authenticate('login', {failureRedirect: '/loginFail'}), async (req, res) => {
    const {name, password} = req.body;

    req.session.user = {
        name: name,
        role: "user"
    }

    res.send({status: "success", payload: req.session.user});
});

export default router;