import express from "express";
import { main } from "../controller/userController.js";

const router = express.Router();

router.get('/main', main);

export default router;