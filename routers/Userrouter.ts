import {Request, Response, Router} from "express";
import {delUser, getUser, makeUser, updateUser, welcomeMsg,login} from "../controllers/userController";
import {loginData} from "../models/userDataModel";

export const userRouter = Router();

userRouter.get("/",welcomeMsg);

userRouter.get("/user/:id", getUser)
userRouter.post("/user/register",makeUser)
userRouter.delete("/user/:id",delUser)
userRouter.put("/user/:id",updateUser)
userRouter.get("/login",login)
