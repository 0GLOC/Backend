import { Router } from "express";
import passport from 'passport';
import uploader from "../utils/utils.js";
import sessionsController from "../controllers/sessions.controller.js";

const router = Router();

router.post('/register', uploader.single('file'), passport.authenticate('register', {failureRedirect: '/registerFail'}), sessionsController.registerSession);

router.post('/login', passport.authenticate('login', {failureRedirect: '/loginFail'}), sessionsController.loginSession);

export default router;