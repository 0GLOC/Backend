import { Router } from "express";
import mailsController from "../controllers/mails.controller.js";

const router = Router();

router.post('/:cid', mailsController.postMail);

export default router;