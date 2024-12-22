import express from "express";
import {create, login, logout } from '../controller/user.controller.js'
import {validateUser} from '../middleware/user.validator.js';

const authRouter = express.Router();

authRouter.post('/', validateUser, create);
authRouter.post('/', logout);
authRouter.post('/login', login);

export default authRouter;