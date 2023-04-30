import {Request, Response, Router} from "express";
import {delUser, getUser, makeUser, updateUser, welcomeMsg,login} from "../controllers/userController";
import {loginData} from "../models/userDataModel";
import { getPrice } from "../controllers/priceController";

export const userRouter = Router();

userRouter.get("/",welcomeMsg);

userRouter.get("/user/:username", getUser)
userRouter.post("/user/register",makeUser)
userRouter.delete("/user/:id",delUser)
userRouter.put("/user/:id",updateUser)
userRouter.post("/login",login)
userRouter.get("/price/:crypto_name",getPrice)
