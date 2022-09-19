import { Router } from "express";
import passport from 'passport';

const router = Router();

router.post('/register', passport.authenticate('register', {failureRedirect: '/registerFail'}), async (req, res) => {
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