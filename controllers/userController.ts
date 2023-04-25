import {request, Request, Response} from "express";
import {UserModel,User} from "../models/userModel";
import {UserData,loginData} from "../models/userDataModel";
import Require = NodeJS.Require;
export const welcomeMsg = (req: Request, res: Response) =>{
    res.status(200).send({
        "message":"welcome"
    })
}
export const getUser = async (req:Request, res:Response)=>{
    //console.log(req.query);
    //console.log(req.params.id);
    // 2 ways to request parameters
    // first is ?id=10
    // second is 10
    //both are used depending on hat you need to do
    const usrid = parseInt(req.params.id);
    const usrmodel = new UserModel();
    const user = await usrmodel.getUser(usrid)
    res.send(user)
}
export const makeUser = async (req:Request, res:Response) => {
    let newuser: User = req.body
    const usrMod = new UserModel();
    const createdUsr = await usrMod.insertUser(newuser);
    res.send({
        "status":200,
        "message":"successfully created user"
    })
}
export const delUser = async (req:Request, res:Response)=>{
    const user = new UserModel()
    const id = parseInt(req.params.id)
    await user.deleteUser(id)
    res.send({
        "status":200,
        "message":`User with id ${id} deleted successfully`
    })
}
export const updateUser =  async (req: Request, res: Response)=>{
    const id = parseInt(req.params.id)
    let updatedUsr:UserData = req.body
    const update = await new UserModel().updateUser(id,updatedUsr)
    res.send({
        "status" : 200,
        "message": `Successfully updated user with id ${id}`
    })
}
export const login = async(req:Request, res:Response) => {
    let loginInfo:loginData = req.body
    const checkForUser = await new UserModel().login(loginInfo)
    res.send({
        "message": checkForUser
    })
}